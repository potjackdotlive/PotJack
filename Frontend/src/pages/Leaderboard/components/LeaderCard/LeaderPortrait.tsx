import { FC } from "react";
import { Avatar, Flex, Typography } from "antd";
import { css } from "@emotion/react";
import Blockie from "components/Blockie/Blockie";
import { LeaderboardPageUserStats } from "graphql/gen/responseTypes";
import { commonStyles } from "styles/commonStyles";
import { leaderCardStyles } from "./leaderCardStyles";

type PlacementType = 1 | 2 | 3;

type Props = {
  placement: PlacementType;
} & Pick<LeaderboardPageUserStats, "userAddress">;

export const LeaderPortrait: FC<Props> = ({ placement, userAddress = "" }) => {
  const placementColor = placement === 1 ? "gold" : placement === 2 ? "silver" : "purple";

  return (
    <Flex css={commonStyles.fullWidth} style={{ height: 100 }} justify="center">
      <div style={{ position: "relative", width: 64 }}>
        <Typography
          css={css`
            color: inherit;
            position: absolute;
            left: 50%;
            top: 5px;
            transform: translateX(-50%);
          `}
        >
          {placement}
        </Typography>
        <img
          src={`leader/leader-bg-${placementColor}.png`}
          style={{
            position: "absolute",
            left: -110,
            top: -25,
            zIndex: 1,
            width: 287,
            height: 285,
          }}
        />
        <div css={leaderCardStyles.avatarWrapper}>
          <Avatar shape="square" src={<Blockie address={userAddress} size={54} />} size={54} />
        </div>
        <img
          src={`leader/leader-bottom-${placementColor}.png`}
          style={{
            height: 24,
            width: 64,
            bottom: -8,
            zIndex: 2,
            position: "absolute",
            left: 0,
          }}
        />
        <img
          src={`leader/leader-image-wrapper-${placementColor}.png`}
          style={{ height: 64, width: 64, objectFit: "contain", position: "absolute", zIndex: 2, top: 28, left: 0 }}
        />
        <img
          alt="leaves-left"
          src={`leader/leader-leaves-left-${placementColor}.png`}
          style={{ height: 56, width: 60, position: "absolute", top: 11, zIndex: 2, left: -32 }}
        />
        <img
          alt="leaves-right"
          src={`leader/leader-leaves-right-${placementColor}.png`}
          style={{
            height: 56,
            width: 60,
            position: "absolute",
            zIndex: 2,
            right: -32,
            top: 11,
          }}
        />
      </div>
    </Flex>
  );
};
