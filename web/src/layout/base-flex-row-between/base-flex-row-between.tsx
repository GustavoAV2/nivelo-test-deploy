import { ReactNode } from "react";

interface Props {
    children: ReactNode;
}

export default function BaseFlexRowBetween(props: Props) {
    return (
        <div className="flex flex-row justify-between">
            {props.children}
        </div>
    );
}
