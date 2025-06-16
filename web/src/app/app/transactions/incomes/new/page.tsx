import { getAccountsAsync } from "@/app/app/accounts/_actions/account-actions";
import { getCategoriesAsync } from "@/app/app/categories/_actions/category-actions";
import BasePage from "@/layout/base-page/base-page";
import BaseRoot from "@/layout/base-root/base-root";
import PageTransactionIncomeNewClient from "./form";

export default async function PageTransactionIncomeNew() {
    const categories = await getCategoriesAsync();
    const accounts = await getAccountsAsync();

    const categoryOptions = categories.map((category) => ({
        value: category.id,
        label: category.name
    }));

    const accountOptions = accounts.map((account) => ({
        value: account.id,
        label: account.name
    }));

    return (
        <BaseRoot>
            <BasePage>
                <PageTransactionIncomeNewClient
                    categoryOptions={categoryOptions}
                    accountOptions={accountOptions}
                />
            </BasePage>
        </BaseRoot>
    );
}
