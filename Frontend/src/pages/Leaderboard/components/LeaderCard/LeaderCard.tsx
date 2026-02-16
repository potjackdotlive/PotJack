import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Flex, Typography } from "antd";
import { css } from "@emotion/react";
import { LeaderExtraStatusIcon } from "components/LeaderExtraStatusIcon/LeaderExtraStatusIcon";
import { UserStats } from "graphql/gen/types";
import { useMediaQueryMatches } from "hooks/useMediaQueryMatches";
import { leaderCardStyles as styles } from "pages/Leaderboard/components/LeaderCard/leaderCardStyles";
import { LeaderPortrait } from "pages/Leaderboard/components/LeaderCard/LeaderPortrait";
import { commonStyles } from "styles/commonStyles";
import { typographyStyles } from "styles/typography";
import { TXT_TICKETS, TXT_TOTAL_WINS } from "translations";
import { addressFormatter } from "utils/formatters/addressFormatter";
import { getExtraStatusesByBadges } from "utils/getExtraStatusesByBadges";

type PlacementType = 1 | 2 | 3;

const PositionIcon: FC<{ placement: PlacementType }> = ({ placement }) => {
  switch (placement) {
    case 1:
      return <img alt="champion" src="positionBadges/champion-lg.png" height={48} width={48} />;
    case 2:
      return <img alt="diamond" src="positionBadges/diamond-lg.png" height={48} width={48} />;
    case 3:
      return <img alt="platinum" src="positionBadges/platinum-lg.png" height={48} width={48} />;
  }
};

type Props = {
  placement: PlacementType;
  leader: Partial<UserStats>;
};

export const LeaderCard: FC<Props> = ({ placement, leader }) => {
  const { t } = useTranslation();
  const { md } = useMediaQueryMatches();

  const className = placement === 1 ? "first" : placement === 2 ? "second" : "third";

  const { tickets, userAddress = "", totalWins, badges, rank = 0 } = leader || {};

  const extraStatus = getExtraStatusesByBadges({ rank, badges })[0];

  return (
    <Flex
      justify="space-evenly"
      vertical
      align="center"
      css={styles.root}
      className={className}
      style={{ display: "flex", width: md ? 303 : 264, height: 236 }}
    >
      {leader && (
        <>
          <LeaderPortrait placement={placement} userAddress={userAddress} />
          <Flex css={[commonStyles.fullWidth]} justify="center" gap={8} align="center">
            <Typography
              css={[
                typographyStyles.monoDefaultMd,
                css`
                  color: inherit;
                `,
              ]}
            >
              {addressFormatter(userAddress)}
            </Typography>
            {extraStatus && <LeaderExtraStatusIcon status={extraStatus} width={16} height={16} />}
          </Flex>

          <Flex
            gap={12}
            align="center"
            justify="center"
            css={[
              commonStyles.fullWidth,
              css`
                padding: 0 16px;
              `,
            ]}
          >
            <Flex
              vertical
              align="center"
              css={css`
                width: 33%;
                align-items: center;
              `}
            >
              <Typography css={[typographyStyles.h4, commonStyles.fullWidth, commonStyles.textAlignCenter]}>
                {tickets}
              </Typography>
              <Typography css={[typographyStyles.bodyDefaultRg, commonStyles.textMuted]}>{t(TXT_TICKETS)}</Typography>
            </Flex>
            <Flex
              css={css`
                width: 48px;
                justify-content: center;
              `}
            >
              <PositionIcon placement={placement} />
            </Flex>
            <Flex
              vertical
              align="center"
              justify="center"
              css={css`
                width: 33%;
                align-items: center;
              `}
            >
              <Typography css={[typographyStyles.h4, commonStyles.fullWidth, commonStyles.textAlignCenter]}>
                {totalWins}
              </Typography>
              <Typography
                css={[
                  typographyStyles.bodyDefaultRg,
                  commonStyles.textMuted,
                  css`
                    white-space: nowrap;
                    overflow: hidden;
                  `,
                ]}
              >
                {t(TXT_TOTAL_WINS)}
              </Typography>
            </Flex>
          </Flex>
        </>
      )}
    </Flex>
  );
};
