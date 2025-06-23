import BasePage from "@/layout/base-page/base-page";
import BaseRoot from "@/layout/base-root/base-root";
import { getAccountByIdAsync } from "../../_actions/account-actions";
import PageAccountsForm from "./form";

interface Props {
    params: Promise<{ id: string; }>;
}

export default async function PageAccountsEdit(props: Props) {
    const params = await props.params;
    const accountId = params.id;
    const account = await getAccountByIdAsync(accountId);

    const pageAccountsForm = () => {
        if (account) { return <PageAccountsForm account={account} />; }
        else { return null; }
    };

    return (
        <BaseRoot>
            <BasePage>
                {pageAccountsForm()}
            </BasePage >
        </BaseRoot>
    );
}
