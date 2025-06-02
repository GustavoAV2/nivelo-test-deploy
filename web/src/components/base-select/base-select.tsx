"use client";

import { ReactNode, SyntheticEvent } from "react";

interface Props {
    className?: string;
    children: ReactNode;
    display: "block" | "inline";
    label: string;
    onChange?: (value: string) => void;
    value: string;
}

export default function BaseSelect(props: Props) {
    const onChange = (event: SyntheticEvent): void => {
        const target = event.target as HTMLSelectElement;
        const value = target.value;

        if (!props.onChange) { return; }
        props.onChange(value);
    };

    const display = () => {
        if (props.display === "block")
            return "block";
        else
            return "inline";
    };

    const width = () => {
        if (props.display === "block")
            return "w-full";
        else
            return "";
    };

    return (
        <div className={`
            ${props.className}
            ${display()}`
        }>
            <span>{props.label}</span>
            <br />
            <select className={`
                px-1 py-2
                border rounded-lg
                focus:outline-none
                focus:border-blue-500
                dark:bg-gray-500
                ${width()}`}
            onChange={onChange}
            value={props.value}
            >
                {props.children}
            </select>
        </div>
    );
}
