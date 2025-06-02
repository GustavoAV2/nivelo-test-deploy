"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createTransferAsync } from "@/app/app/transactions/_actions/transfer-actions";
import BasePage from "@/components/base-page/base-page";
import BaseForm from "@/components/base-form/base-form";
import BaseInput from "@/components/base-input/base-input";
import BaseSelect from "@/components/base-select/base-select";
import BaseSelectItem from "@/components/base-select/base-select-item";
import BaseButton from "@/components/base-button/base-button";
import BaseFooter from "@/components/base-footer/base-footer";

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

                        <BaseSelect
                            className="mb-4"
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
                            className="mb-4"
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
                            className="mb-4"
                            type="date"
                            label="Data de efetivação:"
                            value={effectiveDate.toString()}
                            onInput={setEffectiveDate}
                        />
                    </BaseForm>
                </div>
                <div className="flex flex-col items-stretch">
                    <BaseButton
                        className="mb-2"
                        color="primary"
                        onClick={createTransfer}
                    >
                        Salvar
                    </BaseButton>
                    <BaseButton
                        className="mb-4"
                        color="secondary"
                        onClick={() => router.back()}
                    >
                        Cancelar
                    </BaseButton>
                </div>
            </BasePage>
            <BaseFooter />
        </>
    );
}
