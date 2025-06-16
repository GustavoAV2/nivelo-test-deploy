import { getAccountsAsync } from "@/app/app/accounts/_actions/account-actions";
import { getCategoriesAsync } from "@/app/app/categories/_actions/category-actions";
import BasePage from "@/layout/base-page/base-page";
import { getExpenseByIdAsync } from "../../../_actions/expense-actions";
import PageExpensesForm from "./form";
import BaseRoot from "@/layout/base-root/base-root";

interface Props {
    params: Promise<{ id: string; }>;
}

export default async function PageExpensesEdit(props: Props) {
    const params = await props.params;
    const expenseId = params.id;
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
                categoryOptions={categoryOptions}
            />;
        }
        else { return null; }
    };

    return (
        <BaseRoot>
            <BasePage>
                {pageexpensesForm()}
            </BasePage>
        </BaseRoot>
    );
}
