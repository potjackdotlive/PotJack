import { FC, PropsWithChildren } from "react";
import { useTranslation } from "react-i18next";
import { Flex, Tooltip } from "antd";
import { TooltipPlacement } from "antd/es/tooltip";
import { TooltipLine } from "components/TooltipWrapper/TooltipLine";
import { TooltipWrapper } from "components/TooltipWrapper/TooltipWrapper";
import { UserStats } from "graphql/gen/types";
import { TXT_BLOCKCHAIN, TXT_TICKETS, TXT_TOTAL_WINS, TXT_WALLET } from "translations";
import { amountFormatter } from "utils/formatters/amountFormatter";
import { getExtraStatusesByBadges } from "utils/getExtraStatusesByBadges";
import { getNetworkNameByContractAddress } from "utils/getNetworkNameByContractAddress";
import { ExtraStatusText } from "./ExtraStatusText";

type Props = Partial<
  Pick<UserStats, "userAddress" | "contractAddress" | "tickets" | "totalWins" | "badges" | "rank">
> & { copyable?: boolean };

const ParticipantTooltipContent: FC<Props> = ({
  userAddress = "",
  contractAddress,
  tickets = 0,
  totalWins = 0,
  rank = 0,
  badges,
  copyable = true,
}) => {
  const { t } = useTranslation();
  const extraStatuses = getExtraStatusesByBadges({ badges, rank });

  return (
    <TooltipWrapper>
      <Flex gap={12} vertical>
        {!!extraStatuses.length && (
          <>
            {extraStatuses.map((status) => (
              <ExtraStatusText key={status} status={status} />
            ))}
          </>
        )}

        <Flex gap={8} vertical>
          <TooltipLine prefix={t(TXT_WALLET)} value={userAddress} copyable={copyable} />
          {contractAddress && (
            <TooltipLine prefix={t(TXT_BLOCKCHAIN)} value={getNetworkNameByContractAddress(contractAddress)} />
          )}
          <TooltipLine prefix={t(TXT_TICKETS)} value={amountFormatter(tickets)} />
          <TooltipLine prefix={t(TXT_TOTAL_WINS)} value={amountFormatter(totalWins)} />
        </Flex>
      </Flex>
    </TooltipWrapper>
  );
};
type ParticipantTooltipProps = {
  placement?: TooltipPlacement;
} & Partial<Omit<Props, "__typename">>;

export const ParticipantTooltip: FC<PropsWithChildren<ParticipantTooltipProps>> = ({
  children,
  placement = "bottom",
  ...userStats
}) => (
  <Tooltip title={<ParticipantTooltipContent {...userStats} />} destroyOnHidden placement={placement} arrow={false}>
    {children}
  </Tooltip>
);
