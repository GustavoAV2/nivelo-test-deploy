import BaseModalContainerBody from "./base-modal-container-body";
import BaseModalContainerFooter from "./base-modal-container-footer";
import BaseModalContainerHeader from "./base-modal-container-header";

interface Props {
    modalTitle: string;
    modalContent: string;
    isModalOpen: boolean;
    onModalClose: () => void;
    onModalCancel: () => void;
    onModalConfirm: () => void;
}

export default function BaseModalContainer(props: Props) {
    const pointerEventsTransition = () => {
        if (!props.isModalOpen)
            return "pointer-events-none";
        else
            return "pointer-events-auto";
    };

    const modalTransition = () => {
        if (!props.isModalOpen)
            return "opacity-0";
        else
            return "opacity-100";
    };

    return (
        <div className={`
            fixed top-0 bottom-0 left-0 right-0
            flex justify-center items-center
            pointer-events-none`}
        >
            <div className={`
                ${pointerEventsTransition()}
                ${modalTransition()}
                p-4 min-w-72 max-w-80
                shadow rounded
                transition-opacity
                bg-blue-200 dark:bg-gray-700`}
            >
                <BaseModalContainerHeader modalTitle={props.modalTitle} onModalClose={props.onModalClose} />
                <BaseModalContainerBody modalContent={props.modalContent} />
                <BaseModalContainerFooter onModalCancel={props.onModalCancel} onModalConfirm={props.onModalConfirm} />
            </div>
        </div>
    );
}
