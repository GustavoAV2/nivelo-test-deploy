import { SupabaseClient } from "@supabase/supabase-js";
import Income from "../../entities/income/income";
import BaseRepository from "../_base/base-repository";

export default class IncomeRepository extends BaseRepository<Income> {
    constructor(supabaseClient: SupabaseClient) {
        super("income", supabaseClient);
    }

    async findByAccountId(accountId: string): Promise<Income[]> {
        const { data, error } = await this.supabaseClient
            .from(this.tableName)
            .select("*")
            .eq("account_id", accountId);

        if (error) throw error;
        return data as Income[];
    }

    async findByDateRange(startDate: Date, endDate?: Date): Promise<Income[]> {
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
        return data as Income[];
    }
}
