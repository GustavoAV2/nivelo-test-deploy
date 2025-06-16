"use client";

import BaseButton from "@/components/base-button/base-button";
import BaseForm from "@/components/base-form/base-form";
import BaseInput from "@/components/base-input/base-input";
import { useNotification } from "@/components/base-notification/_hooks/base-notification-hook";
import BaseSelect from "@/components/base-select/base-select";
import BaseSelectItem from "@/components/base-select/base-select-item";
import BaseTextCenter from "@/components/base-text-center/base-text-center";
import Income from "@/entities/income/income";
import BaseFlexColSpaced from "@/layout/base-flex-col-spaced/base-flex-col-spaced";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { deleteIncomeAsync, editIncomeAsync } from "../../../_actions/income-actions";

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
        <BaseFlexColSpaced>
            <BaseForm>
                <BaseFlexColSpaced>
                    <BaseInput
                        type="text"
                        label="Descrição:"
                        value={description}
                        onInput={(e) => setDescription(e)}
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
                        onChange={setCategoryId}
                        value={categoryId}
                    >
                        {props.categoryOptions.map((opt) => (
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
                        {props.accountOptions.map((opt) => (
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
                        value={effectiveDate?.toString()}
                        onInput={setEffectiveDate}
                    />
                </BaseFlexColSpaced>
            </BaseForm>
            <BaseButton color="primary" onClick={handleSubmitAsync}>
                <BaseTextCenter text="Salvar" />
            </BaseButton>
            <BaseButton color="secondary" onClick={() => router.back()}>
                <BaseTextCenter text="Cancelar" />
            </BaseButton>
            <BaseButton color="danger" onClick={deleteIncome}>
                <BaseTextCenter text="Excluir" />
            </BaseButton>
        </BaseFlexColSpaced>
    );
}
