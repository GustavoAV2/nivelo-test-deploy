import { getAccountsAsync } from "@/app/app/accounts/_actions/account-actions";
import { getCategoriesAsync } from "@/app/app/categories/_actions/category-actions";
import BasePage from "@/layout/base-page/base-page";
import { getIncomeByIdAsync } from "../../../_actions/income-actions";
import PageTransactionIncomeEditForm from "./form";
import BaseRoot from "@/layout/base-root/base-root";

interface Props {
    params: Promise<{ id: string; }>;
}

export default async function PageIncomesEdit(props: Props) {
    const params = await props.params;
    const incomeId = params.id;
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
        <BaseRoot>
            <BasePage>
                {pageIncomesForm()}
            </BasePage>
        </BaseRoot>
    );
}
