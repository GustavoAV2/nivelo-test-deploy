interface Props {
    isBackdropVisible: boolean;
    onBackdropClick: () => void;
}

export default function BaseMenuBackdrop(props: Props) {
    const pointerEventsTransition = () => {
        if (!props.isBackdropVisible)
            return "pointer-events-none";
        else
            return "pointer-events-auto";
    };

    const backdropTransition = () => {
        if (!props.isBackdropVisible)
            return "bg-black/0";
        else
            return "bg-black/50";
    };

    return (
        <div className={`
            ${pointerEventsTransition()}
            ${backdropTransition()}
            fixed top-0 bottom-0 left-0 right-0
            transition-colors`}
        onClick={props.onBackdropClick}
        ></div>
    );
}
