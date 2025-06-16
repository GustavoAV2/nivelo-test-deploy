import { MouseEventHandler, ReactNode } from "react";

interface Props {
    icon: ReactNode;
    text: string;
    color?: string;
    onClick?: MouseEventHandler<HTMLButtonElement>;
}

export default function BaseFooterItem(props: Props) {
    return (
        <button
            className={`
                ${props.color}
                flex flex-col flex-grow items-center p-3 cursor-pointer
                hover:bg-slate-200 active:bg-slate-300
                dark:hover:bg-slate-600 dark:active:bg-slate-500
            `}
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
