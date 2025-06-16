import { ReactNode } from "react";

interface Props {
    children: ReactNode;
}

export default function BaseFlexCol(props: Props) {
    return (
        <div className="flex flex-col">
            {props.children}
        </div>
    );
}
