import BaseFooterLink from "@/components/base-footer-link/base-footer-link";
import BaseForm from "@/components/base-form/base-form";
import BaseInput from "@/components/base-input/base-input";
import BasePage from "@/components/base-page/base-page";
import BaseTab from "@/components/base-tab/base-tab";
import BaseTabItem from "@/components/base-tab/base-tab-item";
import { getTransactionsAsync } from "./_actions/transaction-actions";
import Transaction from "./_components/transaction/transaction";

export default async function PageTransactions() {
    const transactions = await getTransactionsAsync();

    const transactionList = () => {
        return transactions.map((transaction) => (
            <Transaction key={`${transaction.type}-${transaction.id}`} transactionModel={transaction} />
        ));
    };

    return (
        <>
            <BasePage className="flex flex-col flex-grow max-w-sm">
                <BaseForm>
                    <div className="flex flex-row mb-6 gap-3">
                        <BaseInput className="mb-4" type={"date"} label={"Data Inicial:"} />
                        <BaseInput className="mb-4" type={"date"} label={"Data Final:"} />
                    </div>
                    <BaseTab className="mb-6">
                        <BaseTabItem className="w-24">Receita</BaseTabItem>
                        <BaseTabItem className="w-24">Transf.</BaseTabItem>
                        <BaseTabItem className="w-24">Despesa</BaseTabItem>
                    </BaseTab>
                    <div className="mb-6">
                        {transactionList()}
                    </div>
                </BaseForm>
            </BasePage>

            <BaseFooterLink />
        </>
    );
}
