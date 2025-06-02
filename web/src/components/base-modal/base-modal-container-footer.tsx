import BaseButton from "../base-button/base-button";

interface Props {
    onModalCancel: () => void;
    onModalConfirm: () => void;
}

export default function BaseModalContainerFooter(props: Props) {
    return (
        <div className="flex justify-end gap-2">
            <BaseButton color="secondary" onClick={props.onModalCancel}>Cancelar</BaseButton>
            <BaseButton color="primary" onClick={props.onModalConfirm}>Confirmar</BaseButton>
        </div>
    );
}
