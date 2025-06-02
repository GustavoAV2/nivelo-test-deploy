"use client";

import BaseButton from "@/components/base-button/base-button";
import BaseCentralizer from "@/components/base-centralizer/base-centralizer";
import BaseForm from "@/components/base-form/base-form";
import BaseFrame from "@/components/base-frame/base-frame";
import BaseInput from "@/components/base-input/base-input";
import BaseLabel from "@/components/base-label/base-label";
import BaseLink from "@/components/base-link/base-link";
import BasePage from "@/components/base-page/base-page";
import { Invoice03Icon } from "hugeicons-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useState } from "react";
import { login, loginWithGoogle } from "./_actions/login-actions";

export default function PageLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isInvalidCredentials, setIsInvalidCredentials] = useState(false);

    const handleLoginAsync = async () => {
        const errorCode = await login(email, password);
        if (!errorCode) { return; }

        if (errorCode == "invalid_credentials") {
            setIsInvalidCredentials(true);
        } else {
            redirect("/error");
        }
    };

    const handleSetEmail = (email: string) => {
        resetValidationErrors();
        setEmail(email);
    };

    const handleSetPassword = (password: string) => {
        resetValidationErrors();
        setPassword(password);
    };

    const resetValidationErrors = () => {
        setIsInvalidCredentials(false);
    };

    return (
        <BaseFrame>
            <BaseCentralizer>
                <BasePage className="max-w-sm">
                    <BaseForm onSubmit={handleLoginAsync}>
                        <div className="mb-10 flex flex-col items-center">
                            <Invoice03Icon className="mb-6" size={48} />
                            <BaseLabel className="text-lg">Bem-vindo à</BaseLabel>
                            <BaseLabel className="text-lg">Plataforma de Finanças</BaseLabel>
                        </div>
                        <div className="mb-10">
                            <BaseInput className="mb-6" label="E-mail:" type="email" placeholder="email@email.com" onInput={handleSetEmail}
                                required={true} invalidFeedback="Insira um e-mail válido." />
                            <BaseInput label="Senha:" type="password" placeholder="******" onInput={handleSetPassword}
                                required={true} invalidFeedback="Insira uma senha para continuar." />
                            {isInvalidCredentials &&
                                <BaseLabel className="block mt-2 text-sm text-red-500">
                                    E-mail ou senha inválidos. Tente novamente.
                                </BaseLabel>
                            }
                        </div>
                        <div className="flex flex-col items-stretch">
                            <BaseButton type="submit" className="mb-6" color="primary">Entrar</BaseButton>
                        </div>
                    </BaseForm>
                    <BaseForm onSubmit={() => loginWithGoogle()}>
                        <div className="flex flex-col items-stretch">
                            <BaseButton type="submit" className="mb-10" color="secondary">Entrar com Google</BaseButton>
                        </div>
                    </BaseForm>
                    <div className="flex flex-col items-center">
                        <Link className="mb-3" href="/sign-up">
                            <BaseLink className="self-center mb-4">Não é cadastrado?</BaseLink>
                        </Link>
                        <Link href="/recovery/send-email">
                            <BaseLink className="self-center">Esqueci minha senha</BaseLink>
                        </Link>
                    </div>
                </BasePage>
            </BaseCentralizer>
        </BaseFrame>
    );
}
