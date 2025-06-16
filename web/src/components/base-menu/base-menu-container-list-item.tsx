import { ReactNode } from "react";

interface Props {
    children: ReactNode;
    onClick?: () => void;
}

export default function BaseMenuContainerListItem(props: Props) {
    return (
        <div>
            <button
                className="
                    px-4 py-3 w-full
                    text-start
                    bg-slate-200 hover:bg-slate-300 active:bg-slate-400
                    dark:bg-slate-700 dark:hover:bg-slate-600 dark:active:bg-slate-500
                    cursor-pointer
                "
                onClick={props.onClick}
            >
                {props.children}
            </button>
        </div>
    );
}
