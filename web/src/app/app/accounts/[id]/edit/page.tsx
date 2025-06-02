import BaseFooter from "@/components/base-footer/base-footer";
import BasePage from "@/components/base-page/base-page";
import { getAccountByIdAsync } from "../../_actions/account-actions";
import PageAccountsForm from "./form";

interface Props {
    params: { id: string; };
}

export default async function PageAccountsEdit(props: Props) {
    const accountId = props.params.id;
    const account = await getAccountByIdAsync(accountId);

    const pageAccountsForm = () => {
        if (account) { return <PageAccountsForm account={account} />; }
        else { return null; }
    };

    return (
        <>
            <BasePage className="flex flex-col flex-grow max-w-sm">
                {pageAccountsForm()}
            </BasePage>
            <BaseFooter />
        </>
    );
}
