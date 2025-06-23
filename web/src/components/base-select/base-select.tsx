"use client";

import { ReactNode, SyntheticEvent } from "react";

interface Props {
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
        <div className={`${display()}`}>
            <div className="mb-2">{props.label}</div>
            <select
                className={`
                    px-4 py-2 h-12
                    border rounded-lg
                    focus:outline-none
                    appearance-none 
                    focus:border-blue-500
                    bg-slate-300 dark:bg-slate-600
                    border-slate-300 dark:border-slate-600
                    ${width()}
                `}
                onChange={onChange}
                value={props.value}
            >
                {props.children}
            </select>
        </div>
    );
}
