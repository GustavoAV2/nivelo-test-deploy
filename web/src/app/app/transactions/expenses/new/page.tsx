import { getAccountsAsync } from "@/app/app/accounts/_actions/account-actions";
import { getCategoriesAsync } from "@/app/app/categories/_actions/category-actions";
import PageTransactionExpenseNewClient from "./form";

export default async function PageTransactionExpenseNew() {
    const categories = await getCategoriesAsync();
    const accounts = await getAccountsAsync();

    const accountOptions = accounts.map((account) => ({ value: account.id, label: account.name }));
    const categoryOptions = categories.map((category) => ({ value: category.id, label: category.name }));

    return <PageTransactionExpenseNewClient categoryOptions={categoryOptions} accountOptions={accountOptions} />;
}
