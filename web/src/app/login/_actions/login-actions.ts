"use server";

import { redirect } from "next/navigation";
import { createClient } from "../../../utils/supabase/server";

export async function login(email: string, password: string) {
    const supabase = await createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) { return error.code; }

    redirect("/app/home");
}

export async function loginWithGoogle() {
    const supabase = await createClient();
    const origin = getOriginByEnvironment();

    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
            redirectTo: `${origin}/auth`,
            queryParams: { prompt: "select_account" }
        }
    });

    if (error) { redirect("/error"); }
    if (data.url) { redirect(data.url); }
}

export async function signUp(name: string, email: string, password: string) {
    const supabase = await createClient();
    const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { name } }
    });

    if (error) { redirect("/error");; }

    redirect("/app/home");
}

const getOriginByEnvironment = () => {
    if (process.env.NODE_ENV === "production") {
        return process.env.NODE_URL_PRODUCTION;
    }
    return "http://localhost:3000";
};
