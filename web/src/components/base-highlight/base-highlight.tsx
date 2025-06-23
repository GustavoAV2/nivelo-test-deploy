import { ReactNode } from "react";

interface Props {
    children: ReactNode;
}

export default function BaseHighlight(props: Props) {
    return (
        <div className="text-2xl font-bold">
            {props.children}
        </div>
    );
}
