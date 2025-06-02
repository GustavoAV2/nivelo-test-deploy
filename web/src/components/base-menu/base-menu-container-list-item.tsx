import { ReactNode } from "react";

interface Props {
    children: ReactNode;
    onClick?: () => void;
}

export default function BaseMenuContainerListItem(props: Props) {
    return (
        <div>
            <button className="
                p-2 w-full
                border
                text-start
                text-white
                border-white
                bg-blue-500
                hover:bg-blue-700
                dark:bg-gray-800
                dark:hover:bg-gray-600
                dark:border-gray-600
                dark:text-white
            "
            onClick={props.onClick}
            >
                {props.children}
            </button>
        </div>
    );
}
