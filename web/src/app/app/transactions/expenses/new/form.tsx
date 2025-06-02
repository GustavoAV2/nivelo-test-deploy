"use client";

import BaseButton from "@/components/base-button/base-button";
import BaseFooter from "@/components/base-footer/base-footer";
import BaseForm from "@/components/base-form/base-form";
import BaseInput from "@/components/base-input/base-input";
import BasePage from "@/components/base-page/base-page";
import BaseSelect from "@/components/base-select/base-select";
import BaseSelectItem from "@/components/base-select/base-select-item";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createExpenseAsync } from "../../_actions/expense-actions";
import { useNotification } from "@/components/base-notification/_hooks/base-notification-hook";

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
        <>
            <BasePage className="flex flex-col flex-grow max-w-sm">
                <div className="mb-10">
                    <BaseForm>
                        <BaseInput
                            className="mb-4"
                            type="text"
                            label="Descrição:"
                            value={description}
                            onInput={(e) => setDescription(e)}
                        />
                        <BaseInput
                            className="mb-4"
                            type="number"
                            label="Valor:"
                            value={amount.toString()}
                            onInput={(e) => setAmount(parseFloat(e))}
                        />

                        <BaseSelect className="mb-4" display="block" label="Selecione a categoria:" value={categoryId} onChange={setCategoryId}>
                            {categoryOptions.map((opt) => (
                                <BaseSelectItem key={opt.value} description={opt.label} value={opt.value} />
                            ))}
                        </BaseSelect>

                        <BaseSelect className="mb-4" display="block" label="Selecione a conta:" value={accountId} onChange={setAccountId}>
                            {accountOptions.map((opt) => (
                                <BaseSelectItem key={opt.value} description={opt.label} value={opt.value} />
                            ))}
                        </BaseSelect>

                        <BaseInput
                            className="mb-4"
                            type="date"
                            label="Data de efetivação:"
                            value={effectiveDate.toString()}
                            onInput={setEffectiveDate}
                        />
                    </BaseForm>
                </div>
                <div className="flex flex-col items-stretch">
                    <BaseButton className="mb-2" color="primary" onClick={handleCreateExpenseAsync}>
            Salvar
                    </BaseButton>
                    <BaseButton className="mb-4" color="secondary" onClick={() => router.back()}>
            Cancelar
                    </BaseButton>
                </div>
            </BasePage>
            <BaseFooter />
        </>
    );
}
