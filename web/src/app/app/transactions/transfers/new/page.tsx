import { getAccountsAsync } from "@/app/app/accounts/_actions/account-actions";
import PageTransactionTransferNewClient from "./form";

export default async function PageTransactionTransferNew() {
    const accounts = await getAccountsAsync();

    const accountOptions = accounts.map((account) => ({
        value: account.id,
        label: account.name
    }));

    return <PageTransactionTransferNewClient accountOptions={accountOptions} />;
}
