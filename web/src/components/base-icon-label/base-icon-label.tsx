import { ReactNode } from "react";

interface Props {
    className?: string;
    icon: ReactNode;
    text: string;
}

export default function BaseIconLabel(props: Props) {
    return (
        <span
            className={`
            ${props.className}
            flex items-center`}
        >
            <span className="me-1">
                {props.icon}
            </span>
            <span>
                {props.text}
            </span>
        </span>
    );
}
