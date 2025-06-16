import BalanceAccount from "@/entities/balance/balance-account";
import { SupabaseClient } from "@supabase/supabase-js";
import BaseRepository from "../_base/base-repository";

export default class BalanceAccountRepository extends BaseRepository<BalanceAccount> {
    constructor(supabaseClient: SupabaseClient) {
        super("balance_account", supabaseClient);
    }

    async findByBalanceId(id: string): Promise<BalanceAccount[]> {
        const { data, error } = await this.supabaseClient
            .from(this.tableName)
            .select("*")
            .eq("balance_id", id);

        if (error) throw error;
        return data as BalanceAccount[];
    }
}
