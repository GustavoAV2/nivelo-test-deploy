"use client";

import BaseButton from "@/components/base-button/base-button";
import BaseForm from "@/components/base-form/base-form";
import BaseInput from "@/components/base-input/base-input";
import { useNotification } from "@/components/base-notification/_hooks/base-notification-hook";
import BaseTextCenter from "@/components/base-text-center/base-text-center";
import Account from "@/entities/account/account";
import BaseFlexColSpaced from "@/layout/base-flex-col-spaced/base-flex-col-spaced";
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
        <BaseFlexColSpaced>
            <BaseForm>
                <BaseInput
                    type="text"
                    label="Nome da Conta:"
                    value={accountName}
                    onInput={setAccountName}
                    required
                />
            </BaseForm>
            <BaseButton color="primary" onClick={handleEditAccountAsync}>
                <BaseTextCenter text="Salvar" />
            </BaseButton>
            <BaseButton color="secondary" onClick={backToAccountsList}>
                <BaseTextCenter text="Cancelar" />
            </BaseButton>
            <BaseButton color="danger" onClick={handleDeleteAccountAsync}>
                <BaseTextCenter text="Excluir Conta" />
            </BaseButton>
        </BaseFlexColSpaced>
    );
}
