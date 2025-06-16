import { ReactNode } from "react";

interface Props {
    children: ReactNode;
}

export default function BaseNarrowerCol(props: Props) {
    return (
        <div className="h-full max-h-[480px]">
            {props.children}
        </div>
    );
}
