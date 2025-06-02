"use client";

import BaseButton from "@/components/base-button/base-button";
import BaseForm from "@/components/base-form/base-form";
import BaseInput from "@/components/base-input/base-input";
import BasePage from "@/components/base-page/base-page";
import BaseSelect from "@/components/base-select/base-select";
import BaseSelectItem from "@/components/base-select/base-select-item";
import Income from "@/entities/income/income";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { deleteIncomeAsync, editIncomeAsync } from "../../../_actions/income-actions";
import { useNotification } from "@/components/base-notification/_hooks/base-notification-hook";

interface Props {
  income: Income;
  accountOptions: { value: string, label: string; }[],
  categoryOptions: { value: string, label: string; }[],
}

export default function PageTransactionIncomeEditForm(props: Props) {
    const router = useRouter();
    const { showNotification } = useNotification();

    const [description, setDescription] = useState(props.income?.description || "");
    const [amount, setAmount] = useState(props.income.amount);
    const [accountId, setAccountId] = useState(props.income.account_id);
    const [categoryId, setCategoryId] = useState(
        props.income.category_id ||
    props.categoryOptions[0].value
    );

    const initialDateString = props.income.effective_date
        ? new Date(props.income.effective_date).toISOString().slice(0, 10)
        : new Date().toISOString().slice(0, 10);
    const [effectiveDate, setEffectiveDate] = useState(initialDateString);


    const handleSubmitAsync = async (e: React.FormEvent) => {
        e.preventDefault();
        const dateObj = new Date(effectiveDate + "T00:00:00");
        await editIncomeAsync(
            props.income.id,
            description,
            categoryId,
            accountId,
            amount,
            dateObj
        );
        showNotification("Receita atualizada com sucesso!");
        router.back();
    };

    const deleteIncome = async () => {
        await deleteIncomeAsync(props.income.id);
        showNotification("Receita deletada!");
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

                        <BaseSelect className="mb-4" display="block" label="Selecione a categoria:" onChange={setCategoryId} value={categoryId} >
                            {props.categoryOptions.map((opt) => (
                                <BaseSelectItem key={opt.value} description={opt.label} value={opt.value} />
                            ))}
                        </BaseSelect>

                        <BaseSelect className="mb-4" display="block" label="Selecione a conta:" value={accountId} onChange={setAccountId}>
                            {props.accountOptions.map((opt) => (
                                <BaseSelectItem key={opt.value} description={opt.label} value={opt.value} />
                            ))}
                        </BaseSelect>

                        <BaseInput
                            className="mb-4"
                            type="date"
                            label="Data de efetivação:"
                            value={effectiveDate?.toString()}
                            onInput={setEffectiveDate}
                        />
                    </BaseForm>
                </div>
                <div className="flex flex-col items-stretch">
                    <BaseButton className="mb-2" color="primary" onClick={handleSubmitAsync}>
            Salvar
                    </BaseButton>
                    <BaseButton className="mb-2" color="secondary" onClick={() => router.back()}>
            Cancelar
                    </BaseButton>
                    <BaseButton color="danger" onClick={deleteIncome}>
            Excluir
                    </BaseButton>
                </div>
            </BasePage>
        </>
    );
}
