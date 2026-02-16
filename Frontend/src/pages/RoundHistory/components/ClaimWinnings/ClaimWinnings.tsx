import React from "react";
import { useTranslation } from "react-i18next";
import { Flex, Tooltip, Typography } from "antd";
import { css } from "@emotion/react";
import { useWalletUi } from "@wallet-ui/react";
import { lamportsToSol } from "gill";
import InfoIcon from "icons/Info.svg?react";
import { RAFFLE_PROGRAM_ADDRESS } from "anchor/src";
import { TooltipWrapper } from "components/TooltipWrapper/TooltipWrapper";
import { useGetUnclaimedPrizesQuery } from "graphql/gen/hooks";
import { useWalletConnection } from "hooks/useWalletConnection";
import { ticketStyles } from "pages/Play/components/BuyTicketEth/ticketStyles";
import { ClaimWinningsAction } from "pages/RoundHistory/components/ClaimWinnings/ClaimWinningsAction";
import { commonStyles } from "styles/commonStyles";
import { typographyStyles } from "styles/typography";
import { TXT_CLAIM_YOUR_WINNINGS_WITHDRAW, TXT_UNCLAIMED_WINNINGS } from "translations";

export const ClaimWinnings = () => {
  const { t } = useTranslation();
  const walletConnection = useWalletConnection();
  const walletUi = useWalletUi();

  const query = useGetUnclaimedPrizesQuery({
    variables: {
      contractAddress: RAFFLE_PROGRAM_ADDRESS,
      winnerAddress: walletConnection?.address || "",
    },
    nextFetchPolicy: "cache-first",
    pollInterval: 15_000,
  });

  const totalPrizeAmount = query?.data?.unclaimedPrizes?.totalPrizeAmount || "0";

  return (
    <Flex
      justify="center"
      gap={40}
      align="center"
      css={[
        css`
          display: flex;
          padding: 8px 8px 8px 12px;
          align-items: center;
          gap: 46px;
          border-radius: 12px;
          border: 1px solid var(--color-contrast-border-contrast, #3f3f46);
          background: var(--color-item-background-card, #131313);
          box-shadow: 0 2px 20px 2px rgba(179, 0, 134, 0.3) inset;
        `,
      ]}
    >
      <Flex vertical gap={4}>
        <Flex gap={6}>
          <Typography css={typographyStyles.bodyDefaultMd}>SOL</Typography>
          <Typography css={typographyStyles.bodyDefaultMd}>{lamportsToSol(Number(totalPrizeAmount))}</Typography>
        </Flex>
        <Flex gap={6}>
          <Typography css={[typographyStyles.bodyDefaultMd, commonStyles.textMuted]}>
            {t(TXT_UNCLAIMED_WINNINGS)}
          </Typography>
          <Tooltip
            title={
              <TooltipWrapper>
                <Typography css={[typographyStyles.bodyDefaultMd]}>{t(TXT_CLAIM_YOUR_WINNINGS_WITHDRAW)}</Typography>
              </TooltipWrapper>
            }
            destroyOnHidden
            arrow={false}
            placement="bottom"
            css={ticketStyles.iconMuted}
          >
            <InfoIcon
              css={css`
                align-self: center;
                width: 16px;
                height: 16px;
              `}
            />
          </Tooltip>
        </Flex>
      </Flex>
      <ClaimWinningsAction
        walletUiAccount={walletUi?.account}
        totalPrizeAmount={totalPrizeAmount}
        refetch={query.refetch}
        roundIds={query?.data?.unclaimedPrizes?.rounds || []}
        refetchInProgress={query.loading}
      />
    </Flex>
  );
};
