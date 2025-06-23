"use client";

import { ViewIcon, ViewOffSlashIcon } from "hugeicons-react";
import { MouseEventHandler } from "react";

interface Props {
    type: string;
    isPasswordVisible: boolean;
    onToggle: MouseEventHandler<HTMLButtonElement>;
}

export default function BaseInputToggle(props: Props) {
    const togglePasswordIcon = () => {
        if (props.isPasswordVisible) {
            return <ViewOffSlashIcon />;
        } else {
            return <ViewIcon />;
        }
    };

    if (props.type === "password") {
        return (
            <button
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
                type="button"
                tabIndex={-1}
                onClick={props.onToggle}
            >
                {togglePasswordIcon()}
            </button>
        );
    };
}
