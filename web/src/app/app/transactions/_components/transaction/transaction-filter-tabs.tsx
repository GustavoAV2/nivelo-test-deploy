"use client";

import BaseTab from "@/components/base-tab/base-tab";
import BaseTabItem from "@/components/base-tab/base-tab-item";
import BaseText from "@/components/base-text/base-text";
import { useRouter, useSearchParams } from "next/navigation";
import { TransactionType } from "./transaction.model";

export default function TransactionFilterTabs() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const handleTabClick = (type: TransactionType | "All") => {
        const newSearchParams = new URLSearchParams(searchParams.toString());
        if (type === "All") {
            newSearchParams.delete("type");
        } else {
            newSearchParams.set("type", type);
        }
        router.push(`/app/transactions?${newSearchParams.toString()}`);
    };

    return (
        <BaseTab>
            <BaseTabItem onClick={() => handleTabClick("All")}>
                <BaseText text="Tudo" />
            </BaseTabItem>
            <BaseTabItem onClick={() => handleTabClick(TransactionType.Income)}>
                <BaseText text="Receita" />
            </BaseTabItem>
            <BaseTabItem onClick={() => handleTabClick(TransactionType.Transfer)}>
                <BaseText text="Transf." />
            </BaseTabItem>
            <BaseTabItem onClick={() => handleTabClick(TransactionType.Expense)}>
                <BaseText text="Despesa" />
            </BaseTabItem>
        </BaseTab>
    );
}
