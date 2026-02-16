import { FC } from "react";
import { Flex, Typography } from "antd";
import { css } from "@emotion/react";
import { CoinIconProvider } from "components/CoinIconProvider/CoinIconProvider";
import { typographyStyles } from "styles/typography";
import { CoinType } from "utils/types";

type Props = {
  token: CoinType;
};

export const LogoShortname: FC<Props> = ({ token }) => (
  <Flex gap={8} align="center">
    <CoinIconProvider token={token} />
    <Typography
      css={css`
        color: var(--color-neutral-text-neutral-foreground, #fff);
        ${typographyStyles.bodyDefaultMd}
      `}
    >
      {token}
    </Typography>
  </Flex>
);
