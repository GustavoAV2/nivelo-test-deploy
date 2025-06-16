import { ReactNode } from "react";

interface Props {
    children: ReactNode;
    active?: boolean;
    onClick?: () => void;
}

export default function BaseMultiSelectItem({ children, active = false, onClick }: Props) {
    const color = () => {
        if (active) {
            return "text-slate-50 " +
                "bg-blue-600 hover:bg-blue-700 active:bg-blue-800 " +
                "dark:bg-blue-800 dark:hover:bg-blue-600 dark:active:bg-blue-500";
        } else {
            return "text-slate-50 " +
                "bg-slate-600 hover:bg-slate-700 active:bg-slate-800 " +
                "dark:bg-slate-700 dark:hover:bg-slate-600 dark:active:bg-slate-500";
        }
    };

    return (
        <button
            className={`
                ${color()}
                cursor-pointer
                px-4 py-2
                rounded-lg
                transition
            `}
            onClick={onClick}
            type="button"
        >
            {children}
        </button>
    );
}
