import BasePage from "@/layout/base-page/base-page";
import BaseRoot from "@/layout/base-root/base-root";
import { getCategoryByIdAsync } from "../../_actions/category-actions";
import PageCategoriesForm from "./form";

interface Props {
    params: Promise<{ id: string; }>;
}

export default async function PageCategoriesEdit(props: Props) {
    const params = await props.params;
    const categoryId = params.id;
    const category = await getCategoryByIdAsync(categoryId);

    const pageCategoriesForm = () => {
        if (category) { return <PageCategoriesForm category={category} />; }
        else { return null; }
    };

    return (
        <BaseRoot>
            <BasePage>
                {pageCategoriesForm()}
            </BasePage>
        </BaseRoot>
    );
}
