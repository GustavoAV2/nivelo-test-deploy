"use client";

import { createTransferAsync } from "@/app/app/transactions/_actions/transfer-actions";
import BaseButton from "@/components/base-button/base-button";
import BaseForm from "@/components/base-form/base-form";
import BaseInput from "@/components/base-input/base-input";
import BaseSelect from "@/components/base-select/base-select";
import BaseSelectItem from "@/components/base-select/base-select-item";
import BaseTextCenter from "@/components/base-text-center/base-text-center";
import BaseFlexColSpaced from "@/layout/base-flex-col-spaced/base-flex-col-spaced";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Props {
    accountOptions: { value: string; label: string }[];
}

export default function PageTransactionTransferNewClient(props: Props) {
    const router = useRouter();
    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState(0);
    const [sourceAcountId, setSourceAcountId] = useState(
        props.accountOptions[0].value
    );
    const [targetAccountId, setTargetAccountId] = useState(
        props.accountOptions[1].value
    );
    const [effectiveDate, setEffectiveDate] = useState(
        new Date().toISOString().split("T")[0]
    );

    const createTransfer = async () => {
        await createTransferAsync(
            sourceAcountId,
            targetAccountId,
            amount,
            description,
            new Date(effectiveDate)
        );
        alert("Transferência criada com sucesso!");
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
                        label="Selecione a conta de origem:"
                        onChange={setSourceAcountId}
                        value={sourceAcountId}
                    >
                        {props.accountOptions.map((opt) => (
                            <BaseSelectItem
                                key={opt.value}
                                description={opt.label}
                                value={opt.value}
                            />
                        ))}
                    </BaseSelect>
                    <BaseSelect
                        display="block"
                        label="Selecione a conta de destino:"
                        onChange={setTargetAccountId}
                        value={targetAccountId}
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
            <BaseButton color="primary" onClick={createTransfer}>
                <BaseTextCenter text="Salvar" />
            </BaseButton>
            <BaseButton color="secondary" onClick={() => router.back()}>
                <BaseTextCenter text="Cancelar" />
            </BaseButton>
        </BaseFlexColSpaced >
    );
}
