"use server";

import ExpenseRepository from "@/repositories/expense/expense-repository";
import IncomeRepository from "@/repositories/income/income-repository";
import TransferRepository from "@/repositories/transfer/transfer-repository";
import { createClient } from "@/utils/supabase/server";
import { SupabaseClient } from "@supabase/supabase-js";
import { TransactionModel, TransactionType } from "../_components/transaction/transaction.model";

export async function getTransactionsAsync(typeFilter?: TransactionType | null) {
    const supabaseClient = await createClient();
    let transactions: TransactionModel[] = [];
    console.log("Fetching transactions with type filter:", typeFilter);

    switch (typeFilter) {
        case TransactionType.Income:
            transactions = await getIncomeTransactionsAsync(supabaseClient);
            break;
        case TransactionType.Expense:
            transactions = await getExpenseTransactionsAsync(supabaseClient);
            break;
        case TransactionType.Transfer:
            transactions = await getTransferTransactionsAsync(supabaseClient);
            break;
        default:
            const incomeTransactions = await getIncomeTransactionsAsync(supabaseClient);
            const transferTransactions = await getTransferTransactionsAsync(supabaseClient);
            const expenseTransactions = await getExpenseTransactionsAsync(supabaseClient);
            transactions = [...incomeTransactions, ...transferTransactions, ...expenseTransactions];
            break;
    }

    return sortTransaction(transactions);
}

async function getExpenseTransactionsAsync(supabaseClient: SupabaseClient): Promise<TransactionModel[]> {
    const expenseRepository = new ExpenseRepository(supabaseClient);
    const expenses = await expenseRepository.findAll();
    return TransactionModel.fromExpenses(expenses);
}

async function getIncomeTransactionsAsync(supabaseClient: SupabaseClient): Promise<TransactionModel[]> {
    const incomeRepository = new IncomeRepository(supabaseClient);
    const incomes = await incomeRepository.findAll();
    return TransactionModel.fromIncomes(incomes);
}

async function getTransferTransactionsAsync(supabaseClient: SupabaseClient): Promise<TransactionModel[]> {
    const transferRepository = new TransferRepository(supabaseClient);
    const transfers = await transferRepository.findAll();
    return TransactionModel.fromTransfers(transfers);
}

function sortTransaction(transactions: TransactionModel[]) {
    return transactions
        .slice()
        .sort((a, b) => new Date(b.effectiveDate as Date).getTime() - new Date(a.effectiveDate as Date).getTime());
}
