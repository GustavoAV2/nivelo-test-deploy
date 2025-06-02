interface Props {
    className?: string;
    value: string;
    description: string;
}

export default function BaseSelectItem(props: Props) {
    return (
        <option
            className={`${props.className}`}
            value={props.value}
        >
            {props.description}
        </option>
    );
}
