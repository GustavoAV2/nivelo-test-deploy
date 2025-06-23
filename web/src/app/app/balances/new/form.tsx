"use client";

import BaseButton from "@/components/base-button/base-button";
import BaseForm from "@/components/base-form/base-form";
import BaseInput from "@/components/base-input/base-input";
import BaseMultiSelect from "@/components/base-multi-select/base-multi-select";
import { useNotification } from "@/components/base-notification/_hooks/base-notification-hook";
import BaseSelect from "@/components/base-select/base-select";
import BaseSelectItem from "@/components/base-select/base-select-item";
import BaseTextCenter from "@/components/base-text-center/base-text-center";
import BaseFlexColSpaced from "@/layout/base-flex-col-spaced/base-flex-col-spaced";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createBalanceAsync } from "../_actions/balance-actions";

interface Props {
    accountOptions: { value: string; label: string; }[];
}

export default function PageBalancesForm({ accountOptions }: Props) {
    const { showNotification } = useNotification();
    const [balanceName, setBalanceName] = useState("");
    const [selectedAccountIds, setSelectedAccountIds] = useState<string[]>([]);
    const [operationType, setOperationType] = useState<"add" | "subtract">("add");
    const router = useRouter();

    const handleCreateBalanceAsync = async () => {

        await createBalanceAsync(balanceName, selectedAccountIds, operationType);
        showNotification("Saldo criado!");
        backToBalancesList();
    };

    const listSelectedAccounts = () => {
        return selectedAccountIds.map((id) => {
            const account = accountOptions.find((a) => a.value === id);
            return account ? account.label : "Conta não encontrada";
        }).join(", ");
    };

    const backToBalancesList = () => router.back();

    return (
        <BaseFlexColSpaced>
            <BaseForm>
                <BaseFlexColSpaced>
                    <BaseInput
                        type="text"
                        label="Nome da Saldo:"
                        value={balanceName}
                        onInput={setBalanceName}
                    />
                    <BaseSelect
                        display="block"
                        label="Selecione o tipo:"
                        onChange={(value) => setOperationType(value as "add" | "subtract")}
                        value={operationType}
                    >
                        <BaseSelectItem key="add" description="Adição" value="add" />
                        <BaseSelectItem key="subtract" description="Subtração" value="subtract" />
                    </BaseSelect>
                    <BaseMultiSelect
                        items={accountOptions.map((a) => ({ key: a.value, label: a.label }))}
                        selectedKeys={selectedAccountIds}
                        onChange={setSelectedAccountIds}
                    />
                    <hr />
                    {selectedAccountIds.length > 0 && (
                        <p className="mt-4 text-sm text-gray-300">
                            Contas selecionadas: {listSelectedAccounts()}
                        </p>
                    )}
                </BaseFlexColSpaced>
            </BaseForm>
            <BaseButton color="primary" onClick={handleCreateBalanceAsync}>
                <BaseTextCenter text="Criar" />
            </BaseButton>
            <BaseButton color="secondary" onClick={backToBalancesList}>
                <BaseTextCenter text="Cancelar" />
            </BaseButton>
        </BaseFlexColSpaced>
    );
}
