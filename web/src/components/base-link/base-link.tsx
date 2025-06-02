import { ReactNode } from "react";

interface Props {
    className?: string;
    children: ReactNode;
}

export default function BaseLink(props: Props) {
    return (
        <span className={`
            ${props.className}
            underline
            text-blue-500
            hover:text-blue-700`}
        >
            {props.children}
        </span>
    );
}
