import { ReactNode } from "react";

interface Props {
    children: ReactNode;
}

export default function BaseSubtitle(props: Props) {
    return (
        <div className="text-lg text-slate-600 dark:text-slate-400">
            {props.children}
        </div>
    );
}
