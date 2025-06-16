import { ReactNode } from "react";

interface Props {
    children: ReactNode;
}

export default function BaseTab(props: Props) {
    return (
        <div className="flex flex-row gap-4">
            {props.children}
        </div>
    );
}
