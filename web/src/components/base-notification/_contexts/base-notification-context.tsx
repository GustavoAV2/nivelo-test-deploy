"use client";

import { createContext, ReactNode, useCallback, useState } from "react";
import BaseNotification, { BaseNotificationType } from "../base-notification";

interface NotificationState {
    message: string;
    isVisible: boolean;
    type: BaseNotificationType;
}

interface NotificationContextProps {
    showNotification: (message: string, type?: BaseNotificationType, duration?: number) => void;
}

interface NotificationProviderProps {
    children: ReactNode;
}

export const BaseNotificationContext = createContext<NotificationContextProps | null>(null);

export const BaseNotificationProvider = (props: NotificationProviderProps) => {
    const [notification, setNotification] = useState<NotificationState | null>(null);

    const showNotification = useCallback((message: string, type: BaseNotificationType = BaseNotificationType.Success, duration: number = 4000) => {
        setNotification({ message, type, isVisible: true });
        setTimeout(() => {
            setNotification(prev => prev ? { ...prev, isVisible: false } : null);
            setTimeout(() => setNotification(null), 1000);
        }, duration);
    }, []);

    return (
        <BaseNotificationContext.Provider value={{ showNotification }}>
            {props.children}
            {notification && notification.isVisible && (
                <BaseNotification
                    message={notification.message}
                    type={notification.type}
                    isVisible={notification.isVisible}
                    onClose={() => setNotification(prev => prev ? { ...prev, isVisible: false } : null)}
                />
            )}
        </BaseNotificationContext.Provider>
    );
};
