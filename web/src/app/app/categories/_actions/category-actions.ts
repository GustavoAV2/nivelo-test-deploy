"use server";

import { getUser } from "@/app/user/_actions/user-actions";
import Category from "@/entities/category/category";
import CategoryRepositoy from "@/repositories/category/category-repository";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function getCategoriesAsync(): Promise<Category[]> {
    const supabaseClient = await createClient();

    const categoryRepository = new CategoryRepositoy(supabaseClient);
    const categoriesFound = categoryRepository.findAll();
    if (!categoriesFound) { throw new Error("Categories not found"); }

    return categoriesFound;
}

export async function getCategoryByIdAsync(id: string): Promise<Category> {
    const supabaseClient = await createClient();

    const categoryRepository = new CategoryRepositoy(supabaseClient);
    const categoryFound = await categoryRepository.findById(id);

    return categoryFound;
}

export async function createCategoryAsync(categoryName: string): Promise<void> {
    const supabaseClient = await createClient();
    const user = await getUser();

    if (user == null) { throw new Error("Usuário não autenticado!"); }

    const category = Category.create(categoryName, user?.id, "internal");

    const categoryRepository = new CategoryRepositoy(supabaseClient);
    const categoryCreated = await categoryRepository.create(category);
    revalidatePath("/app/categories");

    if (!categoryCreated) { throw new Error("Nao foi possivel criar a categoria!"); }
}

export async function editCategoryAsync(id: string, categoryName: string): Promise<Category> {
    const supabaseClient = await createClient();

    const categoryRepository = new CategoryRepositoy(supabaseClient);
    const category = Category.edit(id, categoryName);
    const categoryUpdated = await categoryRepository.update(id, category);
    revalidatePath("/app/categories", "page");

    return categoryUpdated;
}

export async function deleteCategoryAsync(id: string): Promise<void> {
    const supabaseClient = await createClient();

    const categoryRepository = new CategoryRepositoy(supabaseClient);
    await categoryRepository.delete(id);
    revalidatePath("/app/categories", "page");
}
