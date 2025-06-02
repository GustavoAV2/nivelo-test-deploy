import BaseFooter from "@/components/base-footer/base-footer";
import BasePage from "@/components/base-page/base-page";
import { getCategoryByIdAsync } from "../../_actions/category-actions";
import PageCategoriesForm from "./form";

interface Props {
    params: { id: string; };
}

export default async function PageCategoriesEdit(props: Props) {
    const categoryId = props.params.id;
    const category = await getCategoryByIdAsync(categoryId);

    const pageCategoriesForm = () => {
        if (category) { return <PageCategoriesForm category={category} />; }
        else { return null; }
    };

    return (
        <>
            <BasePage className="flex flex-col flex-grow max-w-sm">
                {pageCategoriesForm()}
            </BasePage>
            <BaseFooter />
        </>
    );
}
