import BalanceAccount from "@/entities/balance/balance-account";
import { SupabaseClient } from "@supabase/supabase-js";
import BaseRepository from "../_base/base-repository";

export default class BalanceAccountRepository extends BaseRepository<BalanceAccount> {
    constructor(supabaseClient: SupabaseClient) {
        super("balance_account", supabaseClient);
    }
}
