"use client";

import BaseButton from "@/components/base-button/base-button";
import BaseForm from "@/components/base-form/base-form";
import BaseInput from "@/components/base-input/base-input";
import { useNotification } from "@/components/base-notification/_hooks/base-notification-hook";
import BaseTextCenter from "@/components/base-text-center/base-text-center";
import BaseFlexColSpaced from "@/layout/base-flex-col-spaced/base-flex-col-spaced";
import BasePage from "@/layout/base-page/base-page";
import BaseRoot from "@/layout/base-root/base-root";
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
        <BaseRoot>
            <BasePage>
                <BaseFlexColSpaced>
                    <BaseForm>
                        <BaseInput
                            type="text"
                            label="Nome da Categoria:"
                            onInput={setCategoryName}
                        />
                    </BaseForm>
                    <BaseButton type="button" color="primary" onClick={handleCreateCategoryAsync}>
                        <BaseTextCenter text="Salvar" />
                    </BaseButton>
                    <BaseButton type="button" color="secondary" onClick={backToCategoriesList}>
                        <BaseTextCenter text="Cancelar" />
                    </BaseButton>
                </BaseFlexColSpaced>
            </BasePage>
        </BaseRoot>
    );
}
