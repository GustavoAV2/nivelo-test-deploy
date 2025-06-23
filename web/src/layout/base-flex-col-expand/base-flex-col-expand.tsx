import { ReactNode } from "react";

interface Props {
    children: ReactNode;
}

export default function BaseFlexColExpand(props: Props) {
    return (
        <div className="flex flex-col flex-grow">
            {props.children}
        </div>
    );
}
