"use client";

import BaseSelect from "@/components/base-select/base-select";
import BaseSelectItem from "@/components/base-select/base-select-item";
import BaseTab from "@/components/base-tab/base-tab";
import BaseFlexRow from "@/layout/base-flex-row/base-flex-row";
import { useRouter, useSearchParams } from "next/navigation";

export default function TransactionFilterAccounts({
    accountOptions
}: {
    accountOptions: { value: string; label: string; }[];
}) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const selectedAccount = searchParams.get("accountId") ?? "";

    const handleAccountClick = (accountId: string) => {
        const newSearchParams = new URLSearchParams(searchParams.toString());
        if (accountId == null || accountId === "") {
            newSearchParams.delete("accountId");
        } else {
            newSearchParams.delete("type");
            newSearchParams.set("accountId", accountId);
        }
        router.push(`/app/transactions?${newSearchParams.toString()}`);
    };

    return (
        <BaseTab>
            <BaseFlexRow>
                <BaseSelect
                    display="block"
                    label="Conta:"
                    value={selectedAccount}
                    onChange={handleAccountClick}
                >
                    <BaseSelectItem
                        key="All"
                        description="Todas"
                        value=""
                    />

                    {accountOptions.map((opt) => (
                        <BaseSelectItem
                            key={opt.value}
                            description={opt.label}
                            value={opt.value}
                        />
                    ))}
                </BaseSelect>
            </BaseFlexRow>
        </BaseTab>
    );
}
