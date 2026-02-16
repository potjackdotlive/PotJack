import { FC } from "react";
import { Flex, Typography } from "antd";
import { css } from "@emotion/react";
import { NetworkIconProvider } from "components/NetworkIconProvider/NetworkIconProvider";
import { NetworkIconVariant } from "components/NetworkIconProvider/types";
import { typographyStyles } from "styles/typography";
import { ChainIdType } from "utils/types";

type Props = {
  chainId: ChainIdType;
  chainName: string;
  variant?: NetworkIconVariant;
};

export const NetworkLogoShortname: FC<Props> = ({ chainId, chainName, variant = NetworkIconVariant.Default }) => (
  <Flex gap={8} align="center">
    <Flex
      css={css`
        height: 40px;
        width: 40px;
        border-radius: 50%;
        border: 1px solid var(--color-neutral-border-neutral, #3f3f46);
        background: var(--color-muted-background-muted-p50, rgba(39, 39, 42, 0.5));
        align-items: center;
        justify-content: center;
      `}
    >
      <NetworkIconProvider chainId={chainId} width={24} height={24} variant={variant} />
    </Flex>

    <Typography
      css={css`
        color: var(--color-neutral-text-neutral-foreground, #fff);
        ${typographyStyles.bodyDefaultMd}
      `}
    >
      {chainName}
    </Typography>
  </Flex>
);
