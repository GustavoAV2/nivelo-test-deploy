import BaseFloatable from "@/components/base-floatable/base-floatable";
import BaseTextCenter from "@/components/base-text-center/base-text-center";
import BaseFlexColSpaced from "@/layout/base-flex-col-spaced/base-flex-col-spaced";
import BaseFlexCol from "@/layout/base-flex-col/base-flex-col";
import BaseFlexRowCenter from "@/layout/base-flex-row-center/base-flex-row-center";
import BaseRoot from "@/layout/base-root/base-root";
import { Alert02Icon } from "hugeicons-react";

export default function PageError() {
    return (
        <BaseRoot>
            <BaseFloatable>
                <BaseFlexColSpaced>
                    <BaseFlexRowCenter>
                        <Alert02Icon size={48} />
                    </BaseFlexRowCenter>
                    <BaseFlexCol>
                        <BaseTextCenter text="Desculpe, ocorreu um erro inesperado." />
                        <BaseTextCenter text="Por favor, tente novamente mais tarde." />
                    </BaseFlexCol>
                </BaseFlexColSpaced>
            </BaseFloatable>
        </BaseRoot>
    );
}
