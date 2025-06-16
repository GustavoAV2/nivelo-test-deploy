import BaseButton from "@/components/base-button/base-button";
import BaseFloatable from "@/components/base-floatable/base-floatable";
import BaseSubtitle from "@/components/base-subtitle/base-subtitle";
import BaseTextCenter from "@/components/base-text-center/base-text-center";
import BaseTitle from "@/components/base-title/base-title";
import BaseFlexColSpaced from "@/layout/base-flex-col-spaced/base-flex-col-spaced";
import BaseFlexRowCenter from "@/layout/base-flex-row-center/base-flex-row-center";
import BaseRoot from "@/layout/base-root/base-root";
import { CheckmarkCircle02Icon } from "hugeicons-react";
import Link from "next/link";

export default function PageRecoveryConclusion() {
    return (
        <BaseRoot>
            <BaseFloatable>
                <BaseFlexColSpaced>
                    <BaseFlexRowCenter>
                        <CheckmarkCircle02Icon size={48} />
                    </BaseFlexRowCenter>
                    <BaseFlexRowCenter>
                        <BaseTitle>
                            <BaseTextCenter text="Sua senha foi alterada" />
                        </BaseTitle>
                    </BaseFlexRowCenter>
                    <BaseFlexRowCenter>
                        <BaseSubtitle>
                            <BaseTextCenter text="Agora você pode fazer login normalmente através da tela de login" />
                        </BaseSubtitle>
                    </BaseFlexRowCenter>
                    <BaseFlexRowCenter>
                        <Link href={"/app/home"}>
                            <BaseButton color={"primary"}>
                                <BaseTextCenter text="Ir para a tela inicial" />
                            </BaseButton>
                        </Link>
                    </BaseFlexRowCenter>
                </BaseFlexColSpaced>
            </BaseFloatable>
        </BaseRoot>
    );
}
