import { ReactNode } from "react";

interface Props {
    children: ReactNode;
}

export default function BaseFlexRowCenter(props: Props) {
    return (
        <div className="flex flex-row justify-center">
            {props.children}
        </div>
    );
}
