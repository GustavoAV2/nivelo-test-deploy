import { useContext } from "react";
import { BaseNotificationContext } from "../_contexts/base-notification-context";

export const useNotification = () => {
    const context = useContext(BaseNotificationContext);
    if (!context) { throw new Error("useNotification must be used within a NotificationProvider"); }

    return context;
};
