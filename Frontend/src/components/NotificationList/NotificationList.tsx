import React, { useEffect, useMemo, useState } from "react";
import { Popover } from "antd";
import { ApolloQueryResult } from "@apollo/client";
import { css } from "@emotion/react";
import BellIcon from "icons/li_bell.svg?react";
import { IconButton } from "components/IconButton/IconButton";
import { NotificationItemProps, NotificationListContent } from "components/NotificationList/NotificationListContent";
import { useGetUserNotificationsQuery } from "graphql/gen/hooks";
import { GetUserNotificationsQuery } from "graphql/gen/types";
import { useApolloErrorHandler } from "hooks/useApolloErrorHandler";
import { useWalletConnection } from "hooks/useWalletConnection";

const NOTIFICATIONS_PER_PAGE = 10;
const POLL_INTERVAL = 10_000;

export const NotificationList = () => {
  const { address } = useWalletConnection();
  const [page, setPage] = useState(1);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [notificationsData, setNotificationsData] = useState<GetUserNotificationsQuery | null>(null);

  const onOpenChange = () => {
    setPopoverOpen((prev) => !prev);
  };

  const {
    data: initialData,
    loading,
    error,
    fetchMore,
  } = useGetUserNotificationsQuery({
    variables: {
      userAddress: (address as string) || "",
      limit: NOTIFICATIONS_PER_PAGE * page,
      offset: 0,
      unreadOnly: false,
    },
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-first",
    pollInterval: POLL_INTERVAL,
    skipPollAttempt: () => !popoverOpen,
    skip: !address,
  });

  const totalCount = notificationsData?.notifications?.totalCount;
  const notifications = notificationsData?.notifications?.notifications || [];

  useEffect(() => {
    if (initialData) {
      setNotificationsData(initialData);
    }
  }, [initialData]);

  useApolloErrorHandler(error);

  const hasUnreadNotifications = useMemo(() => notifications.some((n) => !n.isRead), [notifications]);

  return (
    <Popover
      content={
        <NotificationListContent
          notifications={notifications as NotificationItemProps[]}
          loading={loading}
          handleClose={onOpenChange}
          fetchNextPage={() => {
            if (!totalCount) {
              return;
            }

            if (totalCount > NOTIFICATIONS_PER_PAGE * page) {
              setPage((prev) => prev + 1);
              fetchMore({
                variables: {
                  userAddress: address as string,
                  limit: NOTIFICATIONS_PER_PAGE * (page + 1),
                  offset: 0,
                  unreadOnly: false,
                },
              }).then(({ data }: ApolloQueryResult<GetUserNotificationsQuery>) => {
                if (data) {
                  setNotificationsData(data);
                }
              });
            }
          }}
        />
      }
      trigger="click"
      arrow={false}
      placement="bottom"
      open={popoverOpen}
      onOpenChange={onOpenChange}
      styles={{
        body: {
          padding: 0,
          borderRadius: 12,
          background: "#131313",
          boxShadow: "0px 2px 20px 0px rgba(0, 0, 0, 0.45)",
        },
      }}
    >
      <IconButton
        ghost
        style={{ width: 36, height: 36 }}
        css={css`
          position: relative;
        `}
      >
        <BellIcon width={20} height={20} />
        {hasUnreadNotifications && (
          <span
            css={css`
              width: 6px;
              height: 6px;
              top: 4px;
              right: 4px;
              position: absolute;
              border-radius: 50%;
              background: var(--color-destructive-icon-destructive-foreground, #dc2626);
              filter: drop-shadow(0 0 4px #dc2626);
            `}
          />
        )}
      </IconButton>
    </Popover>
  );
};
