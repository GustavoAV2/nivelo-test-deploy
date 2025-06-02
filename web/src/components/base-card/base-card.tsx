import { ReactNode } from "react";

interface Props {
    className?: string;
    children: ReactNode;
}

export default function BaseCard(props: Props) {
    return (
        <div className={`
            ${props.className}
            px-4 py-3
            border rounded-lg
            bg-blue-50 border-slate-400  dark:bg-gray-800`}
        >
            {props.children}
        </div>
    );
}
