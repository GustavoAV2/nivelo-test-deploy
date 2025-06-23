import { Cancel01Icon } from "hugeicons-react";

interface Props {
    onClick: () => void;
}

export default function BaseCancel(props: Props) {
    return (
        <button
            type="button"
            className="cursor-pointer"
            onClick={props.onClick}
        >
            <Cancel01Icon />
        </button>
    );
}
