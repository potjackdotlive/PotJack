import { FC } from "react";
import { Flex, Typography } from "antd";
import { css } from "@emotion/react";
import CheckIcon from "icons/li_check-circle-2.svg?react";
import LoaderPendingIcon from "icons/loader-pending.svg?react";
import LoaderSuccessIcon from "icons/loader-success.svg?react";
import { typographyStyles } from "styles/typography";

export enum ProcessItemStatus {
  Pending = 0,
  Ongoing = 1,
  Done = 2,
}

const Icon: FC<{ status: ProcessItemStatus }> = ({ status }) => {
  switch (status) {
    case ProcessItemStatus.Pending:
      return <LoaderPendingIcon />;
    case ProcessItemStatus.Ongoing:
      return <LoaderSuccessIcon className="anticon-spin" />;
    case ProcessItemStatus.Done:
      return <CheckIcon />;
  }
};

export type ProcessItemProps = {
  text: string;
  status: ProcessItemStatus;
};

export const ProcessItem: FC<ProcessItemProps> = ({ text, status }) => {
  const colorStyle =
    status === ProcessItemStatus.Ongoing
      ? css`
          color: var(--color-neutral-text-neutral-foreground, #fff);
        `
      : css`
          color: var(--scale-white-white-alpha-twenty, rgba(255, 255, 255, 0.2));
        `;

  return (
    <Flex gap={6} align="center">
      <Icon status={status} />
      <Typography css={[colorStyle, typographyStyles.bodyLargeMd]}>{text}</Typography>
    </Flex>
  );
};
