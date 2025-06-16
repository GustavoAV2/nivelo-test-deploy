import { ReactNode } from "react";

interface Props {
    children: ReactNode;
}

export default function BaseFlexColBetween(props: Props) {
    return (
        <div className="flex flex-col justify-between">
            {props.children}
        </div>
    );
}
