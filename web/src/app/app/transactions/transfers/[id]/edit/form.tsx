"use client";

import { deleteTransferAsync, updateTransferAsync } from "@/app/app/transactions/_actions/transfer-actions";
import BaseButton from "@/components/base-button/base-button";
import BaseForm from "@/components/base-form/base-form";
import BaseInput from "@/components/base-input/base-input";
import { useNotification } from "@/components/base-notification/_hooks/base-notification-hook";
import BaseSelect from "@/components/base-select/base-select";
import BaseSelectItem from "@/components/base-select/base-select-item";
import BaseTextCenter from "@/components/base-text-center/base-text-center";
import Transfer from "@/entities/transfer/transfer";
import BaseFlexColSpaced from "@/layout/base-flex-col-spaced/base-flex-col-spaced";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Props {
    transfer: Transfer;
    accountOptions: { value: string; label: string }[];
}

export default function PageTransactionTransferNewClient(props: Props) {
    const router = useRouter();
    const { showNotification } = useNotification();
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
        showNotification("Transferência criada com sucesso!");
        router.back();
    };

    const handleDelete = async () => {
        await deleteTransferAsync(props.transfer.id);
        showNotification("Transferência deletada!");
        router.back();
    };

    return (
        <BaseFlexColSpaced>
            <BaseForm>
                <BaseFlexColSpaced>
                    <BaseInput
                        type="text"
                        label="Descrição:"
                        value={description || ""}
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
            <BaseButton color="primary" onClick={handleSubmit}>
                <BaseTextCenter text="Salvar" />
            </BaseButton>
            <BaseButton color="secondary" onClick={() => router.back()}>
                <BaseTextCenter text="Cancelar" />
            </BaseButton>
            <BaseButton color="danger" onClick={handleDelete}>
                <BaseTextCenter text="Excluir" />
            </BaseButton>
        </BaseFlexColSpaced>
    );
}
