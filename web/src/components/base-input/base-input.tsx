"use client";

import { ViewIcon, ViewOffSlashIcon } from "hugeicons-react";
import { SyntheticEvent, useState } from "react";
import BaseInputLabel from "./base-input-label";

interface Props {
    className?: string;
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
    const [error, setError] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const onInput = (event: SyntheticEvent): void => {
        setError(false);
        const target = event.target as HTMLInputElement;
        const value = target.value;

        if (props.onInput) {
            props.onInput(value);
        }
    };

    const onInvalid = (event: SyntheticEvent): void => {
        event.preventDefault();
        if (props.invalidFeedback) {
            setError(true);
        }
    };

    const inputType = () => {
        if (isPasswordVisible && isTypePassword()) {
            return "text";
        } else {
            return props.type;
        }
    };

    const isTypePassword = () => {
        return props.type === "password";
    };

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    return (
        <div className={`${props.className}`}>
            <BaseInputLabel label={props.label} />
            <div className="relative">
                <input
                    className="
                        px-2 py-1 h-9 w-full
                        border rounded-lg
                        focus:outline-none
                        border-slate-400
                        focus:border-blue-500
                        dark:bg-gray-500"
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
                {props.type === "password" && (
                    <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2"
                        tabIndex={-1}
                    >
                        {isPasswordVisible ? <ViewOffSlashIcon /> : <ViewIcon />}
                    </button>
                )}
            </div>
            {error && (
                <div className="mt-2 text-sm text-red-500">
                    {props.invalidFeedback}
                </div>
            )}
        </div>
    );
}
