import BaseActions from "@/components/base-actions/base-actions";
import BaseForm from "@/components/base-form/base-form";
import BaseInput from "@/components/base-input/base-input";
import BaseFlexColSpaced from "@/layout/base-flex-col-spaced/base-flex-col-spaced";
import BaseFlexRowSpaced from "@/layout/base-flex-row-spaced/base-flex-row-spaced";
import BasePage from "@/layout/base-page/base-page";
import BaseRoot from "@/layout/base-root/base-root";
import { getAccountsAsync } from "../accounts/_actions/account-actions";
import { getTransactionsAsync } from "./_actions/transaction-actions";
import Transaction from "./_components/transaction/transaction";
import TransactionFilterAccounts from "./_components/transaction/transaction-filter-accounts";
import TransactionFilterTabs from "./_components/transaction/transaction-filter-tabs";
import { TransactionType } from "./_components/transaction/transaction.model";

interface Props {
    searchParams?: Promise<{ type?: TransactionType; accountId: string }>;
}

export default async function PageTransactions(props: Props) {
    const searchParams = await props.searchParams;
    const typeFilter = searchParams?.type;
    const accountFilter = searchParams?.accountId;
    const transactions = await getTransactionsAsync(typeFilter, accountFilter);

    const accounts = await getAccountsAsync();
    const accountOptions = accounts.map((account) => ({ value: account.id, label: account.name }));

    const transactionList = () => {
        return transactions.map((transaction) => (
            <Transaction
                key={`${transaction.type}-${transaction.id}`}
                transactionModel={transaction}
            />
        ));
    };

    return (
        <BaseRoot>
            <BasePage>
                <BaseForm>
                    <BaseFlexColSpaced>
                        <BaseFlexRowSpaced>
                            <BaseInput type="date" label="Data Inicial:" />
                            <BaseInput type="date" label="Data Final:" />
                        </BaseFlexRowSpaced>
                        <TransactionFilterAccounts accountOptions={accountOptions} />
                        <TransactionFilterTabs />
                        {transactionList()}
                    </BaseFlexColSpaced>
                </BaseForm>
            </BasePage >
            <BaseActions />
        </BaseRoot>
    );
}
