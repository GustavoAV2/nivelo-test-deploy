import { MouseEventHandler, ReactNode } from "react";

interface Props {
    className?: string;
    children: ReactNode;
    color: "primary" | "secondary" | "danger";
    type?: "button" | "submit";
    onClick?: MouseEventHandler<HTMLButtonElement>;
}

export default function BaseButton(props: Props) {
    const buttonColor = () => {
        if (props.color === "primary")
            return "bg-blue-500 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-800";
        else if (props.color == "secondary")
            return "bg-slate-700 hover:bg-slate-900 dark:bg-slate-800 dark:hover:bg-slate-900";
        else if (props.color == "danger")
            return "bg-red-500 hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-800";
        else
            return "";
    };

    return (
        <button className={`
            ${props.className}
            ${buttonColor()}
            px-4 py-2
            rounded-lg
            text-white
            `}
        onClick={props.onClick}
        type={props.type}
        >
            {props.children}
        </button>
    );
}
