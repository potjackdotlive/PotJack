import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useQueryClient } from "@tanstack/react-query";
import { estimateFeesPerGas } from "@wagmi/core";
import { BaseError, Hash, type HttpRequestError, parseEther, SwitchChainError, UserRejectedRequestError } from "viem";
import { useChains, useConnection, useSwitchChain, useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { errorNotification, successNotification } from "components/Notification/Notification";
import { wagmiConfig } from "config/wagmiConfig";
import { QUERY_KEYS } from "constants/queryKeys";
import { _abi } from "contracts/Raffle/factories/Raffle__factory";
import { useGetTicketPriceForToken } from "hooks/abi/useGetTicketPriceForToken";
import { EntryConfirmView } from "pages/Play/components/BuyTicketEth/components/EntryConfirm/EntryConfirmView";
import {
  getProcessItemStatus,
  getWarningTextsByStepNative,
  invalidateNativeEvm,
} from "pages/Play/components/BuyTicketEth/components/EntryConfirm/utils";
import { usePlayContext } from "pages/Play/contexts/playContext/playContextUtils";
import {
  TXT_APPROVAL,
  TXT_ERROR,
  TXT_FAILED_TO_SWITCH_CHAIN,
  TXT_GET_NONCE_ERROR,
  TXT_PURCHASE_ERROR,
  TXT_SEND_TO_PRIZE_POOL,
  TXT_SUCCESS,
  TXT_SUCCESSFUL_TICKET_PURCHASE,
  TXT_USER_CANCELLED_CHAIN_SWITCH,
  TXT_YOUR_WALLET_DOESNT_SUPPORT_NETWORK,
} from "translations";
import { getContractByChainId } from "utils/contractGetters/getContractByChainId";
import { getChainFullName } from "utils/getChainFullName";
import { getTokenAddress } from "utils/getTokenAddress";
import { toBig } from "utils/toBig";
import { ChainIdType } from "utils/types";
import { ProcessItemProps } from "./ProcessItem";

type Props = {
  txCancelHandler: () => void;
  raffleNumber: number;
  ticketAmount: number;
};

export const EntryConfirmEth: FC<Props> = ({ txCancelHandler, raffleNumber, ticketAmount }) => {
  const { t } = useTranslation();
  const [activeStep, setActiveStep] = useState(0);
  const [hash, setHash] = useState<Hash>();
  const { coin, networkId } = usePlayContext();
  const queryClient = useQueryClient();
  const { chainId } = useConnection();
  const chains = useChains();
  const { mutate: writeBuyContract, data: hashBuy, error: errorBuy } = useWriteContract();
  const contractAddress = getContractByChainId(networkId as ChainIdType)?.address;
  const tokenAddress = getTokenAddress({ chainId: chainId as ChainIdType, coin });
  const { formatted } = useGetTicketPriceForToken({ coin });

  const baseCost = toBig(formatted).mul(ticketAmount);

  const {
    isSuccess,
    isError,
    error: receiptError,
  } = useWaitForTransactionReceipt({
    hash,
    confirmations: 2,
    retryCount: 2,
  });

  const handleError = (error: HttpRequestError) => {
    const description = error?.details?.includes("getNonce error")
      ? t(TXT_GET_NONCE_ERROR)
      : error?.details?.length > 100
        ? t(TXT_PURCHASE_ERROR)
        : error?.details;

    txCancelHandler();
    errorNotification({
      message: "Error",
      description: error?.details ? description : t(TXT_PURCHASE_ERROR),
    });
  };

  const { mutateAsync: switchChainAsync } = useSwitchChain({
    mutation: {
      onError: async (error) => {
        if (error instanceof UserRejectedRequestError) {
          errorNotification({
            message: t(TXT_ERROR),
            description: t(TXT_USER_CANCELLED_CHAIN_SWITCH),
          });
          txCancelHandler();
          return;
        }

        if (error instanceof SwitchChainError) {
          errorNotification({
            message: t(TXT_ERROR),
            description: error?.shortMessage || t(TXT_FAILED_TO_SWITCH_CHAIN),
          });
          txCancelHandler();
          return;
        }

        if (error) {
          errorNotification({
            message: t(TXT_ERROR),
            description: t(TXT_FAILED_TO_SWITCH_CHAIN),
          });
          txCancelHandler();
          return;
        }
      },
    },
  });

  const processes: ProcessItemProps[] = [
    { text: t(TXT_APPROVAL), status: getProcessItemStatus({ index: 0, activeStep }) },
    { text: t(TXT_SEND_TO_PRIZE_POOL), status: getProcessItemStatus({ index: 1, activeStep }) },
  ];

  useEffect(() => {
    if (!networkId || !chainId) return;

    if (Number(chainId) !== Number(networkId)) {
      (async () => {
        try {
          await switchChainAsync({ chainId: Number(networkId) });
        } catch (e) {
          txCancelHandler();
        }
      })();
      return;
    }

    const chain = chains.find((c) => c.id == networkId);
    if (!chain) {
      errorNotification({
        message: t(TXT_ERROR),
        description: t(TXT_YOUR_WALLET_DOESNT_SUPPORT_NETWORK, { network: getChainFullName(networkId as ChainIdType) }),
      });
      txCancelHandler();
      return;
    }

    if (tokenAddress && contractAddress) {
      const costEther = parseEther(baseCost.toString());

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
            value: BigInt(costEther),
            args: [tokenAddress as `0x${string}`, ticketAmount, costEther],
            ...gasConfig,
          });
        });
    }
  }, [networkId, chainId, tokenAddress, contractAddress]);

  useEffect(() => {
    if (hashBuy) {
      setHash(hashBuy);
      setActiveStep(1);
    }
  }, [hashBuy]);

  useEffect(() => {
    if (!isSuccess) return;

    setTimeout(() => {
      txCancelHandler();
      const currentTokenAddress = getTokenAddress({ chainId: networkId as ChainIdType, coin });

      invalidateNativeEvm({ queryClient, currentTokenAddress, networkId }).then(() => {
        successNotification({
          message: t(TXT_SUCCESS),
          description: t(TXT_SUCCESSFUL_TICKET_PURCHASE),
          duration: 3,
        });
        queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.ABI.GET_WALLET_TOKEN_BALANCE], exact: false });
      });
    }, 1500);
  }, [isSuccess]);

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
    if (isError && receiptError) {
      handleError(receiptError as HttpRequestError);
    }
  }, [isError, receiptError]);

  return (
    <EntryConfirmView
      raffleNumber={raffleNumber}
      processes={processes}
      {...getWarningTextsByStepNative({ activeStep })}
    />
  );
};
