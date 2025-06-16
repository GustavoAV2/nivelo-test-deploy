import { ReactNode } from "react";

interface Props {
    children: ReactNode;
}

export default function BaseFlexColSpaced(props: Props) {
    return (
        <div className="flex flex-col gap-4">
            {props.children}
        </div>
    );
}
