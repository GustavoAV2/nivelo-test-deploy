import BaseCancel from "../base-cancel/base-cancel";

interface Props {
    modalTitle: string;
    onModalClose: () => void;
}

export default function BaseModalContainerHeader(props: Props) {
    return (
        <div className="flex justify-between gap-4">
            <div>{props.modalTitle}</div>
            <BaseCancel onClick={props.onModalClose} />
        </div>
    );
}
