"use client";

import BaseAlert from "@/components/base-alert/base-alert";
import BaseButton from "@/components/base-button/base-button";
import BaseFloatable from "@/components/base-floatable/base-floatable";
import BaseForm from "@/components/base-form/base-form";
import BaseInput from "@/components/base-input/base-input";
import BaseLink from "@/components/base-link/base-link";
import BaseLogo from "@/components/base-logo/base-logo";
import BaseSubtitle from "@/components/base-subtitle/base-subtitle";
import BaseTextCenter from "@/components/base-text-center/base-text-center";
import BaseText from "@/components/base-text/base-text";
import BaseTitle from "@/components/base-title/base-title";
import BaseFlexColSpaced from "@/layout/base-flex-col-spaced/base-flex-col-spaced";
import BaseFlexCol from "@/layout/base-flex-col/base-flex-col";
import BaseFlexRowCenter from "@/layout/base-flex-row-center/base-flex-row-center";
import BaseRoot from "@/layout/base-root/base-root";
import { GoogleIcon, LogoutCircle01Icon } from "hugeicons-react";
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

        if (errorCode == "invalid_credentials") { setIsInvalidCredentials(true); }
        else { redirect("/error"); }
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

    const invalidCredentialsAlert = () => {
        if (isInvalidCredentials) {
            return <BaseAlert color="danger" text="E-mail ou senha inválidos. Tente novamente." />;
        }
    };

    return (
        <BaseRoot>
            <BaseFloatable>
                <BaseFlexColSpaced>
                    <BaseFlexRowCenter>
                        <BaseLogo />
                    </BaseFlexRowCenter>
                    <BaseFlexRowCenter>
                        <BaseTitle>
                            <BaseTextCenter text="Nivelo" />
                        </BaseTitle>
                    </BaseFlexRowCenter>
                    <BaseFlexCol>
                        <BaseFlexRowCenter>
                            <BaseSubtitle>
                                <BaseTextCenter text="Bem-vindo(a)" />
                            </BaseSubtitle>
                        </BaseFlexRowCenter>
                        <BaseFlexRowCenter>
                            <BaseSubtitle>
                                <BaseTextCenter text="Acesse sua plataforma de finanças" />
                            </BaseSubtitle>
                        </BaseFlexRowCenter>
                    </BaseFlexCol>
                    <BaseForm onSubmit={handleLoginAsync}>
                        <BaseFlexColSpaced>
                            <BaseInput
                                label="E-mail:"
                                type="email"
                                placeholder="Digite seu e-mail"
                                onInput={handleSetEmail}
                                invalidFeedback="Insira um e-mail válido."
                                required
                            />
                            <BaseInput
                                label="Senha:"
                                type="password"
                                placeholder="Digite sua senha"
                                onInput={handleSetPassword}
                                invalidFeedback="Insira uma senha para continuar."
                                required
                            />
                            {invalidCredentialsAlert()}
                            <BaseButton type="submit" color="primary">
                                <BaseTextCenter text="Entrar" icon={<LogoutCircle01Icon />} />
                            </BaseButton>
                        </BaseFlexColSpaced>
                    </BaseForm>
                    <BaseForm onSubmit={loginWithGoogle}>
                        <BaseFlexColSpaced>
                            <BaseButton type="submit" color="secondary">
                                <BaseTextCenter text="Entrar com Google" icon={<GoogleIcon />} />
                            </BaseButton>
                        </BaseFlexColSpaced>
                    </BaseForm>
                    <BaseFlexRowCenter>
                        <Link href="/sign-up">
                            <BaseLink>
                                <BaseText text="Não é cadastrado?" />
                            </BaseLink>
                        </Link>
                    </BaseFlexRowCenter>
                    <BaseFlexRowCenter>
                        <Link href="/recovery/send-email">
                            <BaseLink>
                                <BaseText text="Esqueci minha senha" />
                            </BaseLink>
                        </Link>
                    </BaseFlexRowCenter>
                </BaseFlexColSpaced>
            </BaseFloatable>
        </BaseRoot>
    );
}
