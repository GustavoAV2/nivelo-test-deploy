import { ReactNode } from "react";

interface Props {
    children: ReactNode;
}

export default function BaseFlexCentralizer(props: Props) {
    return (
        <div className="flex flex-col flex-grow justify-center items-center">
            {props.children}
        </div>
    );
}
