import { Dispatch, FC, SetStateAction } from "react";
import { useTranslation } from "react-i18next";
import { Flex, Switch, Typography } from "antd";
import { css } from "@emotion/react";
import { SwitchProps } from "antd/es/switch";
import { typographyStyles } from "styles/typography";
import { TXT_ONLY_MY_ROUNDS } from "translations";

const styles = {
  rootDisabled: css`
    opacity: 0.5;
  `,
  switcher: css`
    width: 44px;
    height: 24px;
    background: var(--color-neutral-border-neutral, #3f3f46);

    &.ant-switch-checked {
      background: var(--color-primary-border-primary, #9333ea);
    }

    &:hover:not(.ant-switch-disabled) {
      background: var(--color-neutral-border-neutral, #3f3f46);
    }

    &.ant-switch-checked:hover:not(.ant-switch-disabled) {
      background: var(--color-primary-border-primary, #9333ea);
    }

    & .ant-switch-handle:before {
      background: var(--color-neutral-background-neutral, #131313);
    }

    &&.ant-switch.ant-switch-checked .ant-switch-handle {
      inset-inline-start: calc(100% - 22px);
    }

    & .ant-switch,
    & .ant-switch-handle {
      width: 20px;
      height: 20px;
    }

    && .ant-switch-handle:before {
      border-radius: 20px;
    }
  `,
};

type Props = SwitchProps & {
  myRoundsOnly: boolean;
  setMyRoundsOnly: Dispatch<SetStateAction<boolean>>;
};

export const HistorySwitch: FC<Props> = ({ myRoundsOnly, setMyRoundsOnly, ...props }) => {
  const { t } = useTranslation();

  const handleSwitch = (state: boolean) => {
    setMyRoundsOnly(state);
  };

  return (
    <Flex justify="center" gap={8} align="center" css={props?.disabled && styles.rootDisabled}>
      <Switch
        defaultChecked
        css={styles.switcher}
        size="default"
        value={myRoundsOnly}
        onChange={handleSwitch}
        {...props}
      />
      <Typography css={typographyStyles.bodyDefaultTidy}>{t(TXT_ONLY_MY_ROUNDS)}</Typography>
    </Flex>
  );
};
