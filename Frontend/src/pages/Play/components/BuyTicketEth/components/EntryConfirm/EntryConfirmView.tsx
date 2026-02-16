import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Flex, Tag, Typography } from "antd";
import LoaderWarningIcon from "icons/loader-warning.svg?react";
import { Alert } from "components/Alert/Alert";
import Timer from "pages/Play/components/Timer/Timer";
import { usePlayContext } from "pages/Play/contexts/playContext/playContextUtils";
import { commonStyles } from "styles/commonStyles";
import { TXT_ROUND, TXT_ROUND_NUMBER } from "translations";
import { entryConfirmStyles as styles } from "./entryConfirmStyles";
import { ProcessItem, ProcessItemProps } from "./ProcessItem";

type Props = {
  processes: ProcessItemProps[];
  raffleNumber: number;
  message: string;
  description: string;
};

export const EntryConfirmView: FC<Props> = ({ processes, raffleNumber, message, description }) => {
  const { t } = useTranslation();
  const { coin } = usePlayContext();

  return (
    <Flex css={commonStyles.fullWidth} vertical gap={24}>
      <Flex css={styles.raffleInfoContainer} gap={8}>
        <Flex gap={8}>
          <Typography>{t(TXT_ROUND)}</Typography>
          <Flex gap={6}>
            <Tag css={styles.tag}>{coin}</Tag>
            <Tag css={styles.tag}>{t(TXT_ROUND_NUMBER, { number: raffleNumber })}</Tag>
          </Flex>
        </Flex>
        <Timer />
      </Flex>
      <Flex vertical gap={8}>
        {processes.map((p) => (
          <ProcessItem key={p.text} {...p} />
        ))}
      </Flex>
      <Alert
        filled
        showIcon
        icon={<LoaderWarningIcon width={18} height={18} className="anticon-spin" />}
        message={message}
        description={description}
      />
    </Flex>
  );
};
