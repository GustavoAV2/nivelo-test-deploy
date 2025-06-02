"use server";

import { getUser } from "@/app/user/_actions/user-actions";
import Income from "@/entities/income/income";
import IncomeRepository from "@/repositories/income/income-repository";
import { toBrazilTime } from "@/utils/date/date";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function getIncomeByIdAsync(id: string): Promise<Income> {
    const supabaseClient = await createClient();

    const incomeRepository = new IncomeRepository(supabaseClient);
    const income = await incomeRepository.findById(id);

    return income;
}

export async function createIncomeAsync(
    category_id: string,
    account_id: string,
    amount: number,
    description: string,
    effectiveDate: Date
) {
    const user = await getUser();
    if (!user) { throw new Error("Failed to get user"); }

    const supabaseClient = await createClient();
    const incomeRepository = new IncomeRepository(supabaseClient);

    const income = Income.create(user.id, account_id, category_id, amount, description, effectiveDate);
    const createdIncome = await incomeRepository.create(income);
    if (!createdIncome) {
        throw new Error("Failed to create income");
    }

    revalidatePath("/app/transactions");
    return createdIncome;
}

export async function editIncomeAsync(
    id: string,
    description: string,
    category_id: string,
    account_id: string,
    amount: number,
    effective_date: Date
) {
    const supabaseClient = await createClient();
    const incomeRepository = new IncomeRepository(supabaseClient);

    const brEffectiveDate = toBrazilTime(effective_date);
    const editedIncome = Income.edit(description, category_id, account_id, amount, brEffectiveDate);
    incomeRepository.update(id, editedIncome);

    revalidatePath("/app/transactions");
    return editedIncome;
}

export async function deleteIncomeAsync(id: string) {
    const supabaseClient = await createClient();
    const incomeRepository = new IncomeRepository(supabaseClient);

    incomeRepository.delete(id);
    revalidatePath("/app/transactions");
}
