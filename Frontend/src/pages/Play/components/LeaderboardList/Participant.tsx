import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Flex, Typography } from "antd";
import { css } from "@emotion/react";
import TicketIcon from "icons/li_ticket.svg?react";
import { LeaderExtraStatusIcon } from "components/LeaderExtraStatusIcon/LeaderExtraStatusIcon";
import { ParticipantTooltip } from "components/ParticipantTooltip/ParticipantTooltip";
import { DashboardUserStats, SelfStatsType } from "graphql/gen/responseTypes";
import { useWalletConnection } from "hooks/useWalletConnection";
import { MeLabel } from "pages/Play/components/LeaderboardList/MeLabel";
import { participantStyles } from "pages/Play/components/LeaderboardList/styles";
import { useHighlightContext } from "pages/Play/contexts/chartHighlightContext/chartHighlightContextUtils";
import { usePlayContext } from "pages/Play/contexts/playContext/playContextUtils";
import { typographyStyles } from "styles/typography";
import { TXT_WIN_PREFIX } from "translations";
import { SepoliaCoinType } from "utils/enums/tokens/sepoliaTokens";
import { addressFormatter } from "utils/formatters/addressFormatter";
import { getExtraStatusClassName } from "utils/getExtraStatusClassName";
import { getExtraStatusesByBadges } from "utils/getExtraStatusesByBadges";
import { getNetworkNameByContractAddress } from "utils/getNetworkNameByContractAddress";
import { getPositionClassName } from "utils/getPositionClassName";

type Props = { chain?: SepoliaCoinType; isWinner?: boolean; hideSelf?: boolean } & (DashboardUserStats | SelfStatsType);

export const Participant: FC<Props> = (props) => {
  const { networkId } = usePlayContext();
  const { t } = useTranslation();
  const { address } = useWalletConnection();
  const { highlightedItem } = useHighlightContext();

  const { userAddress = "", rank = 0, tickets, badges, chain, contractAddress, isWinner, hideSelf } = props;

  if (address && hideSelf && address === userAddress) {
    return null;
  }

  const positionClassName = getPositionClassName(rank);
  const extraStatus = getExtraStatusesByBadges({ badges, rank })[0];
  const isMe = userAddress?.toLowerCase() === address?.toLowerCase();

  const className = [positionClassName, isWinner && "winner"].join(" ");

  const totalWins = props.totalWins || 0;
  const dimCondition = highlightedItem && highlightedItem?.toLowerCase() !== userAddress?.toLowerCase();

  return (
    <ParticipantTooltip
      rank={rank || 0}
      userAddress={userAddress}
      tickets={tickets}
      badges={badges}
      placement="left"
      // hide contractAddress for tooltip in allPools
      {...(networkId && contractAddress && { contractAddress: contractAddress })}
      totalWins={totalWins}
    >
      <Flex
        css={[
          participantStyles.root,
          dimCondition
            ? css`
                opacity: 0.6;
              `
            : css``,
        ]}
        className={className}
      >
        <Flex gap={12}>
          <div css={isWinner && participantStyles.winnerWrapper}>
            <div css={participantStyles.position} className={className}>
              {rank}
            </div>
          </div>

          <Flex vertical gap={2} align="flex-start">
            <Flex gap={8} align="center" css={getExtraStatusClassName(extraStatus)}>
              <Typography css={[typographyStyles.monoDefaultMd]}>{addressFormatter(userAddress)}</Typography>
              {extraStatus && <LeaderExtraStatusIcon width={16} height={16} status={extraStatus} />}
            </Flex>
            <Typography css={[typographyStyles.bodyDefaultMd, participantStyles.chain]}>
              {chain || getNetworkNameByContractAddress(contractAddress)}
            </Typography>
          </Flex>
        </Flex>
        <Flex vertical gap={2} align="center">
          {isMe ? (
            <MeLabel />
          ) : (
            <>
              <Flex align="center" gap={6}>
                <TicketIcon css={participantStyles.labelMuted} />
                <Typography css={[typographyStyles.bodyDefaultMd, participantStyles.labelWhite]}>{tickets}</Typography>
              </Flex>
              <Flex
                gap={4}
                justify="flex-end"
                align="center"
                css={css`
                  align-self: end;
                `}
              >
                <Typography css={[typographyStyles.bodySmallMd, participantStyles.labelMuted]}>
                  {t(TXT_WIN_PREFIX)}
                </Typography>
                <Typography css={[typographyStyles.bodyDefaultMd, participantStyles.labelWhite]}>
                  {totalWins}
                </Typography>
              </Flex>
            </>
          )}
        </Flex>
      </Flex>
    </ParticipantTooltip>
  );
};
