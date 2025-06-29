import { Menu01Icon } from "hugeicons-react";

interface Props {
    toggleMenu: () => void;
}

export default function BaseHeaderToggle(props: Props) {
    return (
        <button className="cursor-pointer" onClick={props.toggleMenu}>
            <Menu01Icon className="text-black dark:text-white" />
        </button>
    );
}
