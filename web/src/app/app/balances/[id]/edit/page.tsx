import { getAccountsAsync } from "@/app/app/accounts/_actions/account-actions";
import BasePage from "@/layout/base-page/base-page";
import BaseRoot from "@/layout/base-root/base-root";
import { getBalanceByIdAsync } from "../../_actions/balance-actions";
import PageBalanceEditForm from "./form";

interface Props {
    params: Promise<{ id: string; }>;
}

export default async function PageBalanceEdit(props: Props) {
    const params = await props.params;
    const balanceId = params.id;

    const balance = await getBalanceByIdAsync(balanceId);
    const accounts = await getAccountsAsync();
    const accountOptions = accounts.map((account) => ({ value: account.id, label: account.name }));

    const pageBalanceEditForm = () => {
        if (balance) { return <PageBalanceEditForm accountOptions={accountOptions} balance={balance} />; }
        else { return null; }
    };

    return (
        <BaseRoot>
            <BasePage>
                {pageBalanceEditForm()}
            </BasePage>
        </BaseRoot >
    );
}
