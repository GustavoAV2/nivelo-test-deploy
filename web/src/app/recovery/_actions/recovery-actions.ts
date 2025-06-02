"use server";

import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function resetPassword(password: string, code: string) {
    const supabase = await createClient();

    const { error: signInError } = await supabase.auth.exchangeCodeForSession(code);
    const { error: passwordResetError } = await supabase.auth.updateUser({ password });

    if (signInError || passwordResetError) { redirect("/error"); }

    redirect("/recovery/conclusion");
}

export async function resetPasswordForEmail(email: string) {
    const supabase = await createClient();
    const origin = headers().get("origin");

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${origin}/recovery/new-password`
    });

    if (error) { redirect("/error"); }

    redirect("/recovery/confirmation");
}
