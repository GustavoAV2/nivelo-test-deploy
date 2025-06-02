interface Props {
    className?: string;
    label: string;
}

export default function BaseCheck(props: Props) {
    return (
        <div className={`
            ${props.className}
            flex py-2 ml-1`}
        >
            <input
                className="me-2 scale-150 dark:accent-gray-500"
                type="checkbox"
            />
            <span className="text-xs">
                {props.label}
            </span>
        </div>
    );
}
