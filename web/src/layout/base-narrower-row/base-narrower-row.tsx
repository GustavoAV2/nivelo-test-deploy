import { ReactNode } from "react";

interface Props {
    children: ReactNode;
}

export default function BaseNarrowerRow(props: Props) {
    return (
        <div className="w-full max-w-[480px]">
            {props.children}
        </div>
    );
}
