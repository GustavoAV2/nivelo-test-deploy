import { ReactNode, MouseEventHandler } from "react";

interface Props {
    className?: string;
    icon: ReactNode;
    text: string;
    onClick?: MouseEventHandler<HTMLButtonElement>;
}

export default function BaseFooterItem(props: Props) {
    return (
        <button className={`
            ${props.className}
            flex flex-col items-center`}
        onClick={props.onClick}
        >
            <span>
                {props.icon}
            </span>
            <span>
                {props.text}
            </span>
        </button>
    );
}
