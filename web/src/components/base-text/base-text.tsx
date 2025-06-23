import { ReactNode } from "react";

interface Props {
    text: string;
    icon?: ReactNode;
    bold?: boolean;
}

export default function BaseText(props: Props) {
    const icon = () => {
        if (props.icon) {
            return <span>{props.icon}</span>;
        }
    };

    const text = () => {
        if (props.text) {
            return <span>{props.text}</span>;
        }
    };

    const className = () => {
        return `flex flex-row gap-2 ${props.bold ? "font-bold" : ""}`;
    };

    return (
        <span className={className()}>
            {icon()}
            {text()}
        </span>
    );
}
