import { ReactNode } from "react";

interface Props {
    text: string;
    icon?: ReactNode;
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

    return (
        <span className="flex flex-row gap-2">
            {icon()}
            {text()}
        </span>
    );
}
