import Category from "@/entities/category/category";
import { SupabaseClient } from "@supabase/supabase-js";
import BaseRepository from "../_base/base-repository";

export default class CategoryRepository extends BaseRepository<Category> {
    constructor(supabaseClient: SupabaseClient) {
        super("category", supabaseClient);
    }
}
