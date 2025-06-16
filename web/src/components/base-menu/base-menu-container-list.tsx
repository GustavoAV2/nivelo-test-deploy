import { ReactNode } from "react";
import BaseFlexCol from "../../layout/base-flex-col/base-flex-col";

interface Props {
    children: ReactNode;
}

export default function BaseMenuContainerList(props: Props) {
    return (
        <BaseFlexCol>
            {props.children}
        </BaseFlexCol>
    );
}
