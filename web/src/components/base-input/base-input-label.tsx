interface Props {
    label: string;
}

export default function BaseInputLabel(props: Props) {
    return (
        <div className="mb-1 flex justify-between items-center">
            <span>{props.label}</span>
        </div>
    );
}
