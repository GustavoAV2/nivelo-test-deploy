"use client";

import BaseButton from "@/components/base-button/base-button";
import BaseForm from "@/components/base-form/base-form";
import BaseInput from "@/components/base-input/base-input";
import BaseMultiSelect from "@/components/base-multi-select/base-multi-select";
import { useNotification } from "@/components/base-notification/_hooks/base-notification-hook";
import BaseSelect from "@/components/base-select/base-select";
import BaseSelectItem from "@/components/base-select/base-select-item";
import BaseTextCenter from "@/components/base-text-center/base-text-center";
import Balance from "@/entities/balance/balance";
import BaseFlexColSpaced from "@/layout/base-flex-col-spaced/base-flex-col-spaced";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { deleteBalanceAsync, editBalanceAsync } from "../../_actions/balance-actions";

interface Props {
    balance: Balance;
    accountOptions: { value: string; label: string; }[];
}

export default function PageBalancesForm({ balance, accountOptions }: Props) {
    const router = useRouter();
    const { showNotification } = useNotification();
    const [balanceName, setBalanceName] = useState(balance.name);
    const [operationType, setOperationType] = useState<"add" | "subtract">(balance.balance_account[0]?.operation_type || "add");
    const [selectedAccountIds, setSelectedAccountIds] = useState<string[]>(balance.balance_account.map((ba) => ba.account_id) || []);

    const handleEditBalanceAsync = async () => {
        await editBalanceAsync(balance.id, balanceName, selectedAccountIds, operationType);
        showNotification("Saldo atualizado!");
        backToBalancesList();
    };

    const handleDeleteBalanceAsync = async () => {
        await deleteBalanceAsync(balance.id);
        showNotification("Saldo deletado!");
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
                        value={balanceName}
                        onInput={setBalanceName}
                        label="Nome do Saldo:"
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
                        <div className="text-sm">
                            Contas selecionadas: {listSelectedAccounts()}
                        </div>
                    )}
                </BaseFlexColSpaced>
            </BaseForm>
            <BaseButton color="primary" onClick={handleEditBalanceAsync}>
                <BaseTextCenter text="Salvar" />
            </BaseButton>
            <BaseButton color="secondary" onClick={backToBalancesList}>
                <BaseTextCenter text="Cancelar" />
            </BaseButton>
            <BaseButton color="danger" onClick={handleDeleteBalanceAsync}>
                <BaseTextCenter text="Excluir Saldo" />
            </BaseButton>
        </BaseFlexColSpaced>
    );
}
