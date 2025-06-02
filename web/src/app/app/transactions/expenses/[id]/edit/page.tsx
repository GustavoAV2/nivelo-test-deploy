import { getAccountsAsync } from "@/app/app/accounts/_actions/account-actions";
import { getCategoriesAsync } from "@/app/app/categories/_actions/category-actions";
import BaseFooter from "@/components/base-footer/base-footer";
import BasePage from "@/components/base-page/base-page";
import { getExpenseByIdAsync } from "../../../_actions/expense-actions";
import PageExpensesForm from "./form";

interface Props {
    params: { id: string; };
}

export default async function PageExpensesEdit(props: Props) {
    const expenseId = props.params.id;
    const expense = await getExpenseByIdAsync(expenseId);
    const accounts = await getAccountsAsync();
    const categories = await getCategoriesAsync();

    const accountOptions = accounts.map((account) => ({ value: account.id, label: account.name }));
    const categoryOptions = categories.map((category) => ({ value: category.id, label: category.name }));

    const pageexpensesForm = () => {
        if (expense) {
            return <PageExpensesForm
                expense={expense}
                accountOptions={accountOptions}
                categoryOptions={categoryOptions} />;
        }
        else { return null; }
    };

    return (
        <>
            <BasePage className="flex flex-col flex-grow max-w-sm">
                {pageexpensesForm()}
            </BasePage>
            <BaseFooter />
        </>
    );
}
