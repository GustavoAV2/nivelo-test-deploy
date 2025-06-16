import { ReactNode } from "react";
import BaseContainer from "../base-container/base-container";

interface Props {
    children: ReactNode;
}

export default function BasePage(props: Props) {
    return (
        <div className="flex flex-col flex-grow mx-4 mt-18 mb-28 animation-drop-in">
            <BaseContainer>
                {props.children}
            </BaseContainer>
        </div>
    );
}
