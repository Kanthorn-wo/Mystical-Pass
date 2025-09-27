import { notification } from "antd";

type NotificationType = "success" | "info" | "warning" | "error";

export function useNotificationMessage() {
  const [api, contextHolder] = notification.useNotification();

  const showNotification = (
    type: NotificationType,
    message: string,
    description: string
  ) => {
    api[type]({
      message,
      description,
    });
  };

  return { showNotification, contextHolder };
}
