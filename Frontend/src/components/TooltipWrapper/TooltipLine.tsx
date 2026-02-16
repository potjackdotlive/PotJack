import { ReactElement } from "react";
import { Typography } from "antd";
import { css } from "@emotion/react";
import CopyIcon from "icons/copy.svg?react";
import CheckIcon from "icons/li_check-circle.svg?react";
import { useCopy } from "hooks/useCopy";
import { commonStyles } from "styles/commonStyles";
import { typographyStyles } from "styles/typography";

const styles = {
  root: css`
    display: flex;
    align-items: flex-start;
    gap: 8px;
  `,
  valueWrapper: css`
    display: flex;
    gap: 4px;
  `,
  copyable: css`
    cursor: pointer;
  `,
  copyIcon: css`
    width: 36px;
    height: 24px;
  `,
};

type TooltipLineProps = {
  prefix: string;
  value: string | ReactElement;
  copyable?: boolean;
  mono?: boolean;
};

export const TooltipLine = ({ prefix, value, copyable = false, mono = false }: TooltipLineProps) => {
  const { isCopied, handleCopy } = useCopy({ value: `${value}` });

  return (
    <div css={styles.root}>
      <Typography
        css={[
          commonStyles.textMuted,
          typographyStyles.bodyDefaultRg,
          css`
            flex-shrink: 0;
          `,
        ]}
      >
        {prefix}:
      </Typography>
      <div
        css={[styles.valueWrapper, copyable && styles.copyable]}
        {...(copyable && {
          onClick: handleCopy,
        })}
      >
        <Typography
          css={[commonStyles.textNeutral, mono ? typographyStyles.monoDefaultMd : typographyStyles.bodyDefaultMd]}
        >
          {value}
        </Typography>
        {copyable && <>{isCopied ? <CheckIcon css={[styles.copyIcon]} /> : <CopyIcon css={styles.copyIcon} />}</>}
      </div>
    </div>
  );
};
