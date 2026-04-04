// eslint-disable-next-line import/no-unresolved
import "swiper/css";

import React, { FC } from "react";
import { Flex, Spin } from "antd";
import { css } from "@emotion/react";
// eslint-disable-next-line import/no-unresolved
import { Swiper, SwiperSlide } from "swiper/react";
import { ParticipantTooltip } from "components/ParticipantTooltip/ParticipantTooltip";
import { useGetUserStatsQuery } from "graphql/gen/hooks";
import { useMediaQueryMatches } from "hooks/useMediaQueryMatches";
import { useResponsive } from "hooks/useResponsive";
import { LeaderCard } from "pages/Leaderboard/components/LeaderCard/LeaderCard";
import { TOP_LEADERS_LIMIT } from "pages/Leaderboard/utils";
import { LeadersProps } from "./types";

export const Leaders: FC<LeadersProps> = ({ contractAddress, tokenAddress }) => {
  const responsive = useResponsive();
  const { lg, md } = useMediaQueryMatches();

  const { data, loading } = useGetUserStatsQuery({
    variables: {
      contractAddress,
      tokenAddress,
      limit: TOP_LEADERS_LIMIT + 1,
      offset: 0,
    },
    pollInterval: 5000,
    skip: !contractAddress || !tokenAddress,
  });

  const topLeaders = data?.userStats?.content || [];

  if (loading) {
    return (
      <Flex>
        <Spin size="large" />
      </Flex>
    );
  }

  if (topLeaders.length <= TOP_LEADERS_LIMIT) {
    return null;
  }

  if (!md) {
    return (
      <div
        css={css`
          display: grid;
          grid: 1fr/100%;
        `}
      >
        <Swiper
          spaceBetween={8}
          slidesPerView="auto"
          centeredSlides
          initialSlide={1}
          css={css`
            &.swiper {
              width: 100%;
            }

            &.swiper-wrapper {
              width: 100%;
            }

            & .swiper-slide {
              width: fit-content;
            }
          `}
        >
          <SwiperSlide>
            <LeaderCard placement={2} leader={topLeaders[1]} />
          </SwiperSlide>
          <SwiperSlide>
            <LeaderCard placement={1} leader={topLeaders[0]} />
          </SwiperSlide>
          <SwiperSlide>
            <LeaderCard placement={3} leader={topLeaders[2]} />
          </SwiperSlide>
        </Swiper>
      </div>
    );
  }

  return (
    <Flex
      gap={responsive({ sm: 8, md: 16, lg: 20 })}
      justify="center"
      wrap={responsive({ md: "wrap-reverse", lg: "wrap" })}
    >
      <ParticipantTooltip {...topLeaders[1]}>
        <div style={{ marginTop: lg ? 16 : 0 }}>
          <LeaderCard placement={2} leader={topLeaders[1]} />
        </div>
      </ParticipantTooltip>
      <ParticipantTooltip {...topLeaders[0]}>
        <div style={responsive({ md: { order: 1 }, lg: { order: 0 } })}>
          <LeaderCard placement={1} leader={topLeaders[0]} />
        </div>
      </ParticipantTooltip>
      <ParticipantTooltip {...topLeaders[2]}>
        <div style={{ marginTop: lg ? 32 : 0 }}>
          <LeaderCard placement={3} leader={topLeaders[2]} />
        </div>
      </ParticipantTooltip>
    </Flex>
  );
};
