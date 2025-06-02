import { getAccountsAsync } from "@/app/app/accounts/_actions/account-actions";
import { getCategoriesAsync } from "@/app/app/categories/_actions/category-actions";
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

    return <PageTransactionIncomeNewClient categoryOptions={categoryOptions} accountOptions={accountOptions} />;
}
