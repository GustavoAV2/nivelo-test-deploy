"use client";

import { SyntheticEvent, useState } from "react";
import BaseInputFeedback from "./base-input-feedback";
import BaseInputToggle from "./base-input-toggle";

interface Props {
    placeholder?: string;
    type: string;
    label: string;
    pattern?: string;
    required?: boolean;
    min?: number;
    max?: number;
    invalidFeedback?: string;
    value?: string;
    onInput?: (value: string) => void;
}

export default function BaseInput(props: Props) {
    const [isInvalid, setIsInvalid] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const onInput = (event: SyntheticEvent): void => {
        setIsInvalid(false);
        const target = event.target as HTMLInputElement;
        const value = target.value;
        if (props.onInput) { props.onInput(value); }
    };

    const onInvalid = (event: SyntheticEvent): void => {
        event.preventDefault();
        if (props.invalidFeedback) { setIsInvalid(true); }
    };

    const inputType = () => {
        if (isPasswordVisible && isTypePassword()) { return "text"; }
        else { return props.type; }
    };

    const isTypePassword = () => {
        return props.type === "password";
    };

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    return (
        <div>
            <div className="mb-2">{props.label}</div>
            <div className="relative">
                <input
                    className="
                        px-4 py-2 h-12 w-full
                        border rounded-lg
                        focus:outline-none
                        focus:border-blue-500
                        bg-slate-300 dark:bg-slate-600
                        border-slate-300 dark:border-slate-600
                    "
                    onInput={onInput}
                    onInvalid={onInvalid}
                    type={inputType()}
                    placeholder={props.placeholder}
                    pattern={props.pattern}
                    required={props.required}
                    min={props.min}
                    max={props.max}
                    value={props.value}
                />
                <BaseInputToggle
                    isPasswordVisible={isPasswordVisible}
                    type={props.type}
                    onToggle={togglePasswordVisibility}
                />
            </div>
            <BaseInputFeedback
                isInvalid={isInvalid}
                invalidFeedback={props.invalidFeedback}
            />
        </div>
    );
}
