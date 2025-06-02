interface Props {
    modalContent: string;
}

export default function BaseModalContainerBody(props: Props) {
    return (
        <div className="mb-8 text-sm">{props.modalContent}</div>
    );
}
