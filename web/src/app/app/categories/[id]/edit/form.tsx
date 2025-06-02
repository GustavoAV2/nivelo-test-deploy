"use client";

import BaseButton from "@/components/base-button/base-button";
import BaseForm from "@/components/base-form/base-form";
import BaseInput from "@/components/base-input/base-input";
import { useNotification } from "@/components/base-notification/_hooks/base-notification-hook";
import Category from "@/entities/category/category";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { deleteCategoryAsync, editCategoryAsync } from "../../_actions/category-actions";

interface Props {
    category: Category;
}

export default function PageCategoriesForm(props: Props) {
    const router = useRouter();
    const { showNotification } = useNotification();
    const [categoryName, setCategoryName] = useState(props.category.name);

    const handleEditCategoryAsync = async () => {
        await editCategoryAsync(props.category.id, categoryName);
        showNotification("Categoria atualizada!");
        backToCategoriesList();
    };

    const handleDeleteCategoryAsync = async () => {
        await deleteCategoryAsync(props.category.id);
        showNotification("Categoria deletada!");
        backToCategoriesList();
    };

    const backToCategoriesList = () => {
        router.back();
    };

    return (
        <div>
            <div className="mb-6">
                <BaseForm>
                    <BaseInput className="mb-2" required={false} type={"text"} value={categoryName} onInput={setCategoryName}
                        label={"Nome da Categoria:"} />
                </BaseForm>
            </div>
            <div className="flex flex-col items-stretch">
                <BaseButton className="mb-2" color="primary" onClick={handleEditCategoryAsync}>
                    Salvar
                </BaseButton>
                <BaseButton className="mb-2" color="secondary" onClick={backToCategoriesList}>
                    Cancelar
                </BaseButton>
                <BaseButton color="danger" onClick={handleDeleteCategoryAsync}>
                    Excluir Categoria
                </BaseButton>
            </div>
        </div>
    );
}
