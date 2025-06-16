"use server";

import { getUser } from "@/app/user/_actions/user-actions";
import Balance from "@/entities/balance/balance";
import BalanceAccount from "@/entities/balance/balance-account";
import BalanceAccountRepository from "@/repositories/balance/balance-account-repository";
import BalanceRepository from "@/repositories/balance/balance-repository";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { BalanceModel } from "../_components/balance.model";

export async function getBalancesAsync(): Promise<BalanceModel[]> {
    const supabaseClient = await createClient();

    const balanceRepository = new BalanceRepository(supabaseClient);
    const balancesFound = await balanceRepository.findAll();
    if (!balancesFound) { throw new Error("Saldos não encontrados!"); }

    const balancesModels = BalanceModel.fromBalances(balancesFound);
    return balancesModels;
}

export async function getBalancesIncludeAccountsAsync(): Promise<BalanceModel[]> {
    const supabaseClient = await createClient();

    const balanceRepository = new BalanceRepository(supabaseClient);
    const balancesFound = await balanceRepository.findAllIncludeAccounts();
    if (!balancesFound) { throw new Error("Saldos não encontrados!"); }

    const balancesModels = BalanceModel.fromBalancesIncludeAccounts(balancesFound);
    return balancesModels;
}

export async function getBalancesAccountAsync(): Promise<BalanceModel[]> {
    const supabaseClient = await createClient();

    const balanceRepository = new BalanceRepository(supabaseClient);
    const balancesFound = await balanceRepository.findAllIncludeAccounts();
    if (!balancesFound) { throw new Error("Contas vinculadas a saldo não encontradas!"); }

    const balancesModels = BalanceModel.fromBalances(balancesFound);
    return balancesModels;
}

export async function getBalanceByIdAsync(id: string): Promise<Balance> {
    const supabaseClient = await createClient();

    const balanceRepository = new BalanceRepository(supabaseClient);
    const BalanceFound = await balanceRepository.findByIdIncludeAccounts(id);

    return BalanceFound;
}

export async function createBalanceAsync(balanceName: string, accountIds: string[], type: "add" | "subtract"): Promise<void> {
    const supabaseClient = await createClient();
    const user = await getUser();

    if (user == null) { throw new Error("Usuário não autenticado!"); }

    const balanceRepository = new BalanceRepository(supabaseClient);
    const balanceAccountRepository = new BalanceAccountRepository(supabaseClient);

    const balance = Balance.create(balanceName, user?.id);
    const balanceCreated = await balanceRepository.create(balance);

    if (!balanceCreated) { throw new Error("Nao foi possivel criar o saldo!"); }

    const balancesAccounts: Partial<BalanceAccount>[] = [];
    accountIds.forEach(async (accountId) => {
        const balanceAccount = BalanceAccount.create(balanceCreated.id, accountId, type);
        balancesAccounts.push(balanceAccount);
    });

    balancesAccounts.forEach(async (balanceAccount) => {
        await balanceAccountRepository.create(balanceAccount);
    });

    revalidatePath("/app/balances");
}

export async function editBalanceAsync(id: string, balanceName: string, selectedAccountIds: string[], type: "add" | "subtract"): Promise<Balance> {
    const supabaseClient = await createClient();

    const balanceRepository = new BalanceRepository(supabaseClient);
    const balanceAccountRepository = new BalanceAccountRepository(supabaseClient);

    const balance = Balance.edit(balanceName);
    const BalanceUpdated = await balanceRepository.update(id, balance);

    const balanceAccounts = await balanceAccountRepository.findByBalanceId(id);
    for (const balanceAccount of balanceAccounts) {
        if (!selectedAccountIds.includes(balanceAccount.account_id)) {
            await balanceAccountRepository.delete(balanceAccount.id);
        }
    }
    for (const accountId of selectedAccountIds) {
        if (!balanceAccounts.some(ba => ba.account_id === accountId)) {
            const newBalanceAccount = BalanceAccount.create(id, accountId, type);
            await balanceAccountRepository.create(newBalanceAccount);
        }
        else {
            const existingBalanceAccount = balanceAccounts.find(ba => ba.account_id === accountId);
            if (existingBalanceAccount && existingBalanceAccount.operation_type !== type) {
                await balanceAccountRepository.update(existingBalanceAccount.id, { operation_type: type });
            }
        }
    }

    revalidatePath("/app/balances", "page");
    return BalanceUpdated;
}

export async function deleteBalanceAsync(id: string): Promise<void> {
    const supabaseClient = await createClient();

    const balanceRepository = new BalanceRepository(supabaseClient);
    await balanceRepository.delete(id);
    revalidatePath("/app/balances", "page");
}
