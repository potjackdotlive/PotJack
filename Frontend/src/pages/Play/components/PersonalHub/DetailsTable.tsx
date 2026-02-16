import { FC, FunctionComponent, SVGProps } from "react";
import { useTranslation } from "react-i18next";
import { Divider, Flex, Typography } from "antd";
import MedalIcon from "icons/li_medal.svg?react";
import TicketIcon from "icons/li_ticket.svg?react";
import PeopleIcon from "icons/li_users.svg?react";
import { useMediaQueryMatches } from "hooks/useMediaQueryMatches";
import { hubDetailsStyles } from "pages/Play/components/PersonalHub/styles";
import { commonStyles } from "styles/commonStyles";
import { typographyStyles } from "styles/typography";
import {
  TXT_MY,
  TXT_MY_TICKETS,
  TXT_OF_POOL,
  TXT_PARTICIPANTS,
  TXT_PRIZE_POOL,
  TXT_TOTAL,
  TXT_TOTAL_TICKETS,
} from "translations";
import { amountFormatter } from "utils/formatters/amountFormatter";
import { getColorClassNameForRisk } from "utils/getColorClassNameForRisk";
import { getRiskByWinOdds } from "utils/getRiskByWinOdds";

type AmountProps = {
  amount: number | string;
};

type ShowTextProps = {
  showText: boolean;
};

const IconText = ({ icon, text }: { icon: FunctionComponent<SVGProps<SVGSVGElement>>; text: string }) => {
  const Icon = icon;

  return (
    <Flex gap={8} css={hubDetailsStyles.iconText} align="center">
      <Icon width={20} height={20} />
      <Typography css={typographyStyles.bodyDefaultMd} style={{ wordBreak: "normal" }}>
        {text}
      </Typography>
    </Flex>
  );
};

const PrizePool = ({ amount, showText }: AmountProps & ShowTextProps) => {
  const { t } = useTranslation();

  return (
    <Flex gap={12} css={[commonStyles.fullHeight, commonStyles.fullWidth]} align="center">
      <IconText text={showText ? t(TXT_PRIZE_POOL) : ""} icon={MedalIcon} />
      <Typography css={typographyStyles.h4}>{amount}</Typography>
    </Flex>
  );
};

const Players = ({ amount, showText }: AmountProps & ShowTextProps) => {
  const { t } = useTranslation();

  return (
    <Flex gap={12} css={[commonStyles.fullHeight, commonStyles.fullWidth]} align="center">
      <IconText text={showText ? t(TXT_PARTICIPANTS) : ""} icon={PeopleIcon} />
      <Typography css={typographyStyles.h4}>{amount}</Typography>
    </Flex>
  );
};

const TotalTickets = ({ amount, showText }: AmountProps & ShowTextProps) => {
  const { t } = useTranslation();

  return (
    <Flex gap={12} css={[commonStyles.fullHeight, commonStyles.fullWidth]} align="center">
      <IconText text={showText ? t(TXT_TOTAL_TICKETS) : t(TXT_TOTAL)} icon={TicketIcon} />
      <Typography css={typographyStyles.h4}>{amount}</Typography>
    </Flex>
  );
};

const YourTickets = ({ amount, odds, showText }: AmountProps & { odds: number } & ShowTextProps) => {
  const { t } = useTranslation();

  return (
    <Flex gap={12} css={[commonStyles.fullHeight, commonStyles.fullWidth]} align="center">
      <IconText text={showText ? t(TXT_MY_TICKETS) : t(TXT_MY)} icon={TicketIcon} />
      <Typography css={typographyStyles.h4} style={{ wordBreak: "normal" }}>
        {amount}
      </Typography>
      {amount !== 0 && (
        <Typography css={hubDetailsStyles.odds} className={getColorClassNameForRisk(getRiskByWinOdds(odds))}>
          {t(TXT_OF_POOL, { percentage: amountFormatter(odds) })}
        </Typography>
      )}
    </Flex>
  );
};

type DetailsTableProps = {
  playerTicketCount: number;
  poolBalance: string;
  ticketsCount: number;
  playersCount: number;
  vertical?: boolean;
};

export const DetailsTable: FC<DetailsTableProps> = ({
  playerTicketCount,
  poolBalance,
  ticketsCount,
  playersCount,
  vertical,
}) => {
  const { sm: showText } = useMediaQueryMatches();

  return (
    <Flex vertical css={commonStyles.fullWidth} gap={8}>
      <Flex gap={8} style={{ height: vertical ? "auto" : 40 }} vertical={vertical}>
        <PrizePool amount={poolBalance} showText={vertical || showText} />
        {!vertical && <Divider type="vertical" css={[hubDetailsStyles.divider, commonStyles.fullHeight]} />}
        <Players amount={playersCount} showText={vertical || showText} />
      </Flex>
      <Divider css={hubDetailsStyles.divider} />
      <Flex gap={8} style={{ height: vertical ? "auto" : 40 }} vertical={vertical}>
        <TotalTickets amount={ticketsCount} showText={vertical || showText} />
        {!vertical && <Divider type="vertical" css={[hubDetailsStyles.divider, commonStyles.fullHeight]} />}
        <YourTickets
          amount={playerTicketCount}
          odds={(playerTicketCount / ticketsCount) * 100}
          showText={vertical || showText}
        />
      </Flex>
    </Flex>
  );
};
