import { getAccountsAsync } from "@/app/app/accounts/_actions/account-actions";
import { getTransferByIdAsync } from "@/app/app/transactions/_actions/transfer-actions";
import BasePage from "@/layout/base-page/base-page";
import BaseRoot from "@/layout/base-root/base-root";
import PageTransactionTransferUpdateClient from "./form";

interface Props {
    params: Promise<{ id: string; }>;
}

export default async function PageTransactionTransferUpdate(props: Props) {
    const params = await props.params;
    const transferId = params.id;
    const transfer = await getTransferByIdAsync(transferId);
    const accounts = await getAccountsAsync();

    const accountOptions = accounts.map((account) => ({
        value: account.id,
        label: account.name
    }));

    return (
        <BaseRoot>
            <BasePage>
                <PageTransactionTransferUpdateClient
                    transfer={transfer}
                    accountOptions={accountOptions}
                />
            </BasePage>
        </BaseRoot>
    );
}
