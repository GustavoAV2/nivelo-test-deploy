interface Props {
    color: "success" | "warning" | "danger";
    text: string;
}

export default function BaseCard(props: Props) {
    const alertColor = () => {
        switch (props.color) {
            case "success":
                return "text-green-500";
            case "warning":
                return "text-amber-400";
            case "danger":
                return "text-red-500";
        }
    };

    return (
        <div className={`${alertColor()}`}>
            <span>{props.text}</span>
        </div>
    );
}
