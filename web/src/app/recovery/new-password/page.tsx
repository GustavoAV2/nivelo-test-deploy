"use client";

import BaseButton from "@/components/base-button/base-button";
import BaseCentralizer from "@/components/base-centralizer/base-centralizer";
import BaseForm from "@/components/base-form/base-form";
import BaseFrame from "@/components/base-frame/base-frame";
import BaseInput from "@/components/base-input/base-input";
import BaseLabel from "@/components/base-label/base-label";
import BaseLink from "@/components/base-link/base-link";
import BasePage from "@/components/base-page/base-page";
import { ResetPasswordIcon } from "hugeicons-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useState } from "react";
import { resetPassword } from "../_actions/recovery-actions";

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

    return (
        <BaseFrame>
            <BaseCentralizer>
                <BasePage className="max-w-sm">
                    <div className="flex flex-col items-center mb-4">
                        <ResetPasswordIcon className="mb-6" size={48}></ResetPasswordIcon>
                        <BaseLabel className="text-lg text-center mb-4">Cadastrar sua nova senha</BaseLabel>
                        <BaseLabel className="text-center">Digite uma nova senha para ser utilizada com a sua conta</BaseLabel>
                    </div>
                    <BaseForm onSubmit={handlePasswordResetAsync}>
                        <div className="mb-10">
                            <BaseInput className="mb-6" type={"password"} label={"Senha:"} required={true} onInput={handleSetPassword}
                                invalidFeedback={"Insira uma senha para continuar."} />
                            <BaseInput type={"password"} label={"Confirmar senha:"} required={true} onInput={handleSetPasswordConfirmation}
                                invalidFeedback={"Insira uma senha para continuar."} />
                            {isPasswordConfirmInvalid &&
                                <BaseLabel className="block mt-2 text-sm text-red-500">
                                    As senhas devem ser iguais.
                                </BaseLabel>
                            }
                            {isPasswordLenghtInvalid &&
                                <BaseLabel className="block mt-2 text-sm text-red-500">
                                    A senha deve ter no mínimo 6 caracteres.
                                </BaseLabel>
                            }
                        </div>
                        <div className="flex flex-col items-center">
                            <BaseButton className="mb-4" color={"primary"}>Cadastrar nova senha</BaseButton>
                        </div>
                    </BaseForm>
                    <div className="flex flex-col items-center">
                        <Link href="/login">
                            <BaseLink>Retornar à tela de login</BaseLink>
                        </Link>
                    </div>
                </BasePage>
            </BaseCentralizer>
        </BaseFrame >
    );
}
