import { ReactNode } from "react";

interface Props {
    className?: string;
    children: ReactNode;
}

export default function BaseTabItem(props: Props) {
    return (
        <button className={`
            ${props.className}
            px-4 py-2
            rounded-lg
            text-white
            bg-slate-700
            hover:bg-slate-800`}
        >
            {props.children}
        </button>
    );
}
