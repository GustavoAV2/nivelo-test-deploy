import BaseCheck from "@/components/base-check/base-check";
import BaseFooter from "@/components/base-footer/base-footer";
import BaseFooterItem from "@/components/base-footer/base-footer-item";
import BaseLabel from "@/components/base-label/base-label";
import BasePage from "@/components/base-page/base-page";
import BaseSelect from "@/components/base-select/base-select";
import BaseSelectItem from "@/components/base-select/base-select-item";
import { AddCircleIcon, PencilEdit02Icon } from "hugeicons-react";

export default function PageBalances() {
    return (
        <>
            <BasePage className="flex flex-col flex-grow max-w-sm">
                <BaseSelect className="mb-4" display="block" label={"Seleciona saldo:"} value="ID">
                    <BaseSelectItem value={"ID"} description={"Saldo A"} />
                </BaseSelect>
                <BaseLabel>Selecionar contas:</BaseLabel>
                <BaseCheck label={"Conta A"} />
                <BaseCheck label={"Conta B"} />
                <BaseCheck label={"Conta C"} />
            </BasePage>
            <BaseFooter>
                <BaseFooterItem icon={<PencilEdit02Icon />} text={"Editar Saldo"}></BaseFooterItem>
                <BaseFooterItem icon={<AddCircleIcon />} text={"Nova Conta"}></BaseFooterItem>
            </BaseFooter>
        </>
    );
}
