import { ReactNode } from "react";

interface Props {
    className?: string;
    children: ReactNode;
}

export default function BasePage(props: Props) {
    return (
        <div
            className={`${props.className}
            p-7 mx-auto container
            drop-in-animation`}
        >
            {props.children}
        </div>
    );
}
