import BaseButton from "@/components/base-button/base-button";
import BaseFooter from "@/components/base-footer/base-footer";
import BaseFooterItem from "@/components/base-footer/base-footer-item";
import BaseTab from "@/components/base-tab/base-tab";
import BaseTabItem from "@/components/base-tab/base-tab-item";
import BaseText from "@/components/base-text/base-text";
import BaseFlexColSpaced from "@/layout/base-flex-col-spaced/base-flex-col-spaced";
import BasePage from "@/layout/base-page/base-page";
import BaseRoot from "@/layout/base-root/base-root";
import { AddCircleIcon } from "hugeicons-react";
import Link from "next/link";
import { getCategoriesAsync } from "./_actions/category-actions";

export default async function PageCategories() {
    const categories = await getCategoriesAsync();

    const categoriesList = () => {
        return categories.map((category) => (
            <div key={category.id}>
                <Link href={`/app/categories/${category.id}/edit`}>
                    <BaseButton color="tertiary">
                        <BaseText text={category.name} />
                    </BaseButton>
                </Link>
            </div>
        ));
    };

    return (
        <BaseRoot>
            <BasePage>
                <BaseFlexColSpaced>
                    <BaseTab>
                        <BaseTabItem>Receita</BaseTabItem>
                        <BaseTabItem>Transf.</BaseTabItem>
                        <BaseTabItem>Despesa</BaseTabItem>
                    </BaseTab>
                    {categoriesList()}
                </BaseFlexColSpaced>
            </BasePage>
            <BaseFooter>
                <Link className="flex flex-grow" href="/app/categories/new">
                    <BaseFooterItem icon={<AddCircleIcon />} text={"Nova Categoria"} />
                </Link>
            </BaseFooter>
        </BaseRoot>
    );
}
