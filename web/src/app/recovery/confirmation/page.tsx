import BaseButton from "@/components/base-button/base-button";
import BaseCentralizer from "@/components/base-centralizer/base-centralizer";
import BaseFrame from "@/components/base-frame/base-frame";
import BaseLabel from "@/components/base-label/base-label";
import BasePage from "@/components/base-page/base-page";
import { MailSend01Icon } from "hugeicons-react";
import Link from "next/link";

export default function PageRecoveryConfirmation() {
    return (
        <BaseFrame>
            <BaseCentralizer>
                <BasePage className="max-w-sm">
                    <div className="flex flex-col items-center mb-10">
                        <MailSend01Icon className="mb-6" size={48}></MailSend01Icon>
                        <BaseLabel className="text-lg text-center mb-4">E-mail de recuperação enviado</BaseLabel>
                        <BaseLabel className="text-center">Verifique a sua caixa de e-mail e utilize o link fornecido para redefinir a senha</BaseLabel>
                    </div>
                    <div className="flex flex-col items-center">
                        <Link href="/login">
                            <BaseButton className="mb-4" color={"primary"}>Retornar à tela de login</BaseButton>
                        </Link>
                    </div>
                </BasePage>
            </BaseCentralizer>
        </BaseFrame>
    );
}
