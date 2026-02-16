import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useQueryClient } from "@tanstack/react-query";
import { estimateFeesPerGas } from "@wagmi/core";
import { Address, BaseError, ExecutionRevertedError } from "viem";
import { useConnection, useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { errorNotification, successNotification } from "components/Notification/Notification";
import { wagmiConfig } from "config/wagmiConfig";
import { QUERY_KEYS } from "constants/queryKeys";
import { ERC20_ABI } from "contracts/Erc20Abi/ERC20_ABI";
import { _abi } from "contracts/Raffle/factories/Raffle__factory";
import { useGetTicketPriceForToken } from "hooks/abi/useGetTicketPriceForToken";
import { EntryConfirmView } from "pages/Play/components/BuyTicketEth/components/EntryConfirm/EntryConfirmView";
import { useAllowanceCheck } from "pages/Play/components/BuyTicketEth/components/EntryConfirm/useAllowanceCheck";
import { useHandleReceiptError } from "pages/Play/components/BuyTicketEth/components/EntryConfirm/useHandleReceiptError";
import {
  getProcessItemStatus,
  getWarningTextsByStep,
  invalidateEvm,
} from "pages/Play/components/BuyTicketEth/components/EntryConfirm/utils";
import { usePlayContext } from "pages/Play/contexts/playContext/playContextUtils";
import {
  TXT_ALLOWANCE_CHECK_ERROR,
  TXT_APPROVAL,
  TXT_APPROVAL_ERROR,
  TXT_ERROR,
  TXT_PURCHASE_ERROR,
  TXT_SEND_TO_PRIZE_POOL,
  TXT_SUCCESS,
  TXT_SUCCESSFUL_TICKET_PURCHASE,
  TXT_TRANSFER_MANAGER_APPROVAL,
} from "translations";
import { getContractByChainId } from "utils/contractGetters/getContractByChainId";
import { getTokenAddress } from "utils/getTokenAddress";
import { toBig } from "utils/toBig";
import { ChainIdType } from "utils/types";
import { ProcessItemProps } from "./ProcessItem";

type Props = {
  txCancelHandler: () => void;
  raffleNumber: number;
  ticketAmount: number;
  slippage: string;
  setSlippage: Dispatch<SetStateAction<string>>;
  handleInsufficientSlippage: () => void;
};

export const EntryConfirm: FC<Props> = ({
  txCancelHandler,
  raffleNumber,
  ticketAmount,
  slippage,
  setSlippage,
  handleInsufficientSlippage,
}) => {
  const { t } = useTranslation();
  const { coin } = usePlayContext();
  const queryClient = useQueryClient();
  const { address, chainId, isConnected } = useConnection();
  const [activeStep, setActiveStep] = useState(0);
  const { mutate: writeApproveContract, data: hashApprove, error } = useWriteContract();
  const { mutate: writeBuyContract, data: hashBuy, error: errorBuy } = useWriteContract();
  const { price, isFetched: isTicketPriceFetched } = useGetTicketPriceForToken({ coin });

  const tokenAddress = getTokenAddress({ chainId: chainId as ChainIdType, coin });
  const contractAddress = getContractByChainId(chainId as ChainIdType)?.address;
  const baseCost = toBig(price).mul(ticketAmount);
  const maxCost = baseCost.mul(1 + Number(slippage) / 100).round();

  const { isAllowanceFetched, isAllowanceCheckError, allowanceDeficit, allowanceCheckRefetch } = useAllowanceCheck({
    requiredAllowance: maxCost,
    spenderAddress: contractAddress,
    tokenAddress: tokenAddress as Address,
    enabled: isTicketPriceFetched,
  });

  const { isSuccess: isConfirmed, error: approveReceiptError } = useWaitForTransactionReceipt({
    hash: hashApprove,
    confirmations: 2,
    retryCount: 2,
  });

  useHandleReceiptError({ error: approveReceiptError, callback: txCancelHandler });

  const { isSuccess: buySuccess, error: buyReceiptError } = useWaitForTransactionReceipt({
    hash: hashBuy,
    confirmations: 2,
    retryCount: 2,
  });

  useHandleReceiptError({
    error: buyReceiptError,
    callback: () => {
      if ((buyReceiptError as ExecutionRevertedError)?.shortMessage?.includes("Insufficient balance")) {
        setActiveStep(0);
        allowanceCheckRefetch();
      } else {
        txCancelHandler();
      }

      if ((buyReceiptError as ExecutionRevertedError)?.shortMessage?.includes("Insufficient slippage")) {
        setActiveStep(0);
        handleInsufficientSlippage();
      }
    },
  });

  const processes: ProcessItemProps[] = [
    { text: t(TXT_TRANSFER_MANAGER_APPROVAL), status: getProcessItemStatus({ index: 0, activeStep }) },
    { text: t(TXT_APPROVAL), status: getProcessItemStatus({ index: 1, activeStep }) },
    { text: t(TXT_SEND_TO_PRIZE_POOL), status: getProcessItemStatus({ index: 2, activeStep }) },
  ];

  const handleBuy = () => {
    if (!contractAddress || !tokenAddress) {
      return;
    }

    let gasConfig = {};
    estimateFeesPerGas(wagmiConfig)
      .then((res) => {
        gasConfig = { ...res };
      })
      .finally(() => {
        writeBuyContract({
          address: contractAddress,
          abi: _abi,
          functionName: "buyTicket",
          args: [tokenAddress as `0x${string}`, ticketAmount, BigInt(maxCost.toFixed())],
          ...gasConfig,
        });
        setSlippage("");
      });
  };

  useEffect(() => {
    if (!isConnected || !tokenAddress || !address || !writeApproveContract) {
      return;
    }

    if (activeStep !== 0) {
      return;
    }

    if (allowanceDeficit === null) {
      return;
    }

    if (!isAllowanceFetched) {
      return;
    }

    if (allowanceDeficit?.lt(0)) {
      let gasConfig = {};
      estimateFeesPerGas(wagmiConfig)
        .then((res) => {
          gasConfig = { ...res };
        })
        .finally(() => {
          writeApproveContract({
            address: tokenAddress as `0x${string}`,
            abi: ERC20_ABI,
            functionName: "approve",
            args: [contractAddress, maxCost],
            ...gasConfig,
          });
        });
    } else {
      setActiveStep((prevState) => ++prevState);
      handleBuy();
    }
  }, [address, tokenAddress, activeStep, ticketAmount, isAllowanceFetched, allowanceDeficit?.toString()]);

  useEffect(() => {
    if (activeStep === processes?.length - 1) {
      setTimeout(() => {
        txCancelHandler();

        if (!coin || !chainId) {
          return;
        }

        invalidateEvm({ coin, chainId: chainId as ChainIdType, queryClient }).then(() => {
          successNotification({ message: t(TXT_SUCCESS), description: t(TXT_SUCCESSFUL_TICKET_PURCHASE), duration: 3 });
          queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.ABI.GET_WALLET_TOKEN_BALANCE], exact: false });
        });
      }, 1500);
    }
  }, [activeStep, t, chainId, coin]);

  useEffect(() => {
    if (hashBuy && buySuccess) {
      setActiveStep((prevState) => ++prevState);
    }
  }, [hashBuy, buySuccess]);

  useEffect(() => {
    if (isConfirmed) {
      setActiveStep((prevState) => ++prevState);
      handleBuy();
    }
  }, [isConfirmed]);

  useEffect(() => {
    if (error) {
      errorNotification({
        message: t(TXT_ERROR),
        description: (error as BaseError)?.details || t(TXT_APPROVAL_ERROR),
      });
      txCancelHandler();
    }
  }, [error, txCancelHandler, t]);

  useEffect(() => {
    if (errorBuy) {
      errorNotification({
        message: t(TXT_ERROR),
        description: (errorBuy as BaseError)?.details || t(TXT_PURCHASE_ERROR),
      });
      txCancelHandler();
    }
  }, [errorBuy, txCancelHandler, t]);

  useEffect(() => {
    if (isAllowanceCheckError) {
      txCancelHandler();
      errorNotification({
        message: t(TXT_ERROR),
        description: t(TXT_ALLOWANCE_CHECK_ERROR),
      });
    }
  }, [isAllowanceCheckError]);

  return (
    <EntryConfirmView processes={processes} raffleNumber={raffleNumber} {...getWarningTextsByStep({ activeStep })} />
  );
};
