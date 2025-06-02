import Expense from "@/entities/expense/expense";
import { SupabaseClient } from "@supabase/supabase-js";
import BaseRepository from "../_base/base-repository";

export default class ExpenseRepository extends BaseRepository<Expense> {
    constructor(supabaseClient: SupabaseClient) {
        super("expense", supabaseClient);
    }

    async findByCategoryId(categoryId: string): Promise<Expense[]> {
        const { data, error } = await this.supabaseClient
            .from(this.tableName)
            .select("*")
            .eq("category_id", categoryId);

        if (error) throw error;
        return data as Expense[];
    }

    async findByDateRange(startDate: Date, endDate?: Date): Promise<Expense[]> {
        let query = this.supabaseClient
            .from(this.tableName)
            .select("*");

        if (startDate) {
            query = query.gte("effective_date", startDate.toISOString());
        }

        if (endDate) {
            query = query.lt("effective_date", endDate.toISOString());
        }

        const { data, error } = await query;

        if (error) throw error;
        return data as Expense[];
    }
}
