import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { ApolloQueryResult } from "@apollo/client";
import { useConnection } from "@solana/wallet-adapter-react";
import { useWalletUiSigner } from "@wallet-ui/react";
import { UiWalletAccount, useWalletUiSignAndSend } from "@wallet-ui/react-gill";
import { address } from "gill";
import { getClaimPrizeSolInstructionAsync } from "anchor/src";
import { Button } from "components/Button/Button";
import { errorNotification } from "components/Notification/Notification";
import { Exact, GetUnclaimedPrizesQuery } from "graphql/gen/types";
import { useWalletConnection } from "hooks/useWalletConnection";
import { TXT_CLAIM_ALL, TXT_ERROR, TXT_PLEASE_CONNECT_YOUR, TXT_TOTAL_PRIZE_AMOUNT } from "translations";

type Props = {
  walletUiAccount?: UiWalletAccount;
  totalPrizeAmount: string;
  refetchInProgress: boolean;
  roundIds: number[];
  refetch: (
    variables?:
      | Partial<
          Exact<{
            winnerAddress: string;
            contractAddress: string;
          }>
        >
      | undefined,
  ) => Promise<ApolloQueryResult<GetUnclaimedPrizesQuery>>;
};

const NoAccounts = () => {
  const { t } = useTranslation();

  return (
    <Button variant="brand" ghost outline={false} disabled>
      {t(TXT_CLAIM_ALL)}
    </Button>
  );
};

const WithAccounts = ({ walletUiAccount, totalPrizeAmount, refetch, refetchInProgress, roundIds }: Props) => {
  const { t } = useTranslation();
  const walletConnection = useWalletConnection();
  const { connection } = useConnection();
  const signer = useWalletUiSigner({ account: walletUiAccount as UiWalletAccount });
  const signAndSend = useWalletUiSignAndSend();
  const [claimInProgress, setClaimInProgress] = useState(false);

  const claimPrize = async () => {
    await refetch();
    try {
      setClaimInProgress(true);

      if (!totalPrizeAmount || totalPrizeAmount === "0" || roundIds.length < 1) {
        throw new Error(t(TXT_TOTAL_PRIZE_AMOUNT));
      }

      if (!walletConnection.address) {
        throw new Error(t(TXT_PLEASE_CONNECT_YOUR));
      }

      for (const roundId of roundIds) {
        const instruction = await getClaimPrizeSolInstructionAsync({
          winner: signer,
          beneficiary: address("DAb9XGcFnfjLoXQQ2XTsMeh85vpp8TaEC2U9thrZUJoi"),
          roundId: Number(roundId),
        });

        const signature = await signAndSend(instruction, signer);

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
          errorNotification({
            message: t(TXT_ERROR),
            description: JSON.stringify(confirmation.value.err),
          });
        }
      }

      await refetch();
      setClaimInProgress(false);
    } catch (err) {
      errorNotification({
        message: t(TXT_ERROR),
        description: (err as unknown as { message: string })?.message || t(TXT_ERROR),
      });

      setClaimInProgress(false);
    }
  };

  return (
    <Button onClick={claimPrize} variant="brand" ghost outline={false} disabled={refetchInProgress || claimInProgress}>
      {t(TXT_CLAIM_ALL)}
    </Button>
  );
};

export const ClaimWinningsAction = (props: Props) => {
  if (props?.walletUiAccount) {
    return <WithAccounts {...props} />;
  }

  return <NoAccounts />;
};
