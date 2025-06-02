import BaseFrame from "@/components/base-frame/base-frame";
import BaseHeader from "@/components/base-header/base-header";
import { BaseNotificationProvider } from "@/components/base-notification/_contexts/base-notification-context";
import { ReactNode } from "react";

interface Props {
    children: ReactNode;
};

export default function AppLayout(props: Readonly<Props>) {
    return (
        <BaseNotificationProvider>
            <BaseFrame>
                <BaseHeader />
                {props.children}
            </BaseFrame>
        </BaseNotificationProvider>
    );
}
