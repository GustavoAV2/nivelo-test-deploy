"use client";

import { ReactNode, SyntheticEvent } from "react";

interface Props {
    children: ReactNode;
    onSubmit?: () => void;
}

export default function BaseForm(props: Props) {
    const onSubmit = (event: SyntheticEvent) => {
        event.preventDefault();
        if (props.onSubmit) { props.onSubmit(); }
    };

    return (
        <form onSubmit={onSubmit}>
            {props.children}
        </form>
    );
}
