"use client";

import { createContext, ReactNode, useCallback, useEffect, useRef, useState } from "react";
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

const ANIMATION_DURATION = 1000;

export const BaseNotificationContext = createContext<NotificationContextProps | null>(null);

export const BaseNotificationProvider = (props: NotificationProviderProps) => {
    const [notification, setNotification] = useState<NotificationState | null>(null);
    const hideTimerRef = useRef<NodeJS.Timeout | null>(null);
    const removeTimerRef = useRef<NodeJS.Timeout | null>(null);

    const clearAllTimers = useCallback(() => {
        if (hideTimerRef.current) {
            clearTimeout(hideTimerRef.current);
            hideTimerRef.current = null;
        }
        if (removeTimerRef.current) {
            clearTimeout(removeTimerRef.current);
            removeTimerRef.current = null;
        }
    }, []);

    const showNotification = useCallback((message: string, type: BaseNotificationType = BaseNotificationType.Success, duration: number = 4000) => {
        clearAllTimers();

        setNotification({ message, type, isVisible: true });

        hideTimerRef.current = setTimeout(() => {
            setNotification(prev => prev ? { ...prev, isVisible: false } : null);
            removeTimerRef.current = setTimeout(() => {
                setNotification(null);
                removeTimerRef.current = null;
            }, ANIMATION_DURATION);
            hideTimerRef.current = null;
        }, duration);
    }, [clearAllTimers]);

    const handleClose = useCallback(() => {
        clearAllTimers();
        setNotification(prev => {
            if (prev && prev.isVisible) {
                removeTimerRef.current = setTimeout(() => {
                    setNotification(null);
                    removeTimerRef.current = null;
                }, ANIMATION_DURATION);
                return { ...prev, isVisible: false };
            }
            return prev;
        });
    }, [clearAllTimers]);

    useEffect(() => {
        return () => {
            clearAllTimers();
        };
    }, [clearAllTimers]);

    return (
        <BaseNotificationContext.Provider value={{ showNotification }}>
            {props.children}
            {notification && (
                <BaseNotification
                    message={notification.message}
                    type={notification.type}
                    isVisible={notification.isVisible}
                    onClose={handleClose}
                />
            )}
        </BaseNotificationContext.Provider>
    );
};
