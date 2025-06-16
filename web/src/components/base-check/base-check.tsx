interface Props {
    label: string;
}

export default function BaseCheck(props: Props) {
    return (
        <div className="flex py-2 ml-1">
            <input
                className="me-2 dark:accent-slate-500"
                type="checkbox"
            />
            <span className="text-xs">
                {props.label}
            </span>
        </div>
    );
}
