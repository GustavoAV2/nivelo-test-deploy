"use client";

import BaseButton from "@/components/base-button/base-button";
import BaseForm from "@/components/base-form/base-form";
import BaseInput from "@/components/base-input/base-input";
import { useNotification } from "@/components/base-notification/_hooks/base-notification-hook";
import BaseSelect from "@/components/base-select/base-select";
import BaseSelectItem from "@/components/base-select/base-select-item";
import BaseTextCenter from "@/components/base-text-center/base-text-center";
import BaseFlexColSpaced from "@/layout/base-flex-col-spaced/base-flex-col-spaced";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createExpenseAsync } from "../../_actions/expense-actions";

export default function PageTransactionExpenseNewClient({
    categoryOptions,
    accountOptions
}: {
    categoryOptions: { value: string; label: string; }[];
    accountOptions: { value: string; label: string; }[];
}) {
    const router = useRouter();
    const { showNotification } = useNotification();

    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState(0);
    const [categoryId, setCategoryId] = useState(categoryOptions[0].value);
    const [accountId, setAccountId] = useState(accountOptions[0].value);
    const [effectiveDate, setEffectiveDate] = useState(
        new Date().toISOString().split("T")[0]
    );

    const handleCreateExpenseAsync = async () => {
        await createExpenseAsync(categoryId, accountId, amount, description, new Date(effectiveDate));
        showNotification("Gasto criado com sucesso!");
        router.back();
    };

    return (
        <BaseFlexColSpaced>
            <BaseForm>
                <BaseFlexColSpaced>
                    <BaseInput
                        type="text"
                        label="Descrição:"
                        value={description}
                        onInput={setDescription}
                    />
                    <BaseInput
                        type="number"
                        label="Valor:"
                        value={amount.toString()}
                        onInput={(e) => setAmount(parseFloat(e))}
                    />
                    <BaseSelect
                        display="block"
                        label="Selecione a categoria:"
                        value={categoryId}
                        onChange={setCategoryId}
                    >
                        {categoryOptions.map((opt) => (
                            <BaseSelectItem
                                key={opt.value}
                                description={opt.label}
                                value={opt.value}
                            />
                        ))}
                    </BaseSelect>
                    <BaseSelect
                        display="block"
                        label="Selecione a conta:"
                        value={accountId}
                        onChange={setAccountId}
                    >
                        {accountOptions.map((opt) => (
                            <BaseSelectItem
                                key={opt.value}
                                description={opt.label}
                                value={opt.value}
                            />
                        ))}
                    </BaseSelect>
                    <BaseInput
                        type="date"
                        label="Data de efetivação:"
                        value={effectiveDate.toString()}
                        onInput={setEffectiveDate}
                    />
                </BaseFlexColSpaced>
            </BaseForm>
            <BaseButton color="primary" onClick={handleCreateExpenseAsync}>
                <BaseTextCenter text="Salvar" />
            </BaseButton>
            <BaseButton color="secondary" onClick={() => router.back()}>
                <BaseTextCenter text="Cancelar" />
            </BaseButton>
        </BaseFlexColSpaced>
    );
}
