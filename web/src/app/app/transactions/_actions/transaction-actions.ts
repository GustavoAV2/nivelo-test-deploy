"use server";

import ExpenseRepository from "@/repositories/expense/expense-repository";
import IncomeRepository from "@/repositories/income/income-repository";
import TransferRepository from "@/repositories/transfer/transfer-repository";
import { createClient } from "@/utils/supabase/server";
import { TransactionModel } from "../_components/transaction/transaction.model";

export async function getTransactionsAsync() {
    const supabaseClient = await createClient();

    const incomeRepository = new IncomeRepository(supabaseClient);
    const incomes = await incomeRepository.findAll();
    const incomeTransactions = TransactionModel.fromIncomes(incomes);

    const transferRepository = new TransferRepository(supabaseClient);
    const transfers = await transferRepository.findAll();
    const transfeTransactions = TransactionModel.fromTransfers(transfers);

    const expenseRepository = new ExpenseRepository(supabaseClient);
    const expenses = await expenseRepository.findAll();
    const expenseTransactions = TransactionModel.fromExpenses(expenses);

    const transactions = [...incomeTransactions, ...transfeTransactions, ...expenseTransactions];
    const transactionSorted = sortTransaction(transactions);

    return transactionSorted;
}

function sortTransaction(transactions: TransactionModel[]) {
    return transactions
        .slice()
        .sort((a, b) => new Date(b.effectiveDate as Date).getTime() - new Date(a.effectiveDate as Date).getTime());
}
