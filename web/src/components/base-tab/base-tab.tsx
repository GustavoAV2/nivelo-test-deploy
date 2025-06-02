import { ReactNode } from "react";

interface Props {
    className?: string;
    children: ReactNode;
}

export default function BaseTab(props: Props) {
    return (
        <div className={`
            ${props.className}
            flex justify-between`}
        >
            {props.children}
        </div>
    );
}
