import BaseSpinner from "@/components/base-spinner/base-spinner";
import BaseFlexCentralizer from "@/layout/base-flex-centralizer/base-flex-centralizer";

export default function BaseLoading() {
    return (
        <BaseFlexCentralizer>
            <BaseSpinner />
        </BaseFlexCentralizer >
    );
}
