"use client";

import BaseButton from "@/components/base-button/base-button";
import BaseForm from "@/components/base-form/base-form";
import BaseInput from "@/components/base-input/base-input";
import { useNotification } from "@/components/base-notification/_hooks/base-notification-hook";
import BaseSelect from "@/components/base-select/base-select";
import BaseSelectItem from "@/components/base-select/base-select-item";
import BaseTextCenter from "@/components/base-text-center/base-text-center";
import Expense from "@/entities/expense/expense";
import BaseFlexColSpaced from "@/layout/base-flex-col-spaced/base-flex-col-spaced";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { deleteExpenseAsync, editExpenseAsync } from "../../../_actions/expense-actions";

interface Props {
    expense: Expense;
    accountOptions: {
        value: string,
        label: string,
    }[],
    categoryOptions: {
        value: string,
        label: string,
    }[],
}

export default function PageTransactionExpenseEditClient(props: Props) {
    const router = useRouter();
    const { showNotification } = useNotification();

    const [description, setDescription] = useState(props.expense?.description || "");
    const [amount, setAmount] = useState(props.expense.amount);
    const [accountId, setAccountId] = useState(props.expense.account_id);
    const [categoryId, setCategoryId] = useState(
        props.expense.category_id ||
        props.categoryOptions[0].value
    );

    const initialDateString = props.expense.effective_date
        ? new Date(props.expense.effective_date).toISOString().slice(0, 10)
        : new Date().toISOString().slice(0, 10);
    const [effectiveDate, setEffectiveDate] = useState(initialDateString);


    const handleSubmitAsync = async (e: React.FormEvent) => {
        e.preventDefault();
        const dateObj = new Date(effectiveDate + "T00:00:00");
        await editExpenseAsync(
            props.expense.id,
            description,
            categoryId,
            accountId,
            amount,
            dateObj
        );
        showNotification("Gasto atualizado com sucesso!");
        router.back();
    };

    const handleDeleteExpenseAsync = async () => {
        await deleteExpenseAsync(props.expense.id);
        showNotification("Gasto deletado!");
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
                        onChange={setAccountId}
                        value={accountId}
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
            <BaseButton color="danger" onClick={handleDeleteExpenseAsync}>
                <BaseTextCenter text="Excluir" />
            </BaseButton>
        </BaseFlexColSpaced>
    );
}
