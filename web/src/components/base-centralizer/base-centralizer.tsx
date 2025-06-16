import { ReactNode } from "react";

interface Props {
    className?: string;
    children: ReactNode;
}

export default function BaseCentralizer(props: Props) {
    return (
        <div
            className={`
            ${props.className}
            flex flex-col flex-grow justify-center
            min-h-full`}
        >
            {props.children}
        </div>
    );
}
