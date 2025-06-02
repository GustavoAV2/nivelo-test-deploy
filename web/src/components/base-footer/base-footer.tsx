import { ReactNode } from "react";

interface Props {
    className?: string;
    children?: ReactNode;
}

export default function BaseFooter(props: Props) {
    return (
        <div
            className={`
                ${props.className}
                p-3 z-10
                sticky bottom-0 min-h-12
                flex justify-around shrink-0
                bg-blue-300 dark:bg-gray-800
            `}
        >
            {props.children}
        </div>
    );
}
