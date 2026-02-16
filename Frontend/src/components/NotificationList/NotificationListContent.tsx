import React, { FC, Fragment, useEffect, useMemo, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Divider, Flex, Spin, Typography } from "antd";
import { fromUnixTime } from "date-fns";
import CrossIcon from "icons/li_x.svg?react";
import { IconButton } from "components/IconButton/IconButton";
import { NotificationItem } from "components/NotificationList/NotificationItem";
import { notificationListStyles as styles } from "components/NotificationList/notificationListStyles";
import { getDateGroupLabel } from "components/NotificationList/utils";
import { commonStyles } from "styles/commonStyles";
import { typographyStyles } from "styles/typography";
import { TXT_NOTIFICATIONS } from "translations";

export type NotificationItemProps = {
  __typename?: "Notification";
  id: string;
  createdAt: string;
  updatedAt: string;
  isRead: boolean;
  isWinner: boolean;
  winEvent: {
    __typename?: "WinEvent";
    id: string;
    token: string;
    roundId: number;
    chainId: number;
    contractAddress: string;
    amount: string;
    blockTimestamp: string;
    transactionHash: string;
    logIndex: number;
    createdAt: string;
    updatedAt: string;
    winner: {
      __typename?: "User";
      id: string;
      address: string;
      totalWins: number;
      createdAt: string;
      updatedAt: string;
    };
    players: Array<{
      __typename?: "User";
      id: string;
      address: string;
      totalWins: number;
      createdAt: string;
      updatedAt: string;
    }>;
  };
};

type GroupSet = Record<
  string,
  {
    label: string;
    date: Date;
    events: NotificationItemProps[];
  }
>;

type Props = {
  notifications: NotificationItemProps[];
  loading: boolean;
  handleClose: () => void;
  fetchNextPage: () => void;
};

export const NotificationListContent: FC<Props> = ({ notifications, loading, handleClose, fetchNextPage }) => {
  const { t } = useTranslation();
  const endOfListRef = useRef(null);

  const getDateKey = (date: Date) => `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;

  // Group events by date
  const groupedEvents = useMemo(
    () =>
      notifications.reduce((groups: GroupSet, event) => {
        const eventDate = fromUnixTime(Number(event.winEvent.blockTimestamp.slice(0, -3)));
        const dateKey = getDateKey(eventDate);
        const label = getDateGroupLabel(eventDate);

        if (!groups[dateKey]) {
          groups[dateKey] = {
            label,
            date: new Date(eventDate.getFullYear(), eventDate.getMonth(), eventDate.getDate()),
            events: [],
          };
        }

        groups[dateKey].events.push(event);
        return groups;
      }, {}),
    [notifications],
  );

  // Sort groups by date (newest first)
  const sortedGroups = Object.values(groupedEvents).sort((a, b) => b.date.getTime() - a.date.getTime());

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(fetchNextPage, 0);
        }
      },
      { threshold: 0.1 },
    );

    if (endOfListRef?.current) {
      observer.observe(endOfListRef.current as HTMLHeadingElement);
    }

    return () => observer.disconnect();
  }, [notifications]);

  return (
    <Flex css={styles.contentRoot}>
      <Flex css={styles.title} justify="space-between" gap={4} align="center">
        <Flex vertical gap={4}>
          <Typography css={[typographyStyles.bodyLargeMd, commonStyles.textNeutral]}>{t(TXT_NOTIFICATIONS)}</Typography>
        </Flex>
        <IconButton size="sm" ghost onClick={handleClose}>
          <CrossIcon />
        </IconButton>
      </Flex>
      <Divider />
      {sortedGroups.map((group) => (
        <Fragment key={group.label}>
          <Typography css={[typographyStyles.bodyLargeMd, commonStyles.textNeutral, styles.groupTitle]}>
            {group.label}
          </Typography>
          {group.events.map((event) => (
            <NotificationItem key={`${event.winEvent.transactionHash}`} {...event} />
          ))}
        </Fragment>
      ))}
      {loading && (
        <Flex css={styles.spinContainer}>
          <Spin size="large" />
        </Flex>
      )}
      <div ref={endOfListRef} />
    </Flex>
  );
};
