interface Props {
    value: string;
    description: string;
}

export default function BaseSelectItem(props: Props) {
    return (
        <option value={props.value}>
            {props.description}
        </option>
    );
}
