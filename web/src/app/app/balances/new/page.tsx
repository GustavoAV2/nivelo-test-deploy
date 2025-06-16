import { getAccountsAsync } from "@/app/app/accounts/_actions/account-actions";
import BasePage from "@/layout/base-page/base-page";
import BaseRoot from "@/layout/base-root/base-root";
import PageBalanceNewForm from "./form";

export default async function PageBalanceNew() {
    const accounts = await getAccountsAsync();
    const accountOptions = accounts.map((account) => ({ value: account.id, label: account.name }));

    return (
        <BaseRoot>
            <BasePage>
                <PageBalanceNewForm accountOptions={accountOptions} />
            </BasePage>
        </BaseRoot >
    );
}
