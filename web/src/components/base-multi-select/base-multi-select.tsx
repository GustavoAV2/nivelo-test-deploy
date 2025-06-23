"use client";

import BaseMultiSelectItem from "./base-multi-select-item";

interface TabItem {
    key: string;
    label: string;
}

interface Props {
    items: TabItem[];
    selectedKeys: string[];
    onChange: (selected: string[]) => void;
}

export default function BaseTab(props: Props) {
    const handleToggle = (key: string) => {
        if (props.selectedKeys.includes(key)) {
            props.onChange(props.selectedKeys.filter(k => k !== key));
        } else {
            props.onChange([...props.selectedKeys, key]);
        }
    };

    return (
        <div className="flex flex-wrap gap-2">
            {props.items.map((item) => (
                <BaseMultiSelectItem
                    key={item.key}
                    active={props.selectedKeys.includes(item.key)}
                    onClick={() => handleToggle(item.key)}
                >
                    {item.label}
                </BaseMultiSelectItem>
            ))}
        </div>
    );
}
