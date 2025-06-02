"use server";

import { getUser } from "@/app/user/_actions/user-actions";
import Transfer from "@/entities/transfer/transfer";
import TransferRepository from "@/repositories/transfer/transfer-repository";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function getTransferByIdAsync(id: string): Promise<Transfer> {
    const supabaseClient = await createClient();

    const transferRepository = new TransferRepository(supabaseClient);
    const transfer = await transferRepository.findById(id);

    return transfer;
}

export async function createTransferAsync(
    sourceAcountId: string,
    targetAccountId: string,
    amount: number,
    description: string,
    effectiveDate: Date
) {
    const user = await getUser();
    if (!user) { throw new Error("Failed to get user"); }

    const supabaseClient = await createClient();
    const transferRepository = new TransferRepository(supabaseClient);

    const transfer = Transfer.create(user.id, sourceAcountId, targetAccountId, amount, description, effectiveDate);
    transferRepository.create(transfer);

    revalidatePath("/app/transactions");
    return transfer;
}

export async function deleteTransferAsync(id: string) {
    const supabaseClient = await createClient();
    const transferRepository = new TransferRepository(supabaseClient);

    transferRepository.delete(id);
    revalidatePath("/app/transactions");
}

export async function updateTransferAsync(
    id: string,
    sourceAcountId: string,
    targetAccountId: string,
    amount: number,
    description: string,
    effectiveDate: string
) {
    const supabaseClient = await createClient();
    const transferRepository = new TransferRepository(supabaseClient);

    const transfer = Transfer.edit(sourceAcountId, targetAccountId, amount, description, new Date(effectiveDate));
    transferRepository.update(id, transfer);

    revalidatePath("/app/transactions");
    return transfer;
}
