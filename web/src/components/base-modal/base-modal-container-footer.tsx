import BaseButton from "../base-button/base-button";
import BaseTextCenter from "../base-text-center/base-text-center";

interface Props {
    onModalCancel: () => void;
    onModalConfirm: () => void;
}

export default function BaseModalContainerFooter(props: Props) {
    return (
        <div className="flex justify-end gap-2">
            <BaseButton
                color="secondary"
                onClick={props.onModalCancel}
            >
                <BaseTextCenter text="Cancelar" />
            </BaseButton>
            <BaseButton
                color="primary"
                onClick={props.onModalConfirm}
            >
                <BaseTextCenter text="Confirmar" />
            </BaseButton>
        </div>
    );
}
