import { SupabaseClient } from "@supabase/supabase-js";
import Balance from "../../entities/balance/balance";
import BaseRepository from "../_base/base-repository";

export default class BalanceRepository extends BaseRepository<Balance> {
    constructor(supabaseClient: SupabaseClient) {
        super("balance", supabaseClient);
    }

    async findByIdIncludeAccounts(id: string): Promise<Balance> {
        const { data, error } = await this.supabaseClient
            .from(this.tableName)
            .select(`
                *,
                balance_account(*, account(*))
            `)
            .eq("id", id)
            .maybeSingle();

        if (error) throw error;
        return data as Balance;
    }

    async findByUserId(user_id: string): Promise<Balance> {
        const { data, error } = await this.supabaseClient
            .from(this.tableName)
            .select("*")
            .eq("user_id", user_id)
            .maybeSingle();

        if (error) throw error;
        return data as Balance;
    }

    async findAllIncludeAccounts(): Promise<Balance[]> {
        const { data, error } = await this.supabaseClient
            .from(this.tableName)
            .select(`
                *,
                balance_account(*, account(*))
            `);

        if (error) throw error;
        return data as Balance[];
    }
}
