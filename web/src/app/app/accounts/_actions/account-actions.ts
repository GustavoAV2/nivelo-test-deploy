"use server";

import { getUser } from "@/app/user/_actions/user-actions";
import Account from "@/entities/account/account";
import AccountRepository from "@/repositories/account/account-repository";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function getAccountsAsync() {
    const supabaseClient = await createClient();

    const accountRepository = new AccountRepository(supabaseClient);
    const accounts = await accountRepository.findAll();
    if (!accounts) { throw new Error("Accounts not found"); }

    return accounts;
};

export async function getAccountByIdAsync(id: string) {
    const supabaseClient = await createClient();

    const accountRepository = new AccountRepository(supabaseClient);
    const accountFound = await accountRepository.findById(id);

    return accountFound;
};

export async function createAccountAsync(accountName: string) {
    const supabaseClient = await createClient();
    const user = await getUser();

    if (!user) { throw new Error("Usuário não autenticado!"); }

    const account = Account.create(accountName, user.id);

    const accountRepository = new AccountRepository(supabaseClient);
    const accountCreated = await accountRepository.create(account);
    revalidatePath("/app/accounts", "page");

    if (!accountCreated) { throw new Error("Não foi possível criar a conta!"); }
};

export async function editAccountAsync(id: string, accountName: string) {
    const supabaseClient = await createClient();

    const accountRepository = new AccountRepository(supabaseClient);
    const account = Account.edit(id, accountName);
    const accountUpdated = await accountRepository.update(id, account);
    revalidatePath("/app/accounts", "page");

    return accountUpdated;
}

export async function deleteAccountAsync(id: string) {
    const supabaseClient = await createClient();

    const accountRepository = new AccountRepository(supabaseClient);
    await accountRepository.delete(id);
    revalidatePath("/app/accounts", "page");
}
