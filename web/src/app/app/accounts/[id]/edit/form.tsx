"use client";

import BaseButton from "@/components/base-button/base-button";
import BaseForm from "@/components/base-form/base-form";
import BaseInput from "@/components/base-input/base-input";
import { useNotification } from "@/components/base-notification/_hooks/base-notification-hook";
import Account from "@/entities/account/account";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { deleteAccountAsync, editAccountAsync } from "../../_actions/account-actions";

interface Props {
    account: Account;
}

export default function PageAccountsForm(props: Props) {
    const router = useRouter();
    const { showNotification } = useNotification();
    const [accountName, setAccountName] = useState(props.account.name);

    const handleEditAccountAsync = async () => {
        await editAccountAsync(props.account.id, accountName);
        showNotification("Conta atualizada!");
        backToAccountsList();
    };

    const handleDeleteAccountAsync = async () => {
        await deleteAccountAsync(props.account.id);
        showNotification("Conta deletada!");
        backToAccountsList();
    };

    const backToAccountsList = () => {
        router.back();
    };

    return (
        <div>
            <div className="mb-6">
                <BaseForm>
                    <BaseInput className="mb-2" required={true} type={"text"} value={accountName} onInput={setAccountName} label={"Nome da Conta:"} />
                </BaseForm>
            </div>
            <div className="flex flex-col items-stretch">
                <BaseButton className="mb-2" color="primary" onClick={handleEditAccountAsync}>
                    Salvar
                </BaseButton>
                <BaseButton className="mb-2" color="secondary" onClick={backToAccountsList}>
                    Cancelar
                </BaseButton>
                <BaseButton color="danger" onClick={handleDeleteAccountAsync}>
                    Excluir Conta
                </BaseButton>
            </div>
        </div>
    );
}
