import { Cancel01Icon } from "hugeicons-react";

interface Props {
    modalTitle: string;
    onModalClose: () => void;
}

export default function BaseModalContainerHeader(props: Props) {
    return (
        <div className="flex justify-between gap-4">
            <div>{props.modalTitle}</div>
            <button onClick={props.onModalClose}>
                <Cancel01Icon className="mb-2" size={24} />
            </button>
        </div>
    );
}
