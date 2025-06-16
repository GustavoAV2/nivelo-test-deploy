"use client";

import BaseAlert from "@/components/base-alert/base-alert";
import BaseButton from "@/components/base-button/base-button";
import BaseFloatable from "@/components/base-floatable/base-floatable";
import BaseForm from "@/components/base-form/base-form";
import BaseInput from "@/components/base-input/base-input";
import BaseLink from "@/components/base-link/base-link";
import BaseSubtitle from "@/components/base-subtitle/base-subtitle";
import BaseTextCenter from "@/components/base-text-center/base-text-center";
import BaseTitle from "@/components/base-title/base-title";
import BaseFlexColSpaced from "@/layout/base-flex-col-spaced/base-flex-col-spaced";
import BaseFlexRowCenter from "@/layout/base-flex-row-center/base-flex-row-center";
import BaseRoot from "@/layout/base-root/base-root";
import { UserAdd01Icon } from "hugeicons-react";
import Link from "next/link";
import { useState } from "react";
import { signUp } from "../login/_actions/login-actions";

export default function PageSignUp() {
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [passwordConfirm, setPasswordConfirm] = useState<string>("");
    const [isPasswordConfirmInvalid, setIsPasswordConfirmInvalid] = useState<boolean>(false);
    const [isPasswordLengthInvalid, setIsPasswordLengthInvalid] = useState<boolean>(false);

    const handleSignUpAsync = async () => {
        validatePasswordConfirmation();
        validatePasswordLenght();
        await signUp(name, email, password);
    };

    const validatePasswordConfirmation = (): void => {
        if (password !== passwordConfirm) {
            setIsPasswordConfirmInvalid(true);
            throw new Error("As senhas devem ser iguais.");
        }
    };

    const validatePasswordLenght = (): void => {
        if (password.length < 6) {
            setIsPasswordLengthInvalid(true);
            throw new Error("A senha deve ter no mínimo 6 caracteres.");
        }
    };

    const handleSetPassword = (password: string) => {
        resetValidationErrors();
        setPassword(password);
    };

    const handleSetPasswordConfirmation = (password: string) => {
        resetValidationErrors();
        setPasswordConfirm(password);
    };

    const resetValidationErrors = (): void => {
        setIsPasswordConfirmInvalid(false);
        setIsPasswordLengthInvalid(false);
    };

    const passwordConfirmErrorAlert = () => {
        if (isPasswordConfirmInvalid) {
            return <BaseAlert color="danger" text="As senhas devem ser iguais." />;
        }
    };

    const passwordLengthErrorAlert = () => {
        if (isPasswordLengthInvalid) {
            return <BaseAlert color="danger" text="A senha deve ter no mínimo 6 caracteres." />;
        }
    };

    return (
        <BaseRoot>
            <BaseFloatable>
                <BaseFlexColSpaced>
                    <BaseFlexRowCenter>
                        <UserAdd01Icon size={48} />
                    </BaseFlexRowCenter>
                    <BaseFlexRowCenter>
                        <BaseTitle>
                            <BaseTextCenter text="Quero me cadastrar" />
                        </BaseTitle>
                    </BaseFlexRowCenter>
                    <BaseFlexRowCenter>
                        <BaseSubtitle>
                            <BaseTextCenter text="Informe seus dados para fazer um novo cadastro na plataforma" />
                        </BaseSubtitle>
                    </BaseFlexRowCenter>
                    <BaseForm onSubmit={handleSignUpAsync}>
                        <BaseFlexColSpaced>
                            <BaseInput
                                type="text"
                                label="Nome:"
                                placeholder="Digite seu nome completo"
                                required
                                onInput={setName}
                                invalidFeedback="Insira um nome válido."
                            />
                            <BaseInput
                                type="email"
                                label="Email:"
                                placeholder="Digite seu e-mail"
                                required
                                onInput={setEmail}
                                invalidFeedback="Insira um e-mail válido."
                            />
                            <BaseInput
                                type="password"
                                label="Senha:"
                                placeholder="Crie uma senha (mínimo 6 caracteres)"
                                required
                                onInput={handleSetPassword}
                                invalidFeedback="Insira uma senha para continuar."
                            />
                            <BaseInput
                                type="password"
                                label="Confirmar senha:"
                                placeholder="Confirme sua senha"
                                required
                                onInput={handleSetPasswordConfirmation}
                                invalidFeedback="Confirme sua senha para continuar."
                            />
                            {passwordConfirmErrorAlert()}
                            {passwordLengthErrorAlert()}
                            <BaseButton type="submit" color="primary">
                                <BaseTextCenter text="Cadastrar" />
                            </BaseButton>
                        </BaseFlexColSpaced>
                    </BaseForm>
                    <BaseFlexRowCenter>
                        <Link href="/login">
                            <BaseLink>
                                <BaseTextCenter text="Já tenho uma conta" />
                            </BaseLink>
                        </Link>
                    </BaseFlexRowCenter>
                </BaseFlexColSpaced>
            </BaseFloatable>
        </BaseRoot>
    );
}
