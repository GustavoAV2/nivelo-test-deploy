import BaseModalBackdrop from "./base-modal-backdrop";
import BaseModalContainer from "./base-modal-container";

interface Props {
    className?: string;
    modalTitle: string;
    modalContent: string;
    isModalOpen: boolean;
    onModalClose: () => void;
    onModalCancel: () => void;
    onModalConfirm: () => void;
}

export default function BaseModal(props: Props) {
    return (
        <div className={`${props.className}`}>
            <BaseModalBackdrop
                isBackdropVisible={props.isModalOpen}
                onBackdropClick={props.onModalClose}
            />
            <BaseModalContainer
                modalTitle={props.modalTitle}
                modalContent={props.modalContent}
                isModalOpen={props.isModalOpen}
                onModalClose={props.onModalClose}
                onModalCancel={props.onModalCancel}
                onModalConfirm={props.onModalConfirm}
            />
        </div>
    );
}
