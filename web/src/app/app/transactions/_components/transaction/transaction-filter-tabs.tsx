"use client";

import BaseTab from "@/components/base-tab/base-tab";
import BaseTabItem from "@/components/base-tab/base-tab-item";
import BaseText from "@/components/base-text/base-text";
import { useRouter, useSearchParams } from "next/navigation";
import { TransactionType } from "./transaction.model";

export default function TransactionFilterTabs() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const selectedType = searchParams.get("type");

    const isSelected = (type: TransactionType | "All") => {
        if (selectedType == null && type == "All") {
            return true;
        }
        return selectedType == type;
    };

    const handleTabClick = (type: TransactionType | "All") => {
        const newSearchParams = new URLSearchParams(searchParams.toString());
        if (type === "All") {
            newSearchParams.delete("type");
        } else {
            newSearchParams.delete("accountId");
            newSearchParams.set("type", type);
        }
        router.push(`/app/transactions?${newSearchParams.toString()}`);
    };

    return (
        <BaseTab>
            <BaseTabItem onClick={() => handleTabClick("All")}>
                <BaseText text="Tudo" bold={isSelected("All")} />
            </BaseTabItem>
            <BaseTabItem onClick={() => handleTabClick(TransactionType.Income)}>
                <BaseText text="Receita" bold={isSelected(TransactionType.Income)} />
            </BaseTabItem>
            <BaseTabItem onClick={() => handleTabClick(TransactionType.Transfer)}>
                <BaseText text="Transf." bold={isSelected(TransactionType.Transfer)} />
            </BaseTabItem>
            <BaseTabItem onClick={() => handleTabClick(TransactionType.Expense)}>
                <BaseText text="Despesa" bold={isSelected(TransactionType.Expense)} />
            </BaseTabItem>
        </BaseTab>
    );
}
