import BaseHeader from "@/components/base-header/base-header";
import BaseRoot from "@/layout/base-root/base-root";
import { ReactNode } from "react";

interface Props {
    children: ReactNode;
};

export default function AppLayout(props: Readonly<Props>) {
    return (
        <BaseRoot>
            <BaseHeader />
            {props.children}
        </BaseRoot>
    );
}
