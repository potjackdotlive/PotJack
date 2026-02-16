import { FC, ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { Select, Typography } from "antd";
import { css } from "@emotion/react";
import { DefaultOptionType } from "antd/es/select";
import CheckIcon from "icons/li_check.svg?react";
import ChevronIcon from "icons/li_chevron-down.svg?react";
import { BlockchainIconProvider } from "components/BlockchainSelector/BlockchainIconProvider";
import { CoinIconProvider } from "components/CoinIconProvider/CoinIconProvider";
import { typographyStyles } from "styles/typography";
import { TXT_SELECT_TOKEN } from "translations";
import { getColorByChain } from "utils/getColorByChain";
import { ChainIdType, CoinType } from "utils/types";

const styles = {
  root: css`
    height: 36px;
    gap: 8px;
    padding: 0;

    & input {
      color: var(--color-muted-text-muted-foreground, #a1a1aa);

      &::placeholder {
        color: white;
      }
    }

    & .ant-select-prefix {
      display: flex;
    }

    &.ant-select-single:not(.ant-select-customize-input) .ant-select-selector {
      padding: 0;
      border: none;
    }

    &.ant-select-open .ant-select-selection-item,
    & .ant-select-selection-item {
      color: var(--color-neutral-text-neutral-foreground, #fff);
      ${typographyStyles.h1}
    }

    &:hover .ant-select-selection-item,
    &:hover .ant-select-selection-placeholder {
      transition: color 0.3s ease;
      color: var(--color-primary-text-secondary-foreground, #c084fc);
    }

    &.ant-select.ant-select-outlined.ant-select-focused div.ant-select-selector:not(.ant-pagination-size-changer) {
      box-shadow:
        0px 0px 0px 1px #a1a1aa,
        0px 1px 2px 0px rgba(0, 0, 0, 0.05);
    }

    &.ant-select.ant-select-outlined .ant-select-selector {
      display: flex;
      height: 36px;
      padding: 4px 12px;
      align-items: center;
      gap: 8px;
      align-self: stretch;
      background: var(--color-neutral-background-neutral, #131313);
      color: var(--color-neutral-text-neutral-foreground, #fff);
      border-radius: var(--radius-radius-md, 12px);
      border: 1px solid var(--color-neutral-border-neutral, #3f3f46);
      background: var(--color-neutral-background-neutral, #131313);

      /* system/shadow-sm */
      box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.05);
      ${typographyStyles.bodyDefaultRg}
    }

    &.ant-select.ant-select-outlined .ant-select-selector div.ant-select-prefix {
      color: var(--color-muted-text-muted-foreground, #a1a1aa);
      display: flex;
      margin: 0;
      justify-content: center;
    }

    &.ant-select.ant-select-open span.ant-select-arrow {
      transform: rotate(180deg);
      transition: all 0.3s ease;
    }

    &.ant-select span.ant-select-arrow {
      display: flex;
      position: relative;
      margin-left: 8px;
      align-items: center;
      font-style: normal;
      line-height: 1;
      text-align: center;
      text-rendering: optimizeLegibility;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      top: 50%;
      inset-inline-start: auto;
      inset-inline-end: 11px;
      font-size: 14px;
      pointer-events: none;
      transition: transform 0.3s ease;
      color: var(--color-neutral-text-neutral-foreground, #fff);
    }

    & .ant-select-selection-placeholder {
      transition: color 0.3s ease;
      color: var(--color-neutral-text-neutral-foreground, #fff);
      ${typographyStyles.h1}
    }
  `,
  pin: css`
    height: 6px;
    width: 6px;
    border-radius: 6px;
    align-self: center;
  `,
};

type Props = {
  value: string | number;
  isCoin: boolean;
  onChange?: (value: string | number, option?: DefaultOptionType) => void;
  options: DefaultOptionType[];
  IconProvider?: ReactNode;
};

export const TransparentSelect: FC<Props> = ({ value, onChange, options, isCoin }) => {
  const { t } = useTranslation();

  return (
    <Select
      value={value}
      defaultActiveFirstOption
      optionFilterProp="label"
      onChange={onChange}
      variant="borderless"
      menuItemSelectedIcon={<CheckIcon width={16} height={16} />}
      popupMatchSelectWidth={false}
      placeholder={t(TXT_SELECT_TOKEN)}
      css={styles.root}
      options={options}
      suffixIcon={<ChevronIcon width={24} height={24} />}
      optionRender={(item) => (
        <div
          css={css`
            display: flex;
            flex-direction: row;
            gap: 8px;
            height: 100%;
            margin-right: 8px;
          `}
        >
          <div css={styles.pin} style={{ backgroundColor: getColorByChain(item.value as ChainIdType) }} />
          <Typography css={typographyStyles.bodyDefaultRg}>{item.label}</Typography>
        </div>
      )}
      {...(value && {
        prefix: isCoin ? (
          <CoinIconProvider token={value as CoinType} height={24} width={24} />
        ) : (
          <BlockchainIconProvider chainId={value} width={24} height={24} />
        ),
      })}
    />
  );
};
