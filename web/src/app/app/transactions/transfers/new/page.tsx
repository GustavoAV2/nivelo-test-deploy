import { getAccountsAsync } from "@/app/app/accounts/_actions/account-actions";
import PageTransactionTransferNewClient from "./form";
import BasePage from "@/layout/base-page/base-page";
import BaseRoot from "@/layout/base-root/base-root";

export default async function PageTransactionTransferNew() {
    const accounts = await getAccountsAsync();

    const accountOptions = accounts.map((account) => ({
        value: account.id,
        label: account.name
    }));

    return (
        <BaseRoot>
            <BasePage>
                <PageTransactionTransferNewClient accountOptions={accountOptions} />
            </BasePage>
        </BaseRoot>
    );
}
