"use server";

import ExpenseRepository from "@/repositories/expense/expense-repository";
import IncomeRepository from "@/repositories/income/income-repository";
import { Month } from "@/utils/date/month";
import { createClient } from "@/utils/supabase/server";
import { SupabaseClient } from "@supabase/supabase-js";

export async function getMonthlySummary(month: Month, year: number) {
    const supabaseClient = await createClient();

    const startDate = new Date(year, month);
    const endDate = new Date(year, month);
    endDate.setMonth(endDate.getMonth() + 1);

    const [totalIncome, totalExpenses] = await Promise.all([
        getTotalIncome(supabaseClient, startDate, endDate),
        getTotalExpenses(supabaseClient, startDate, endDate)
    ]);

    const economyPercentage = ((totalIncome - totalExpenses) / totalIncome) * 100;

    return {
        totalIncome,
        totalExpenses,
        economyPercentage
    };
};

async function getTotalIncome(supabaseClient: SupabaseClient, startDate: Date, endDate: Date): Promise<number> {
    const incomeRepository = new IncomeRepository(supabaseClient);

    const incomes = await incomeRepository.findByDateRange(startDate, endDate);
    return incomes.reduce((total, income) => total + income.amount, 0);
}

async function getTotalExpenses(supabaseClient: SupabaseClient, startDate: Date, endDate: Date): Promise<number> {
    const expenseRepository = new ExpenseRepository(supabaseClient);

    const expenses = await expenseRepository.findByDateRange(startDate, endDate);
    return expenses.reduce((total, expense) => total + expense.amount, 0);
}
