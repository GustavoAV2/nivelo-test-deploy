import BaseButton from "@/components/base-button/base-button";
import BaseFooter from "@/components/base-footer/base-footer";
import BaseForm from "@/components/base-form/base-form";
import BaseInput from "@/components/base-input/base-input";
import BasePage from "@/components/base-page/base-page";

export default function PageBalancesNew() {
    return (
        <>
            <BasePage className="flex flex-col flex-grow max-w-sm">
                <div className="mb-6">
                    <BaseForm>
                        <BaseInput className="mb-2" type={"text"} label={"Nome da visão de saldo:"} />
                    </BaseForm>
                </div>
                <div className="flex flex-col items-stretch">
                    <BaseButton className="mb-2" color="primary">Salvar</BaseButton>
                    <BaseButton className="mb-2" color="secondary">Cancelar</BaseButton>
                </div>
            </BasePage>
            <BaseFooter />
        </>
    );
}
