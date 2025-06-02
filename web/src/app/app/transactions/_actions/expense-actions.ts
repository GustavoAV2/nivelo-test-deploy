"use server";

import { getUser } from "@/app/user/_actions/user-actions";
import Expense from "@/entities/expense/expense";
import ExpenseRepository from "@/repositories/expense/expense-repository";
import { toBrazilTime } from "@/utils/date/date";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function getExpenseByIdAsync(id: string): Promise<Expense> {
    const supabaseClient = await createClient();

    const expenseRepository = new ExpenseRepository(supabaseClient);
    const expense = await expenseRepository.findById(id);

    return expense;
}

export async function createExpenseAsync(
    category_id: string,
    account_id: string,
    amount: number,
    description: string,
    effectiveDate: Date
) {
    const user = await getUser();
    if (!user) { throw new Error("Failed to get user"); }

    const supabaseClient = await createClient();
    const expenseRepository = new ExpenseRepository(supabaseClient);

    const expense = Expense.create(user.id, account_id, category_id, amount, description, effectiveDate);
    const createdexpense = await expenseRepository.create(expense);
    if (!createdexpense) { throw new Error("Failed to create expense"); }

    revalidatePath("/app/transactions");
    return createdexpense;
}

export async function editExpenseAsync(
    id: string,
    description: string,
    category_id: string,
    account_id: string,
    amount: number,
    effective_date: Date
) {
    const supabaseClient = await createClient();
    const expenseRepository = new ExpenseRepository(supabaseClient);

    const brEffectiveDate = toBrazilTime(effective_date);
    const editedExpense = Expense.edit(description, category_id, account_id, amount, brEffectiveDate);
    expenseRepository.update(id, editedExpense);

    revalidatePath("/app/transactions");
    return editedExpense;
}

export async function deleteExpenseAsync(id: string) {
    const supabaseClient = await createClient();
    const expenseRepository = new ExpenseRepository(supabaseClient);

    expenseRepository.delete(id);
    revalidatePath("/app/transactions");
}
