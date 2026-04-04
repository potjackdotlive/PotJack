import React, { FC, useEffect, useMemo, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Flex, Typography } from "antd";
import { useMutation } from "@apollo/client";
import { css } from "@emotion/react";
import { fromUnixTime } from "date-fns";
import Crown from "icons/li_crown.svg?react";
import Coins from "icons/RaffleCoins.svg?react";
import { Address } from "viem";
import { NotificationItemProps } from "components/NotificationList/NotificationListContent";
import { EventItemStatus, IconProps, IconTypes } from "components/NotificationList/types";
import { UnreadPin } from "components/NotificationList/UnreadPin";
import { getTokenNameByContractAndTokenAddresses } from "components/NotificationList/utils";
import { MARK_NOTIFICATION_AS_READ } from "graphql/queries";
import { useWalletConnection } from "hooks/useWalletConnection";
import { commonStyles } from "styles/commonStyles";
import { typographyStyles } from "styles/typography";
import {
  TXT_ENDED,
  TXT_ROUND_HAS_ENDED,
  TXT_ROUND_WON,
  TXT_WON,
  TXT_WON_ACTION_NEEDED,
  TXT_YOU_WON_BUT,
} from "translations";
import { SolanaAddressToToken } from "utils/enums/addresses/solanaTokenAddresses";

const styles = {
  root: css`
    padding: 12px;
  `,
  iconContainer: css`
    width: 48px;
    height: 48px;
    padding: 14px;
    border-radius: 120px;
    color: var(--color-primary-text-primary-foreground, #fafafa);
    background: var(--scale-white-white-alpha-five, rgba(255, 255, 255, 0.05));
  `,
  date: css`
    opacity: 0.4;
    padding-top: 6px;
  `,
};

const Icon: FC<IconProps> = ({ type }) => (
  <Flex css={styles.iconContainer} justify="center" align="center">
    {type === IconTypes.Coins ? <Coins /> : <Crown />}
  </Flex>
);

const StatusToTextMapSol = {
  [EventItemStatus.Won]: TXT_WON_ACTION_NEEDED,
  [EventItemStatus.Ended]: TXT_ENDED,
};

const StatusToDescriptionTextMapSol = {
  [EventItemStatus.Won]: TXT_YOU_WON_BUT,
  [EventItemStatus.Ended]: TXT_ROUND_HAS_ENDED,
};

const StatusToTextMap = {
  [EventItemStatus.Won]: TXT_WON,
  [EventItemStatus.Ended]: TXT_ENDED,
};

const StatusToDescriptionTextMap = {
  [EventItemStatus.Won]: TXT_ROUND_WON,
  [EventItemStatus.Ended]: TXT_ROUND_HAS_ENDED,
};

const getStatusTexts = ({ winEvent }: Pick<NotificationItemProps, "winEvent">) => {
  if (winEvent.token === "11111111111111111111111111111111") {
    return {
      textMap: StatusToTextMapSol,
      descriptionMap: StatusToDescriptionTextMapSol,
    };
  }

  return {
    textMap: StatusToTextMap,
    descriptionMap: StatusToDescriptionTextMap,
  };
};

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const NotificationItem: FC<NotificationItemProps> = ({ isRead, winEvent, id }) => {
  const { t } = useTranslation();
  const eventItem = useRef(null);
  const { address } = useWalletConnection();
  const roundIdView = (winEvent.roundId || 0) + 1;
  const status = winEvent?.winner.address === address ? EventItemStatus.Won : EventItemStatus.Ended;

  const { textMap, descriptionMap } = getStatusTexts({ winEvent });

  const statusText = t(textMap[status]);
  const description = t(descriptionMap[status], { roundId: roundIdView });

  const [markAsRead, { data: isMarkedAsRead }] = useMutation(MARK_NOTIFICATION_AS_READ);

  const formattedDateTime = useMemo(() => {
    const date = fromUnixTime(Number(winEvent.blockTimestamp.slice(0, -3)));

    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // 0 should be 12

    return `${day} ${month}, ${year} • ${hours}:${minutes} ${ampm}`;
  }, [winEvent.blockTimestamp]);

  useEffect(() => {
    if (isRead) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isMarkedAsRead) {
          setTimeout(
            () =>
              markAsRead({
                variables: {
                  notificationId: id,
                  userAddress: address,
                },
              }),
            0,
          );
        }
      },
      { threshold: 0.1 },
    );

    if (eventItem?.current) {
      observer.observe(eventItem.current as HTMLDivElement);
    }

    return () => observer.disconnect();
  }, [isRead, isMarkedAsRead]);

  const tokenName =
    SolanaAddressToToken[winEvent?.token] ||
    getTokenNameByContractAndTokenAddresses({
      contractAddress: winEvent?.contractAddress as Address,
      tokenAddress: winEvent?.token as Address,
    });

  console.log({ winEvent });

  return (
    <Flex css={styles.root} gap={12} ref={eventItem}>
      <Icon type={status === EventItemStatus.Ended ? IconTypes.Coins : IconTypes.Crown} />
      <Flex vertical gap={8}>
        <Flex gap={6} align="center">
          {!isRead && !isMarkedAsRead && <UnreadPin />}

          <Typography css={[typographyStyles.bodyDefaultMd, commonStyles.textNeutral]}>
            {`${tokenName} #${winEvent.roundId + 1} ${statusText}`}
          </Typography>
        </Flex>

        <Typography css={[typographyStyles.bodyDefaultRg, commonStyles.textMuted]}>{description}</Typography>
        <Typography css={[typographyStyles.bodySmallMd, commonStyles.textMuted, styles.date]}>
          {formattedDateTime}
        </Typography>
      </Flex>
    </Flex>
  );
};
