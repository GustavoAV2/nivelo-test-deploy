import { Invoice03Icon } from "hugeicons-react";
import BaseCancel from "../base-cancel/base-cancel";

interface Props {
    onMenuClose: () => void;
}

export default function BaseMenuContainerHeader(props: Props) {
    return (
        <div className="p-7">
            <div className="mb-2 flex justify-between">
                <Invoice03Icon size={48} />
                <BaseCancel onClick={props.onMenuClose} />
            </div>
            <span>Plataforma de Finanças</span>
        </div>
    );
}
