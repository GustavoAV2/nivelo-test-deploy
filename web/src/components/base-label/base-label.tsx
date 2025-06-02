import { ReactNode } from "react";

interface Props {
    className?: string;
    children: ReactNode;
}

export default function BaseLabel(props: Props) {
    return (
        <span className={props.className}>
            {props.children}
        </span>
    );
}
