import { ReactNode } from "react";

interface Props {
    className?: string;
    children: ReactNode;
}

export default function BaseFrame(props: Props) {
    return (
        <div
            className={`
            ${props.className}
            flex flex-col
            min-h-screen
            drop-in-animation`}
        >
            {props.children}
        </div>
    );
}
