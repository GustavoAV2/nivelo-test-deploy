import { ReactNode } from "react";

interface Props {
    children: ReactNode;
}

export default function BaseFlexRow(props: Props) {
    return (
        <div className="flex flex-row">
            {props.children}
        </div>
    );
}
