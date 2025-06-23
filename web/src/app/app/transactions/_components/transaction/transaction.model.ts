import Expense from "@/entities/expense/expense";
import Income from "@/entities/income/income";
import Transfer from "@/entities/transfer/transfer";

export enum TransactionType {
    Balance = "Saldo",
    Income = "Receita",
    Expense = "Gasto",
    Transfer = "Transferência"
}

export class TransactionModel {
    private constructor(
        public readonly id: string,
        public readonly amount: number,
        public readonly description: string | null,
        public readonly effectiveDate: Date | null,
        public readonly type: TransactionType
    ) { }

    static fromIncomes(incomes: Income[]) {
        return incomes.map((income) => {
            return new TransactionModel(
                income.id,
                income.amount,
                income.description,
                income.effective_date,
                TransactionType.Income
            );
        });
    }

    static fromTransfers(transfers: Transfer[]) {
        return transfers.map((transfer) => {
            return new TransactionModel(
                transfer.id,
                transfer.amount,
                transfer.description,
                transfer.effective_date,
                TransactionType.Transfer
            );
        });
    }

    static fromExpenses(expenses: Expense[]) {
        return expenses.map((expense) => {
            return new TransactionModel(
                expense.id,
                expense.amount,
                expense.description,
                expense.effective_date,
                TransactionType.Expense
            );
        });
    }
}
