import BaseButton from "@/components/base-button/base-button";
import BaseFloatable from "@/components/base-floatable/base-floatable";
import BaseSubtitle from "@/components/base-subtitle/base-subtitle";
import BaseTextCenter from "@/components/base-text-center/base-text-center";
import BaseTitle from "@/components/base-title/base-title";
import BaseFlexColSpaced from "@/layout/base-flex-col-spaced/base-flex-col-spaced";
import BaseFlexRowCenter from "@/layout/base-flex-row-center/base-flex-row-center";
import BaseRoot from "@/layout/base-root/base-root";
import { MailSend01Icon } from "hugeicons-react";
import Link from "next/link";

export default function PageRecoveryConfirmation() {
    return (
        <BaseRoot>
            <BaseFloatable>
                <BaseFlexColSpaced>
                    <BaseFlexRowCenter>
                        <MailSend01Icon size={48} />
                    </BaseFlexRowCenter>
                    <BaseFlexRowCenter>
                        <BaseTitle>
                            <BaseTextCenter text="E-mail de recuperação enviado" />
                        </BaseTitle>
                    </BaseFlexRowCenter>
                    <BaseFlexRowCenter>
                        <BaseSubtitle>
                            <BaseTextCenter text="Verifique a sua caixa de e-mail e utilize o link fornecido para redefinir a senha" />
                        </BaseSubtitle>
                    </BaseFlexRowCenter>
                    <Link href="/login">
                        <BaseButton color="primary">
                            <BaseTextCenter text="Retornar à tela de login" />
                        </BaseButton>
                    </Link>
                </BaseFlexColSpaced>
            </BaseFloatable>
        </BaseRoot>
    );
}
