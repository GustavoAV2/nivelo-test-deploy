"use client";

import BaseButton from "@/components/base-button/base-button";
import BaseCentralizer from "@/components/base-centralizer/base-centralizer";
import BaseForm from "@/components/base-form/base-form";
import BaseFrame from "@/components/base-frame/base-frame";
import BaseInput from "@/components/base-input/base-input";
import BaseLabel from "@/components/base-label/base-label";
import BaseLink from "@/components/base-link/base-link";
import BasePage from "@/components/base-page/base-page";
import { ForgotPasswordIcon } from "hugeicons-react";
import Link from "next/link";
import { useState } from "react";
import { resetPasswordForEmail } from "../_actions/recovery-actions";

export default function PageRecovery() {
    const [email, setEmail] = useState("");

    return (
        <BaseFrame>
            <BaseCentralizer>
                <BasePage className="max-w-sm">
                    <div className="flex flex-col items-center mb-10">
                        <ForgotPasswordIcon className="mb-6" size={48}></ForgotPasswordIcon>
                        <BaseLabel className="text-lg text-center">Esqueceu a senha?</BaseLabel>
                        <BaseLabel className="text-center">Não se preocupe, enviaremos um e-mail de recuperação para a sua conta</BaseLabel>
                    </div>
                    <BaseForm onSubmit={() => resetPasswordForEmail(email)}>
                        <div className="mb-10">
                            <BaseInput className="mb-6" type={"email"} label={"Email:"} onInput={setEmail} required={true}
                                invalidFeedback={"Insira um e-mail válido"} />
                        </div>
                        <div className="flex flex-col items-stretch">
                            <BaseButton className="mb-4" color={"primary"}>Enviar e-mail de recuperação</BaseButton>
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
