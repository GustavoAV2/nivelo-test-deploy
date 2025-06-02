"use client";

import BaseButton from "@/components/base-button/base-button";
import BaseFooter from "@/components/base-footer/base-footer";
import BaseForm from "@/components/base-form/base-form";
import BaseInput from "@/components/base-input/base-input";
import { useNotification } from "@/components/base-notification/_hooks/base-notification-hook";
import BasePage from "@/components/base-page/base-page";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createCategoryAsync } from "../_actions/category-actions";

export default function PageCategoriesNew() {
    const { showNotification } = useNotification();
    const [categoryName, setCategoryName] = useState("");
    const router = useRouter();

    const handleCreateCategoryAsync = async () => {
        await createCategoryAsync(categoryName);
        showNotification("Categoria criada com sucesso!");
        backToCategoriesList();
    };

    const backToCategoriesList = () => {
        router.back();
    };

    return (
        <>
            <BasePage className="flex flex-col flex-grow max-w-sm">
                <div className="mb-6">
                    <BaseForm>
                        <BaseInput className="mb-2" type={"text"} onInput={setCategoryName} label={"Nome da Categoria:"} />
                    </BaseForm>
                </div>
                <div className="flex flex-col items-stretch">
                    <BaseButton className="mb-2" type="button" color="primary" onClick={handleCreateCategoryAsync}>Salvar</BaseButton>
                    <BaseButton className="mb-2" type="button" color="secondary" onClick={backToCategoriesList}>Cancelar</BaseButton>
                </div>
            </BasePage>
            <BaseFooter />
        </>
    );
}
