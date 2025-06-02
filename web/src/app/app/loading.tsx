import BaseFrame from "@/components/base-frame/base-frame";
import BaseSpinner from "@/components/base-spinner/base-spinner";

export default function Loading() {
    return (
        <BaseFrame>
            <div className="flex flex-grow justify-center items-center">
                <BaseSpinner />
            </div>
        </BaseFrame>
    );
}
