import BaseCentralizer from "@/components/base-centralizer/base-centralizer";
import BaseFrame from "@/components/base-frame/base-frame";
import BasePage from "@/components/base-page/base-page";
import { Alert02Icon } from "hugeicons-react";

export default function PageError() {
    return (
        <BaseFrame>
            <BaseCentralizer>
                <BasePage className="max-w-sm">
                    <div className="flex flex-col items-center">
                        <Alert02Icon className="mb-4" size={48} />
                        <div className="mb-2">Desculpe, ocorreu um erro inesperado.</div>
                        <div className="text-sm">Contate o suporte para obter ajuda.</div>
                    </div>
                </BasePage>
            </BaseCentralizer>
        </BaseFrame>
    );
}
