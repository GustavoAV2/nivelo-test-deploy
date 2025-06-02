import BaseCard from "@/components/base-card/base-card";
import BaseFooter from "@/components/base-footer/base-footer";
import BaseFooterItem from "@/components/base-footer/base-footer-item";
import BaseLabel from "@/components/base-label/base-label";
import BasePage from "@/components/base-page/base-page";
import BaseTab from "@/components/base-tab/base-tab";
import BaseTabItem from "@/components/base-tab/base-tab-item";
import { AddCircleIcon } from "hugeicons-react";
import Link from "next/link";
import { getCategoriesAsync } from "./_actions/category-actions";

export default async function PageCategories() {
    const categories = await getCategoriesAsync();

    const categoriesList = () => {
        return categories.map((category) => (
            <div key={category.id}>
                <Link href={`/app/categories/${category.id}/edit`}>
                    <BaseCard className="mb-5 cursor-pointer">
                        <BaseLabel className="block text-lg">{category.name}</BaseLabel>
                    </BaseCard>
                </Link>
            </div>
        ));
    };

    return (
        <>
            <BasePage className="flex flex-col flex-grow max-w-sm">
                <BaseTab className="mb-6">
                    <BaseTabItem>Receita</BaseTabItem>
                    <BaseTabItem>Transf.</BaseTabItem>
                    <BaseTabItem>Despesa</BaseTabItem>
                </BaseTab>
                {categoriesList()}
            </BasePage>

            <BaseFooter className="sticky bottom-0">
                <Link href="/app/categories/new">
                    <BaseFooterItem icon={<AddCircleIcon />} text={"Nova Categoria"} />
                </Link>
            </BaseFooter>
        </>
    );
}
