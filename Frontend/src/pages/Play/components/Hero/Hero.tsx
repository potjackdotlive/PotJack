import * as React from "react";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Flex, Typography } from "antd";
import { css } from "@emotion/react";
import ArrowDownIcon from "icons/ArrowDown.svg?react";
import { Button } from "components/Button/Button";
import { useMediaQueryMatches } from "hooks/useMediaQueryMatches";
import { Coins } from "pages/Play/components/Hero/components/Coins/Coins";
import Counter from "pages/Play/components/Hero/components/Counter/Counter";
import { heroStyles } from "pages/Play/components/Hero/styles";
import { typographyStyles } from "styles/typography";
import { TXT_ALL_POOLS_TOTAL_PRIZE, TXT_PARTICIPATE_IN_THE_GAME } from "translations";

type Props = {
  totalPool: number;
};

const Hero: FC<Props> = ({ totalPool }) => {
  const { t } = useTranslation();
  const { xl } = useMediaQueryMatches();

  const scrollDown = () => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  };

  return (
    <Flex vertical css={heroStyles.root}>
      <Flex vertical align="center" gap={28}>
        <Coins />

        <Flex
          vertical
          align="center"
          gap={12}
          css={
            xl
              ? css``
              : css`
                  margin-bottom: 24px;
                `
          }
        >
          <Typography.Title level={3} css={typographyStyles.h3} style={{ color: "#A1A1AA" }}>
            {t(TXT_ALL_POOLS_TOTAL_PRIZE)}
          </Typography.Title>
          <Counter to={totalPool} />
        </Flex>
        {xl && (
          <Button variant="alert" ghost onClick={scrollDown}>
            <ArrowDownIcon />
            {t(TXT_PARTICIPATE_IN_THE_GAME)}
            <ArrowDownIcon />
          </Button>
        )}
      </Flex>
    </Flex>
  );
};

export default Hero;
