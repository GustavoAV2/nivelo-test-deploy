import BaseButton from "@/components/base-button/base-button";
import BaseFooter from "@/components/base-footer/base-footer";
import BaseFooterItem from "@/components/base-footer/base-footer-item";
import BaseText from "@/components/base-text/base-text";
import BaseFlexColSpaced from "@/layout/base-flex-col-spaced/base-flex-col-spaced";
import BasePage from "@/layout/base-page/base-page";
import BaseRoot from "@/layout/base-root/base-root";
import { AddCircleIcon } from "hugeicons-react";
import Link from "next/link";
import { getAccountsAsync } from "./_actions/account-actions";

export default async function PageAccounts() {
    const accounts = await getAccountsAsync();

    const accountsList = () => {
        return accounts.map(account => (
            <Link key={account.id} href={`/app/accounts/${account.id}/edit`}>
                <BaseButton color="tertiary">
                    <BaseText text={account.name} />
                    <BaseText text="Conta" />
                </BaseButton>
            </Link>
        ));
    };

    return (
        <BaseRoot>
            <BasePage>
                <BaseFlexColSpaced>
                    {accountsList()}
                </BaseFlexColSpaced>
            </BasePage>
            <BaseFooter>
                <Link className="flex flex-grow" href="/app/accounts/new">
                    <BaseFooterItem icon={<AddCircleIcon />} text={"Nova Conta"} />
                </Link>
            </BaseFooter>
        </BaseRoot>
    );
}
