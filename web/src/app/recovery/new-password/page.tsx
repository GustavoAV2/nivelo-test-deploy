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
import { ResetPasswordIcon } from "hugeicons-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useState } from "react";
import { resetPassword } from "../_actions/recovery-actions";
import BaseRoot from "@/layout/base-root/base-root";

export default function RecoveryNewPassword() {
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [isPasswordConfirmInvalid, setIsPasswordConfirmInvalid] = useState(false);
    const [isPasswordLenghtInvalid, setIsPasswordLenghtInvalid] = useState(false);

    const handlePasswordResetAsync = async () => {
        const searchParams = new URLSearchParams(window.location.search);
        const code = searchParams.get("code");

        if (!code) { redirect("/error"); }

        validatePasswordConfirmation();
        validatePasswordLenght();

        await resetPassword(password, code);
    };

    const validatePasswordConfirmation = () => {
        if (password !== passwordConfirm) {
            setIsPasswordConfirmInvalid(true);
            throw new Error("As senhas devem ser iguais.");
        }
    };

    const validatePasswordLenght = () => {
        if (password.length < 6 || passwordConfirm.length < 6) {
            setIsPasswordLenghtInvalid(true);
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

    const resetValidationErrors = () => {
        setIsPasswordConfirmInvalid(false);
        setIsPasswordLenghtInvalid(false);
    };

    const passwordConfirmInvalidAlert = () => {
        if (isPasswordConfirmInvalid) {
            return <BaseAlert color="danger" text="As senhas devem ser iguais." />;
        }
    };

    const passwordLenghtInvalidAlert = () => {
        if (isPasswordLenghtInvalid) {
            return <BaseAlert color="danger" text="A senha deve ter no mínimo 6 caracteres." />;
        }
    };

    return (
        <BaseRoot>
            <BaseFloatable>
                <BaseFlexColSpaced>
                    <BaseFlexRowCenter>
                        <ResetPasswordIcon size={48} />
                    </BaseFlexRowCenter>
                    <BaseFlexRowCenter>
                        <BaseTitle>
                            <BaseTextCenter text="Cadastrar sua nova senha" />
                        </BaseTitle>
                    </BaseFlexRowCenter>
                    <BaseFlexRowCenter>
                        <BaseSubtitle>
                            <BaseTextCenter text="Digite uma nova senha para ser utilizada com a sua conta" />
                        </BaseSubtitle>
                    </BaseFlexRowCenter>
                    <BaseForm onSubmit={handlePasswordResetAsync}>
                        <BaseFlexColSpaced>
                            <BaseInput
                                type="password"
                                label="Senha:"
                                placeholder="Digite sua nova senha"
                                required
                                onInput={handleSetPassword}
                                invalidFeedback="Insira uma senha para continuar."
                            />
                            <BaseInput
                                type="password"
                                label="Confirmar senha:"
                                placeholder="Confirme sua nova senha"
                                required
                                onInput={handleSetPasswordConfirmation}
                                invalidFeedback="Insira uma senha para continuar."
                            />
                            {passwordConfirmInvalidAlert()}
                            {passwordLenghtInvalidAlert()}
                            <BaseButton type="submit" color="primary">
                                <BaseTextCenter text="Cadastrar nova senha" />
                            </BaseButton>
                        </BaseFlexColSpaced>
                    </BaseForm>
                    <BaseFlexRowCenter>
                        <Link href="/login">
                            <BaseLink>
                                <BaseTextCenter text="Retornar à tela de login" />
                            </BaseLink>
                        </Link>
                    </BaseFlexRowCenter>
                </BaseFlexColSpaced>
            </BaseFloatable>
        </BaseRoot>
    );
}
