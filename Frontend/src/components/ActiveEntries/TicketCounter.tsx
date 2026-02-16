import React, { FC, ReactNode } from "react";
import { Typography } from "antd";
import { css } from "@emotion/react";
import TicketIcon from "icons/li_ticket.svg?react";
import { commonStyles } from "styles/commonStyles";
import { typographyStyles } from "styles/typography";

const styles = {
  root: css`
    display: flex;
    align-items: center;
    gap: 6px;
    color: var(--color-muted-text-muted-foreground, #a1a1aa);
  `,
  ticketWrapper: css`
    display: contents;
  `,
  highRisk: css`
    color: var(--red-300, #fca5a5);
  `,
  mediumRisk: css`
    color: var(--yellow-300, #fde047);
  `,
  lowRisk: css`
    color: var(--green-300, #86efac);
  `,
};

type Props = {
  totalTickets: number;
  userTickets: number;
};

const getRiskColor = ({ totalTickets, userTickets }: Props): "highRisk" | "mediumRisk" | "lowRisk" => {
  const chance = (userTickets / totalTickets) * 100;

  switch (true) {
    case chance >= 45:
      return "lowRisk";
    case chance >= 30:
      return "mediumRisk";
    default:
      return "highRisk";
  }
};

export const TicketCounter: FC<Props> = ({ userTickets, totalTickets }): ReactNode => {
  const riskColor = getRiskColor({ userTickets, totalTickets });

  return (
    <div css={styles.root}>
      <TicketIcon />
      <span css={styles.ticketWrapper}>
        <Typography css={[typographyStyles.bodyDefaultMd, styles[riskColor]]}>{userTickets}</Typography>{" "}
        <Typography css={[typographyStyles.bodyDefaultMd, commonStyles.textMuted]}>/</Typography>{" "}
        <Typography css={[typographyStyles.bodyDefaultMd, commonStyles.textNeutral]}>{totalTickets}</Typography>
      </span>
    </div>
  );
};
