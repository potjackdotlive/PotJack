/* eslint-disable react-refresh/only-export-components */
import { FC } from "react";
import { App } from "antd";
import { MessageInstance } from "antd/es/message/interface";
import { ModalStaticFunctions } from "antd/es/modal/confirm";
import { ArgsProps, NotificationInstance } from "antd/es/notification/interface";
import { NotificationIcon } from "components/Notification/NotificationIcon";

export let message: MessageInstance;
export let normalNotification: NotificationInstance["open"];
export let systemNotification: NotificationInstance["info"];
export let successNotification: NotificationInstance["success"];
export let warningNotification: NotificationInstance["warning"];
export let errorNotification: NotificationInstance["error"];
export let modal: Omit<ModalStaticFunctions, "warn">;

export const Notification: FC = () => {
  const staticFunction = App.useApp();
  message = staticFunction.message;
  modal = staticFunction.modal;

  const notificationConfig: Partial<ArgsProps> = {
    placement: "topRight",
    duration: 3000,
    icon: <NotificationIcon />,
  };

  const notificationWrapperFn = (callback: () => void) => {
    staticFunction.notification.destroy();
    setTimeout(callback, 0);
  };

  normalNotification = (params) => {
    notificationWrapperFn(() =>
      staticFunction.notification.info({
        ...notificationConfig,
        ...params,
      }),
    );
  };

  successNotification = (params) => {
    notificationWrapperFn(() =>
      staticFunction.notification.success({
        className: "notification-success",
        ...notificationConfig,
        ...params,
      }),
    );
  };

  errorNotification = (params) => {
    notificationWrapperFn(() =>
      staticFunction.notification.error({
        className: "notification-error",
        ...notificationConfig,
        ...params,
      }),
    );
  };

  warningNotification = (params) => {
    notificationWrapperFn(() =>
      staticFunction.notification.warning({
        className: "notification-warning",
        ...notificationConfig,
        ...params,
      }),
    );
  };

  systemNotification = (params) => {
    notificationWrapperFn(() =>
      staticFunction.notification.open({
        className: "notification-system",
        ...notificationConfig,
        ...params,
      }),
    );
  };

  return null;
};
