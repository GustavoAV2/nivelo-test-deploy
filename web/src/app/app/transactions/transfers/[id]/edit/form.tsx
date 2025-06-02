"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Transfer from "@/entities/transfer/transfer";
import {
    deleteTransferAsync,
    updateTransferAsync
} from "@/app/app/transactions/_actions/transfer-actions";
import BasePage from "@/components/base-page/base-page";
import BaseForm from "@/components/base-form/base-form";
import BaseInput from "@/components/base-input/base-input";
import BaseSelect from "@/components/base-select/base-select";
import BaseSelectItem from "@/components/base-select/base-select-item";
import BaseButton from "@/components/base-button/base-button";
import BaseFooter from "@/components/base-footer/base-footer";

interface Props {
    transfer: Transfer;
    accountOptions: { value: string; label: string }[];
}

export default function PageTransactionTransferNewClient(props: Props) {
    const router = useRouter();
    const [description, setDescription] = useState(props.transfer.description);
    const [amount, setAmount] = useState(props.transfer.amount);
    const [sourceAcountId, setSourceAcountId] = useState(
        props.transfer.source_account_id
    );
    const [targetAccountId, setTargetAccountId] = useState(
        props.transfer.target_account_id
    );
    const initialDateString = props.transfer.effective_date
        ? new Date(props.transfer.effective_date).toISOString().slice(0, 10)
        : new Date().toISOString().slice(0, 10);
    const [effectiveDate, setEffectiveDate] = useState(initialDateString);

    const handleSubmit = async () => {
        await updateTransferAsync(
            props.transfer.id,
            sourceAcountId,
            targetAccountId,
            amount,
            description || "",
            effectiveDate
        );
        alert("Transferência criada com sucesso!");
        router.back();
    };

    const handleDelete = async () => {
        await deleteTransferAsync(props.transfer.id);
        alert("Transferência deletada!");
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
                            value={description || ""}
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
                        onClick={handleSubmit}
                    >
                        Salvar
                    </BaseButton>
                    <BaseButton
                        className="mb-2"
                        color="secondary"
                        onClick={() => router.back()}
                    >
                        Cancelar
                    </BaseButton>
                    <BaseButton color="danger" onClick={handleDelete}>
                        Excluir
                    </BaseButton>
                </div>
            </BasePage>
            <BaseFooter />
        </>
    );
}
