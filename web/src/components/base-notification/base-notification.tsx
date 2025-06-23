"use client";

import { AlertDiamondIcon, Cancel01Icon, CheckmarkCircle02Icon, InformationCircleIcon } from "hugeicons-react";
import { useEffect, useState } from "react";

interface Props {
    type: BaseNotificationType;
    message: string;
    isVisible: boolean;
    onClose: () => void;
}

export enum BaseNotificationType {
    Success,
    Error,
    Warning,
    Info
}

export default function BaseNotification(props: Props) {
    const [show, setShow] = useState(props.isVisible);

    useEffect(() => {
        if (props.isVisible) { setShow(true); return; }

        const timer = setTimeout(() => setShow(false), 1000);
        return () => clearTimeout(timer);
    }, [props.isVisible]);

    if (!show && !props.isVisible) { return null; }

    const notificationIcon = () => {
        switch (props.type) {
            case BaseNotificationType.Success:
                return <CheckmarkCircle02Icon size={24} />;
            case BaseNotificationType.Error:
                return <AlertDiamondIcon size={24} />;
            case BaseNotificationType.Warning:
                return <AlertDiamondIcon size={24} />;
            case BaseNotificationType.Info:
                return <InformationCircleIcon size={24} />;
            default:
                return <CheckmarkCircle02Icon size={24} />;
        }
    };

    const notificationColor = () => {
        switch (props.type) {
            case BaseNotificationType.Success:
                return "bg-green-500";
            case BaseNotificationType.Error:
                return "bg-red-500";
            case BaseNotificationType.Warning:
                return "bg-yellow-500";
            case BaseNotificationType.Info:
                return "bg-blue-500";
            default:
                return "bg-green-500";
        }
    };

    const notificationOpacity = () => {
        if (props.isVisible) { return "opacity-100"; }
        else { return "opacity-0"; }
    };

    return (
        <div
            className={`
                fixed bottom-5 right-5 p-4 rounded-lg shadow-lg text-white
                flex items-center space-x-3 z-50
                transition-opacity duration-1000 ease-in-out
                ${notificationColor()}
                ${notificationOpacity()}
            `}
            role="alert"
        >
            {notificationIcon()}
            <span>{props.message}</span>
            <button
                onClick={props.onClose}
                className={`
                    ml-auto -mr-1 -my-1 p-1
                    hover:bg-black/10
                    rounded-full
                `}
            >
                <Cancel01Icon size={18} />
            </button>
        </div>
    );
}
