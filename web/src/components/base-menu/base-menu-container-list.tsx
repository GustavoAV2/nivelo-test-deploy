import { ReactNode } from "react";

interface Props {
    children: ReactNode;
}

export default function BaseMenuContainerList(props: Props) {
    return (
        <div className="flex flex-col flex-grow justify-between">
            {props.children}
        </div>
    );
}
