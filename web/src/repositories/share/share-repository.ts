import Share from "@/entities/share/share";
import { SupabaseClient } from "@supabase/supabase-js";
import BaseRepository from "../_base/base-repository";

export default class ShareRepository extends BaseRepository<Share> {
    constructor(supabaseClient: SupabaseClient) {
        super("share", supabaseClient);
    }
}
