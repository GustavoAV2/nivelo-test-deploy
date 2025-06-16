import { ReactNode } from "react";

interface Props {
    children: ReactNode
}

export default function BasePadding(props: Props) {
    return (
        <div className="p-4">
            {props.children}
        </div>
    );
}
