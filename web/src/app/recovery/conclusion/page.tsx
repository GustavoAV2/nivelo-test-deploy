import BaseButton from "@/components/base-button/base-button";
import BaseCentralizer from "@/components/base-centralizer/base-centralizer";
import BaseFrame from "@/components/base-frame/base-frame";
import BaseLabel from "@/components/base-label/base-label";
import BasePage from "@/components/base-page/base-page";
import { CheckmarkCircle02Icon } from "hugeicons-react";
import Link from "next/link";

export default function PageRecoveryConfirmation() {
    return (
        <BaseFrame>
            <BaseCentralizer>
                <BasePage className="max-w-sm">
                    <div className="flex flex-col items-center mb-10">
                        <CheckmarkCircle02Icon className="mb-6" size={48}></CheckmarkCircle02Icon>
                        <BaseLabel className="text-lg text-center mb-4">Sua senha foi alterada</BaseLabel>
                        <BaseLabel className="text-center">Agora você pode fazer login normalmente através da tela de login</BaseLabel>
                    </div>
                    <div className="flex flex-col items-center">
                        <Link href={"/app/home"}>
                            <BaseButton className="mb-4" color={"primary"}>Ir para a tela inicial</BaseButton>
                        </Link>
                    </div>
                </BasePage>
            </BaseCentralizer>
        </BaseFrame>
    );
}
