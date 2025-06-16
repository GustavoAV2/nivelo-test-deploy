import { ReactNode } from "react";

interface Props {
    children: ReactNode;
}

export default function BaseRoot(props: Props) {
    return (
        <div className="base-root flex flex-col flex-grow">
            {props.children}
        </div>
    );
}
