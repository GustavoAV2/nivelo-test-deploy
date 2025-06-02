"use client";

import BaseButton from "@/components/base-button/base-button";
import BaseCentralizer from "@/components/base-centralizer/base-centralizer";
import BaseForm from "@/components/base-form/base-form";
import BaseFrame from "@/components/base-frame/base-frame";
import BaseInput from "@/components/base-input/base-input";
import BaseLabel from "@/components/base-label/base-label";
import BaseLink from "@/components/base-link/base-link";
import BasePage from "@/components/base-page/base-page";
import { UserAdd01Icon } from "hugeicons-react";
import Link from "next/link";
import { useState } from "react";
import { signUp } from "../login/_actions/login-actions";

export default function PageSignUp() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [isPasswordConfirmInvalid, setIsPasswordConfirmInvalid] = useState(false);
    const [isPasswordLenghtInvalid, setIsPasswordLenghtInvalid] = useState(false);

    const handleSignUpAsync = async () => {
        validatePasswordConfirmation();
        validatePasswordLenght();
        await signUp(name, email, password);
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
                    <div className="flex flex-col items-center mb-10">
                        <UserAdd01Icon className="mb-6" size={48}></UserAdd01Icon>
                        <BaseLabel className="text-lg text-center">Quero me cadastrar</BaseLabel>
                        <BaseLabel className="text-center">Informe seus dados para fazer um novo cadastro na plataforma</BaseLabel>
                    </div>
                    <BaseForm onSubmit={handleSignUpAsync}>
                        <div className="mb-10">
                            <BaseInput className="mb-6" type={"text"} label={"Nome:"} required={true} onInput={setName}
                                invalidFeedback="Insira um nome válido." />
                            <BaseInput className="mb-6" type={"email"} label={"Email:"} required={true} onInput={setEmail}
                                invalidFeedback="Insira um e-mail válido." />
                            <BaseInput className="mb-6" type={"password"} label={"Senha:"} required={true} onInput={handleSetPassword}
                                invalidFeedback="Insira uma senha para continuar." />
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
                            <BaseButton type="submit" className="mb-4" color={"primary"}>Cadastrar</BaseButton>
                            <Link href="/login">
                                <BaseLink>Retornar à tela de login</BaseLink>
                            </Link>
                        </div>
                    </BaseForm>
                </BasePage>
            </BaseCentralizer>
        </BaseFrame>
    );
}
