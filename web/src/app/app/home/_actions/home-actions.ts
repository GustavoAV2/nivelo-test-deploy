"use server";

import Expense from "@/entities/expense/expense";
import Income from "@/entities/income/income";
import ExpenseRepository from "@/repositories/expense/expense-repository";
import IncomeRepository from "@/repositories/income/income-repository";
import { Month } from "@/utils/date/month";
import { createClient } from "@/utils/supabase/server";
import { SupabaseClient } from "@supabase/supabase-js";

export interface BalanceSummaryModel {
    id: string;
    name: string;
    total_amount: number;
}

interface RpcBalanceSummaryItem {
    balance_id: string;
    balance_name: string;
    total_amount: number;
}

export async function getBalancesSummary(): Promise<BalanceSummaryModel[]> {
    const supabaseClient = await createClient();

    const { data: { user }, error: userError } = await supabaseClient.auth.getUser();
    if (userError || !user) {
        throw new Error(`Usuário não autenticado: ${userError?.message || "Nenhum usuário encontrado."}`);
    }

    const { data, error: rpcError } = await supabaseClient.rpc(
        "get_all_balances_summary",
        { p_user_id: user.id }
    ) as { data: RpcBalanceSummaryItem[] | null; error: Error | null };


    if (rpcError) {
        throw new Error(`Erro ao buscar o resumo dos saldos: ${rpcError.message}`);
    }

    if (data == null) {
        return [];
    }
    const balancesSummary: BalanceSummaryModel[] = data.map((item: RpcBalanceSummaryItem) => ({
        id: item.balance_id,
        name: item.balance_name,
        total_amount: item.total_amount
    }));

    return balancesSummary;
};

export async function getMonthlySummary(month: Month, year: number) {
    const supabaseClient = await createClient();

    const startDate = new Date(year, month);
    const endDate = new Date(year, month);
    endDate.setMonth(endDate.getMonth() + 1);

    const [incomes, expenses] = await Promise.all([
        getIncomesByDate(supabaseClient, startDate, endDate),
        getExpensesByDate(supabaseClient, startDate, endDate)
    ]);

    const totalIncome = incomes.reduce((total, income) => total + income.amount, 0);
    const totalExpenses = expenses.reduce((total, expense) => total + expense.amount, 0);

    const mapCategories = (expense: Expense) => expense.category?.name || "Sem Categoria";
    const categories = new Set(expenses.map(mapCategories));

    return {
        totalIncome,
        totalExpenses,
        categoriesExpenses: Array.from<string>(categories),
        expenses
    };
};

async function getIncomesByDate(supabaseClient: SupabaseClient, startDate: Date, endDate: Date): Promise<Income[]> {
    const incomeRepository = new IncomeRepository(supabaseClient);

    const incomes = await incomeRepository.findByDateRange(startDate, endDate);
    return incomes;
}

async function getExpensesByDate(supabaseClient: SupabaseClient, startDate: Date, endDate: Date): Promise<Expense[]> {
    const expenseRepository = new ExpenseRepository(supabaseClient);

    const expenses = await expenseRepository.findByDateRange(startDate, endDate);
    return expenses;
}
