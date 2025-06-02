import { SupabaseClient } from "@supabase/supabase-js";
import Account from "../../entities/account/account";
import BaseRepository from "../_base/base-repository";

export default class AccountRepository extends BaseRepository<Account> {
    constructor(supabaseClient: SupabaseClient) {
        super("account", supabaseClient);
    }

    async findByUserId(user_id: string): Promise<Account[]> {
        const { data, error } = await this.supabaseClient
            .from(this.tableName)
            .select("*")
            .eq("user_id", user_id);

        if (error) throw error;
        return data as Account[];
    }
}
