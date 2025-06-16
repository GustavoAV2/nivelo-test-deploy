"use client";

import BaseAlert from "../base-alert/base-alert";

interface Props {
    isInvalid: boolean;
    invalidFeedback?: string;
}

export default function BaseInputFeedback(props: Props) {
    if (props.isInvalid && props.invalidFeedback) {
        return (
            <div className="mt-2">
                <BaseAlert color="danger" text={props.invalidFeedback} />
            </div>
        );
    }
}
