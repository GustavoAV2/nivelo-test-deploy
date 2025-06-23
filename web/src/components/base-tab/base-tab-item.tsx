import { ReactNode } from "react";

interface Props {
    children: ReactNode;
    onClick?: () => void;
}

export default function BaseTabItem(props: Props) {
    return (
        <button
            className="
                px-4 py-2
                rounded-lg
                cursor-pointer
                text-slate-50
                bg-slate-600 hover:bg-slate-700 active:bg-slate-800
                dark:bg-slate-700 dark:hover:bg-slate-600 dark:active:bg-slate-500
            "
            onClick={props.onClick}
        >
            {props.children}
        </button>
    );
}
