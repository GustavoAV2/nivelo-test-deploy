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
import { createIncomeAsync } from "../../_actions/income-actions";

interface Props {
    categoryOptions: { value: string; label: string; }[];
    accountOptions: { value: string; label: string; }[];
}

export default function PageTransactionIncomeNewClient(props: Props) {
    const router = useRouter();
    const { showNotification } = useNotification();

    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState(0);
    const [categoryId, setCategoryId] = useState(props.categoryOptions[0].value);
    const [accountId, setAccountId] = useState(props.accountOptions[0].value);
    const [effectiveDate, setEffectiveDate] = useState(
        new Date().toISOString().split("T")[0]
    );

    const handleCreateIncomeAsync = async () => {
        await createIncomeAsync(categoryId, accountId, amount, description, new Date(effectiveDate));
        showNotification("Receita criada com sucesso!");
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
                        value={effectiveDate.toString()}
                        onInput={setEffectiveDate}
                    />
                </BaseFlexColSpaced>
            </BaseForm>
            <BaseButton color="primary" onClick={handleCreateIncomeAsync}>
                <BaseTextCenter text="Salvar" />
            </BaseButton>
            <BaseButton color="secondary" onClick={() => router.back()} >
                <BaseTextCenter text="Cancelar" />
            </BaseButton>
        </BaseFlexColSpaced >
    );
}
