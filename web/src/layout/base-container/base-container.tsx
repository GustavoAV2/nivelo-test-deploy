import { ReactNode } from "react";

interface Props {
    children: ReactNode;
}

export default function BaseContainer(props: Props) {
    return (
        <div className="flex flex-col flex-grow mx-auto container">
            {props.children}
        </div>
    );
}
