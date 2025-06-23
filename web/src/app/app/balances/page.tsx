import BaseFooter from "@/components/base-footer/base-footer";
import BaseFooterItem from "@/components/base-footer/base-footer-item";
import BaseTextCenter from "@/components/base-text-center/base-text-center";
import BasePage from "@/layout/base-page/base-page";
import BaseRoot from "@/layout/base-root/base-root";
import { PencilEdit02Icon } from "hugeicons-react";
import Link from "next/link";
import { getBalancesIncludeAccountsAsync } from "./_actions/balance-actions";
import Balance from "./_components/balance";

export default async function PageBalances() {
    const balances = await getBalancesIncludeAccountsAsync();

    if (!balances || balances.length === 0) {
        return (
            <BaseRoot>
                <BasePage>
                    <BaseTextCenter text="Nenhum saldo encontrado" />
                </BasePage>
                <BaseFooter>
                    <Link className="flex flex-grow" href={"balances/new"}>
                        <BaseFooterItem icon={<PencilEdit02Icon />} text={"Novo Saldo"}></BaseFooterItem>
                    </Link>
                </BaseFooter>
            </BaseRoot>
        );
    }
    const balancesDto = balances.map((b) => b.toDto());

    return (
        <BaseRoot>
            <BasePage>
                <Balance balancesModel={balancesDto}></Balance>
            </BasePage>
            <BaseFooter>
                <Link className="flex flex-grow" href={"balances/new"}>
                    <BaseFooterItem icon={<PencilEdit02Icon />} text={"Novo Saldo"}></BaseFooterItem>
                </Link>
            </BaseFooter>
        </BaseRoot>
    );
}
