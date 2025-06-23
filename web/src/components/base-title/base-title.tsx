import { ReactNode } from "react";

interface Props {
    children: ReactNode;
}

export default function BaseTitle(props: Props) {
    return (
        <div className="text-3xl font-bold">
            {props.children}
        </div>
    );
}
