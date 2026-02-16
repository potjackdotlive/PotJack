import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Flex, Typography } from "antd";
import useBreakpoint from "antd/es/grid/hooks/useBreakpoint";
import TicketIcon from "icons/li_ticket.svg?react";
import MeIndicator from "icons/me-indicator.svg?react";
import { LeaderExtraStatusIcon } from "components/LeaderExtraStatusIcon/LeaderExtraStatusIcon";
import { UserStats } from "graphql/gen/types";
import { commonStyles } from "styles/commonStyles";
import { typographyStyles } from "styles/typography";
import { TXT_TICKETS, TXT_TOTAL_WINS, TXT_WALLET } from "translations";
import { addressFormatter } from "utils/formatters/addressFormatter";
import { getExtraStatusClassName } from "utils/getExtraStatusClassName";
import { getExtraStatusesByBadges } from "utils/getExtraStatusesByBadges";
import { getPositionClassName } from "utils/getPositionClassName";
import { leaderboardParticipantStyles as styles } from "./styles/leaderboardParticipantStyles";

type ParticipantContentProps = {
  showTopInfo?: boolean;
  isSelf?: boolean;
} & Pick<UserStats, "rank" | "userAddress" | "badges" | "tickets" | "totalWins">;

const ParticipantContent: FC<ParticipantContentProps> = ({
  rank = 0,
  userAddress = "",
  badges,
  tickets,
  totalWins,
  isSelf,
  showTopInfo = true,
}) => {
  const { t } = useTranslation();
  const { xs } = useBreakpoint();

  const extraStatus = getExtraStatusesByBadges({ badges, rank })[0];

  if (xs) {
    return (
      <>
        <Flex gap={12}>
          <div
            css={[styles.position, styles.mobilePosition, isSelf ? [styles.selfPosition] : []]}
            className={getPositionClassName(rank)}
          >
            {rank}
          </div>
        </Flex>
        <Flex gap={16} vertical css={commonStyles.fullWidth}>
          {showTopInfo && (
            <Flex gap={24} css={commonStyles.fullWidth}>
              <Flex vertical css={commonStyles.fullWidth}>
                <Typography css={[typographyStyles.bodyDefaultMd, commonStyles.textMuted]}>{t(TXT_WALLET)}</Typography>
                <Flex gap={8} align="center" css={getExtraStatusClassName(extraStatus)}>
                  <Typography css={typographyStyles.monoDefaultMd} color="inherit">
                    {addressFormatter(userAddress)}
                  </Typography>
                  {extraStatus && <LeaderExtraStatusIcon width={16} height={16} status={extraStatus} />}
                </Flex>
              </Flex>
            </Flex>
          )}

          <Flex gap={24} css={commonStyles.fullWidth}>
            <Flex vertical css={commonStyles.fullWidth}>
              <Typography css={[typographyStyles.bodyDefaultMd, commonStyles.textMuted]}>{t(TXT_TICKETS)}</Typography>
              <Flex align="center" gap={6}>
                <TicketIcon css={styles.labelMuted} />
                <Typography css={[typographyStyles.bodyDefaultMd, styles.labelWhite]}>{tickets}</Typography>
              </Flex>
            </Flex>

            <Flex vertical css={commonStyles.fullWidth}>
              <Typography css={[typographyStyles.bodyDefaultMd, commonStyles.textMuted]}>
                {t(TXT_TOTAL_WINS)}
              </Typography>
              <Typography css={[typographyStyles.bodyDefaultMd, styles.labelWhite]}>{totalWins}</Typography>
            </Flex>
          </Flex>
        </Flex>
        {isSelf && (
          <div css={styles.meIndicator}>
            <MeIndicator />
          </div>
        )}
      </>
    );
  }

  return (
    <>
      <Flex gap={12}>
        <div
          css={[styles.position, styles.desktopPosition, isSelf ? [styles.selfPosition] : []]}
          className={getPositionClassName(rank)}
        >
          {rank}
        </div>
      </Flex>
      <Flex gap={8} align="center" css={getExtraStatusClassName(extraStatus)}>
        <Typography css={typographyStyles.monoDefaultMd} color="inherit">
          {addressFormatter(userAddress)}
        </Typography>
        {extraStatus && <LeaderExtraStatusIcon width={16} height={16} status={extraStatus} />}
      </Flex>
      <Flex align="center" gap={6}>
        <TicketIcon css={styles.labelMuted} />
        <Typography css={[typographyStyles.bodyDefaultMd, styles.labelWhite]}>{tickets}</Typography>
      </Flex>
      <Flex>
        <Typography css={[typographyStyles.bodyDefaultMd, styles.labelWhite]}>{totalWins}</Typography>
      </Flex>
      {isSelf && (
        <div css={styles.meIndicator}>
          <MeIndicator />
        </div>
      )}
    </>
  );
};

export default ParticipantContent;
