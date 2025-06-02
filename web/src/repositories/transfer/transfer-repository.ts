import Transfer from "@/entities/transfer/transfer";
import { SupabaseClient } from "@supabase/supabase-js";
import BaseRepository from "../_base/base-repository";

export default class TransferRepository extends BaseRepository<Transfer> {
    constructor(supabaseClient: SupabaseClient) {
        super("transfer", supabaseClient);
    }

    async findByDateRange(startDate: string, endDate?: string): Promise<Transfer[]> {
        const finalEndDate = endDate || new Date().toISOString();

        const { data, error } = await this.supabaseClient
            .from(this.tableName)
            .select("*")
            .gte("effective_date", startDate)
            .lte("effective_date", finalEndDate);

        if (error) throw error;
        return data as Transfer[];
    }
}
