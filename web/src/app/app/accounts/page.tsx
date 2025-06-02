import BaseCard from "@/components/base-card/base-card";
import BaseFooter from "@/components/base-footer/base-footer";
import BaseFooterItem from "@/components/base-footer/base-footer-item";
import BaseLabel from "@/components/base-label/base-label";
import BasePage from "@/components/base-page/base-page";
import { AddCircleIcon } from "hugeicons-react";
import Link from "next/link";
import { getAccountsAsync } from "./_actions/account-actions";

export default async function PageAccounts() {
    const accounts = await getAccountsAsync();

    const accountsList = () => {
        return accounts.map(account => (
            <Link key={account.id} href={`/app/accounts/${account.id}/edit`}>
                <BaseCard className="mb-5 cursor-pointer" >
                    <BaseLabel className="block text-lg">{account.name}</BaseLabel>
                    <BaseLabel className="block text-base">Conta</BaseLabel>
                </BaseCard>
            </Link>
        ));
    };

    return (
        <>
            <BasePage className="flex flex-col flex-grow max-w-sm">
                {accountsList()}
            </BasePage>
            <BaseFooter>
                <Link href="/app/accounts/new">
                    <BaseFooterItem icon={<AddCircleIcon />} text={"Nova Conta"}></BaseFooterItem>
                </Link>
            </BaseFooter>
        </>
    );
}
