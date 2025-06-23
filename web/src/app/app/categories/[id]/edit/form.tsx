"use client";

import BaseButton from "@/components/base-button/base-button";
import BaseForm from "@/components/base-form/base-form";
import BaseInput from "@/components/base-input/base-input";
import { useNotification } from "@/components/base-notification/_hooks/base-notification-hook";
import Category from "@/entities/category/category";
import BaseFlexColSpaced from "@/layout/base-flex-col-spaced/base-flex-col-spaced";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { deleteCategoryAsync, editCategoryAsync } from "../../_actions/category-actions";
import BaseTextCenter from "@/components/base-text-center/base-text-center";

interface Props {
    category: Category;
}

export default function PageCategoriesForm(props: Props) {
    const { showNotification } = useNotification();
    const [categoryName, setCategoryName] = useState(props.category.name);
    const router = useRouter();

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
        <BaseFlexColSpaced>
            <BaseForm>
                <BaseInput
                    type="text"
                    label="Nome da Categoria:"
                    value={categoryName}
                    onInput={setCategoryName}
                />
            </BaseForm>
            <BaseButton color="primary" onClick={handleEditCategoryAsync}>
                <BaseTextCenter text="Salvar" />
            </BaseButton>
            <BaseButton color="secondary" onClick={backToCategoriesList}>
                <BaseTextCenter text="Cancelar" />
            </BaseButton>
            <BaseButton color="danger" onClick={handleDeleteCategoryAsync}>
                <BaseTextCenter text="Excluir Categoria" />
            </BaseButton>
        </BaseFlexColSpaced>
    );
}
