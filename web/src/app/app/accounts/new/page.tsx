"use client";

import BaseButton from "@/components/base-button/base-button";
import BaseFooter from "@/components/base-footer/base-footer";
import BaseForm from "@/components/base-form/base-form";
import BaseInput from "@/components/base-input/base-input";
import { useNotification } from "@/components/base-notification/_hooks/base-notification-hook";
import BasePage from "@/components/base-page/base-page";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createAccountAsync } from "../_actions/account-actions";

export default function PageAccountsNew() {
    const { showNotification } = useNotification();
    const [accountName, setAccountName] = useState("");
    const router = useRouter();

    const handleCreateAccountAsync = async () => {
        await createAccountAsync(accountName);
        showNotification("Conta criada com sucesso!");
        backToAccountsList();
    };

    const backToAccountsList = () => {
        router.back();
    };

    return (
        <>
            <BasePage className="flex flex-col flex-grow max-w-sm">
                <div className="mb-6">
                    <BaseForm>
                        <BaseInput className="mb-2" type={"text"} label={"Nome da Conta:"} required={true} onInput={setAccountName} />
                    </BaseForm>
                </div>
                <div className="flex flex-col items-stretch">
                    <BaseButton className="mb-2" color="primary" onClick={handleCreateAccountAsync}>Salvar</BaseButton>
                    <BaseButton className="mb-2" color="secondary" onClick={backToAccountsList}>Cancelar</BaseButton>
                </div>
            </BasePage>
            <BaseFooter />
        </>
    );
}
