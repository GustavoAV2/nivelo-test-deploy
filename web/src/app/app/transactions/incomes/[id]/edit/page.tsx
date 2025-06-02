import { getAccountsAsync } from "@/app/app/accounts/_actions/account-actions";
import { getCategoriesAsync } from "@/app/app/categories/_actions/category-actions";
import BaseFooter from "@/components/base-footer/base-footer";
import BasePage from "@/components/base-page/base-page";
import { getIncomeByIdAsync } from "../../../_actions/income-actions";
import PageTransactionIncomeEditForm from "./form";

interface Props {
    params: { id: string; };
}

export default async function PageIncomesEdit(props: Props) {
    const incomeId = props.params.id;
    const income = await getIncomeByIdAsync(incomeId);
    const accounts = await getAccountsAsync();
    const categories = await getCategoriesAsync();

    const accountOptions = accounts.map((account) => ({ value: account.id, label: account.name }));
    const categoryOptions = categories.map((category) => ({ value: category.id, label: category.name }));

    const pageIncomesForm = () => {
        if (income) {
            return (
                <PageTransactionIncomeEditForm
                    income={income}
                    accountOptions={accountOptions}
                    categoryOptions={categoryOptions}
                />
            );
        }

        else { return null; }
    };

    return (
        <>
            <BasePage className="flex flex-col flex-grow max-w-sm">
                {pageIncomesForm()}
            </BasePage>
            <BaseFooter />
        </>
    );
}
