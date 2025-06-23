"use client";

import BaseButton from "@/components/base-button/base-button";
import BaseForm from "@/components/base-form/base-form";
import BaseInput from "@/components/base-input/base-input";
import { useNotification } from "@/components/base-notification/_hooks/base-notification-hook";
import BaseTextCenter from "@/components/base-text-center/base-text-center";
import BaseFlexColSpaced from "@/layout/base-flex-col-spaced/base-flex-col-spaced";
import BasePage from "@/layout/base-page/base-page";
import BaseRoot from "@/layout/base-root/base-root";
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
        <BaseRoot>
            <BasePage>
                <BaseFlexColSpaced>
                    <BaseForm>
                        <BaseInput
                            type="text"
                            label="Nome da Conta:"
                            onInput={setAccountName}
                            required
                        />
                    </BaseForm>
                    <BaseButton color="primary" onClick={handleCreateAccountAsync}>
                        <BaseTextCenter text="Salvar" />
                    </BaseButton>
                    <BaseButton color="secondary" onClick={backToAccountsList}>
                        <BaseTextCenter text="Cancelar" />
                    </BaseButton>
                </BaseFlexColSpaced>
            </BasePage>
        </BaseRoot>
    );
}
