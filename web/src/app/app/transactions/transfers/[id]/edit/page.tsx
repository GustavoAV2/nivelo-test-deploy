import { getAccountsAsync } from "@/app/app/accounts/_actions/account-actions";
import PageTransactionTransferUpdateClient from "./form";
import { getTransferByIdAsync } from "@/app/app/transactions/_actions/transfer-actions";

interface Props {
    params: { id: string; };
}

export default async function PageTransactionTransferUpdate(props: Props) {
    const accounts = await getAccountsAsync();
    const transfer = await getTransferByIdAsync(props.params.id);

    const accountOptions = accounts.map((account) => ({
        value: account.id,
        label: account.name
    }));

    return <PageTransactionTransferUpdateClient transfer={transfer} accountOptions={accountOptions} />;
}
