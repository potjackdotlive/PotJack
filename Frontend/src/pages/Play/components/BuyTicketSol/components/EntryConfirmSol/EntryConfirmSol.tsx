import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useConnection } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useQueryClient } from "@tanstack/react-query";
import { useWalletUi, useWalletUiSigner } from "@wallet-ui/react";
import { UiWalletAccount, useWalletUiSignAndSend } from "@wallet-ui/react-gill";
import { address } from "gill";
import { getBuyTicketsSolInstructionAsync } from "anchor/src";
import { QUERY_KEYS } from "constants/queryKeys";
import { EntryConfirmView } from "pages/Play/components/BuyTicketEth/components/EntryConfirm/EntryConfirmView";
import { ProcessItemProps } from "pages/Play/components/BuyTicketEth/components/EntryConfirm/ProcessItem";
import {
  getProcessItemStatus,
  getWarningTextsByStepNative,
} from "pages/Play/components/BuyTicketEth/components/EntryConfirm/utils";
import { usePlayContext } from "pages/Play/contexts/playContext/playContextUtils";
import { useGetTicketPriceForSol } from "pages/Play/hooks/useGetTicketPriceForSol";
import { useSolanaRpc } from "pages/Play/hooks/useSolanaRpc";
import { useSolRaffleRound } from "pages/Play/hooks/useSolRaffleRoundDirect";
import { getBase64Transaction } from "pages/Play/utils";
import { TXT_APPROVAL, TXT_SEND_TO_PRIZE_POOL, TXT_TX_ERROR_BALANCE_TO } from "translations";
import { btcPriceFeedAddress, solPriceFeedAddress } from "utils/constants/priceFeedAddresses";
import { toBig } from "utils/toBig";

type Props = {
  raffleNumber: number;
  ticketAmount: number;
  slippage: string;
  txSuccessfulClose: () => void;
  txFailedClose: (error: unknown) => void;
  setSlippage: Dispatch<SetStateAction<string>>;
  handleInsufficientSlippage: () => void;
};

export const EntryConfirmSol: FC<Props> = ({
  txFailedClose,
  raffleNumber,
  ticketAmount,
  slippage,
  handleInsufficientSlippage,
  txSuccessfulClose,
}) => {
  const rpc = useSolanaRpc();
  const { t } = useTranslation();
  const { connection } = useConnection();
  const queryClient = useQueryClient();
  const walletUi = useWalletUi();
  const signAndSend = useWalletUiSignAndSend();
  const signer = useWalletUiSigner({ account: walletUi.account as UiWalletAccount });
  const [activeStep, setActiveStep] = useState(0);
  const { roundId } = usePlayContext();

  const { data: priceForSol } = useGetTicketPriceForSol();

  const baseCost = toBig(priceForSol || 0).mul(ticketAmount);
  const slippageCoefficient = 1 + Number(slippage) / 100;
  const maxCost = baseCost.mul(slippageCoefficient);

  const { refetch } = useSolRaffleRound(typeof roundId !== "number" ? -1 : roundId);

  const processes: ProcessItemProps[] = [
    { text: t(TXT_APPROVAL), status: getProcessItemStatus({ index: 0, activeStep }) },
    { text: t(TXT_SEND_TO_PRIZE_POOL), status: getProcessItemStatus({ index: 1, activeStep }) },
  ];

  const handlePurchase = async () => {
    try {
      const { data } = await refetch({ throwOnError: true });

      const purchaseArguments = {
        player: signer,
        btcPriceFeed: address(btcPriceFeedAddress),
        solPriceFeed: address(solPriceFeedAddress),
        roundId: raffleNumber - 1,
        purchaseIndex: data?.purchasesCount || 0,
        count: ticketAmount,
        maxCost: Math.ceil(maxCost.mul(LAMPORTS_PER_SOL).toNumber()),
      };

      try {
        const asyncInstruction = await getBuyTicketsSolInstructionAsync(purchaseArguments);

        const signature = await signAndSend(asyncInstruction, signer);

        const latestBlockhash = await connection.getLatestBlockhash();
        const confirmation = await connection.confirmTransaction(
          {
            signature,
            blockhash: latestBlockhash.blockhash,
            lastValidBlockHeight: latestBlockhash.lastValidBlockHeight,
          },
          "confirmed",
        );

        // Check if transaction was successful
        if (confirmation.value.err) {
          throw new Error("Transaction failed: " + JSON.stringify(confirmation.value.err));
        }

        setActiveStep((prevState) => prevState + 1);

        await queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.SOL.GET_RAFFLE_ROUND_DATA, raffleNumber - 1],
        });

        txSuccessfulClose();
      } catch (error) {
        try {
          const asyncInstruction = await getBuyTicketsSolInstructionAsync(purchaseArguments);
          const base64Transaction = await getBase64Transaction(rpc, asyncInstruction);

          if (!base64Transaction) {
            txFailedClose(error);
            return null;
          }

          const simulation = await rpc
            .simulateTransaction(base64Transaction, {
              commitment: "processed",
              encoding: "base64",
              replaceRecentBlockhash: true,
            })
            .send();

          if (simulation?.value?.logs?.length) {
            if (simulation.value.logs.some((log) => log.includes("Insufficient slippage"))) {
              handleInsufficientSlippage();
              return;
            }

            if (simulation.value.logs.some((log) => log.includes("insufficient lamports"))) {
              txFailedClose({ message: t(TXT_TX_ERROR_BALANCE_TO) });
              return;
            }
          }
        } catch (err) {
          txFailedClose(err);
        }

        txFailedClose(error);
      }
    } catch (err) {
      txFailedClose(err);
    }
  };

  useEffect(() => {
    if (!signer) {
      return;
    }

    handlePurchase();
  }, [signer.address]);

  return (
    <EntryConfirmView
      processes={processes}
      raffleNumber={raffleNumber}
      {...getWarningTextsByStepNative({ activeStep })}
    />
  );
};
