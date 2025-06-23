import { ReactNode } from "react";

interface Props {
    children: ReactNode;
}

export default function BaseCard(props: Props) {
    return (
        <div
            className="
                px-4 py-3
                rounded-lg
                shadow
                bg-slate-50
                dark:bg-slate-800
            "
        >
            {props.children}
        </div>
    );
}
