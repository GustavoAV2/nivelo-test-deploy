import { ReactNode } from "react";

interface Props {
    children: ReactNode;
}

export default function BaseFlexColCenter(props: Props) {
    return (
        <div className="flex flex-col justify-center">
            {props.children}
        </div>
    );
}
