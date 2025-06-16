import { ReactNode } from "react";

interface Props {
    children: ReactNode;
}

export default function BaseFlexRowExpand(props: Props) {
    return (
        <div className="flex flex-row flex-grow">
            {props.children}
        </div>
    );
}
