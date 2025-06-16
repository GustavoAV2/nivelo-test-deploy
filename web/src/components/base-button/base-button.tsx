import { MouseEventHandler, ReactNode } from "react";

interface Props {
    children: ReactNode;
    color: "primary" | "secondary" | "tertiary" | "danger";
    type?: "button" | "submit";
    onClick?: MouseEventHandler<HTMLButtonElement>;
}

export default function BaseButton(props: Props) {
    const buttonColor = () => {
        switch (props.color) {
            case "primary":
                return "text-slate-50 " +
                    "bg-blue-600 hover:bg-blue-700 active:bg-blue-800 " +
                    "dark:bg-blue-800 dark:hover:bg-blue-600 dark:active:bg-blue-500";
            case "secondary":
                return "text-slate-50 " +
                    "bg-slate-600 hover:bg-slate-700 active:bg-slate-800 " +
                    "dark:bg-slate-700 dark:hover:bg-slate-600 dark:active:bg-slate-500 ";
            case "tertiary":
                return "text-slate-900 dark:text-slate-50 " +
                    "bg-slate-50 hover:bg-slate-100 active:bg-slate-200 " +
                    "dark:bg-slate-800 dark:hover:bg-slate-700 dark:active:bg-slate-600 ";
            case "danger":
                return "text-slate-50 " +
                    "bg-red-500 hover:bg-red-600 active:bg-red-700 " +
                    "dark:bg-red-600 dark:hover:bg-red-500 dark:active:bg-red-400";
            default:
                throw new Error("No color prop was specified for this BaseButton component");
        }
    };

    return (
        <button
            className={`
                ${buttonColor()}
                min-h-12 px-4 py-2 w-full rounded-lg
                cursor-pointer
            `}
            onClick={props.onClick}
            type={props.type}
        >
            {props.children}
        </button>
    );
}
