import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Flex, Tag, Typography } from "antd";
import { entryConfirmStyles } from "pages/Play/components/BuyTicketEth/components/EntryConfirm/entryConfirmStyles";
import Timer from "pages/Play/components/Timer/Timer";
import { commonStyles } from "styles/commonStyles";
import { typographyStyles } from "styles/typography";
import { TXT_ROUND_NUMBER } from "translations";
import { CoinType } from "utils/types";

type Props = {
  coin: CoinType | null;
  roundId: number | null;
  showTimer: boolean;
  title?: string;
};

export const PersonalHubTitle: FC<Props> = ({ title, coin, roundId, showTimer }) => {
  const { t } = useTranslation();

  return (
    <Flex gap={8} justify="space-between" css={commonStyles.fullWidth}>
      <Flex gap={8} align="flex-start" css={commonStyles.fullWidth}>
        {title && <Typography css={typographyStyles.bodyLargeMd}>{title}</Typography>}

        {coin && (
          <Flex gap={4} align="center">
            <Tag css={entryConfirmStyles.tag}>{coin}</Tag>
            <Tag css={entryConfirmStyles.tag}>{t(TXT_ROUND_NUMBER, { number: (roundId || 0) + 1 })}</Tag>
          </Flex>
        )}
      </Flex>
      {showTimer && <Timer />}
    </Flex>
  );
};
