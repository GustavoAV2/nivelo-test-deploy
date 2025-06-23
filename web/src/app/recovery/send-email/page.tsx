"use client";

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
import { ForgotPasswordIcon } from "hugeicons-react";
import Link from "next/link";
import { useState } from "react";
import { resetPasswordForEmail } from "../_actions/recovery-actions";

export default function PageRecovery() {
    const [email, setEmail] = useState("");

    const handleSendRecoveryEmail = async () => {
        await resetPasswordForEmail(email);
    };

    return (
        <BaseRoot>
            <BaseFloatable>
                <BaseFlexColSpaced>
                    <BaseFlexRowCenter>
                        <ForgotPasswordIcon size={48} />
                    </BaseFlexRowCenter>
                    <BaseFlexRowCenter>
                        <BaseTitle>
                            <BaseTextCenter text="Esqueceu a senha?" />
                        </BaseTitle>
                    </BaseFlexRowCenter>
                    <BaseFlexRowCenter>
                        <BaseSubtitle>
                            <BaseTextCenter text="Não se preocupe, enviaremos um e-mail de recuperação para a sua conta" />
                        </BaseSubtitle>
                    </BaseFlexRowCenter>
                    <BaseForm onSubmit={handleSendRecoveryEmail}>
                        <BaseFlexColSpaced>
                            <BaseInput
                                type="email"
                                label="Email:"
                                placeholder="Digite seu e-mail"
                                onInput={setEmail}
                                required
                                invalidFeedback="Insira um e-mail válido"
                            />
                            <BaseButton type="submit" color="primary">
                                <BaseTextCenter text="Enviar e-mail de recuperação" />
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
