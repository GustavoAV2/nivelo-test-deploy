import { SupabaseClient } from "@supabase/supabase-js";

export default class BaseRepository<T> {
    protected tableName: string;
    protected supabaseClient: SupabaseClient;

    constructor(tableName: string, supabaseClient: SupabaseClient) {
        this.tableName = tableName;
        this.supabaseClient = supabaseClient;
    }

    async create(data: Partial<T>): Promise<T> {
        const { data: result, error } = await this.supabaseClient
            .from(this.tableName)
            .insert([data])
            .select()
            .single();

        if (error) throw error;
        return result as T;
    }

    async findAll(): Promise<T[]> {
        const { data, error } = await this.supabaseClient
            .from(this.tableName)
            .select("*");

        if (error) throw error;
        return data as T[];
    }

    async findById(id: string): Promise<T> {
        const { data, error } = await this.supabaseClient
            .from(this.tableName)
            .select("*")
            .eq("id", id)
            .maybeSingle();

        if (error) throw error;
        return data as T;
    }

    async update(id: string, updates: Partial<T>): Promise<T> {
        const { data, error } = await this.supabaseClient
            .from(this.tableName)
            .update(updates)
            .eq("id", id)
            .select()
            .single();

        if (error) throw error;
        return data as T;
    }

    async delete(id: string): Promise<void> {
        const { error } = await this.supabaseClient
            .from(this.tableName)
            .delete()
            .eq("id", id);

        if (error) throw error;
    }
}
