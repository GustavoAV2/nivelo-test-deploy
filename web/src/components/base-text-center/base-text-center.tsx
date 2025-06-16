import { ReactNode } from "react";

interface Props {
    text: string;
    icon?: ReactNode;
}

export default function BaseTextCenter(props: Props) {
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
        <span className="flex flex-row gap-2 justify-center items-center text-center">
            {icon()}
            {text()}
        </span>
    );
}
