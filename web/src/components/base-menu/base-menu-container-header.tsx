import BaseFlexColSpaced from "../../layout/base-flex-col-spaced/base-flex-col-spaced";
import BaseFlexCol from "../../layout/base-flex-col/base-flex-col";
import BaseFlexRowBetween from "../../layout/base-flex-row-between/base-flex-row-between";
import BasePadding from "../../layout/base-padding/base-padding";
import BaseCancel from "../base-cancel/base-cancel";
import BaseLogo from "../base-logo/base-logo";
import BaseSubtitle from "../base-subtitle/base-subtitle";
import BaseText from "../base-text/base-text";
import BaseTitle from "../base-title/base-title";

interface Props {
    onMenuClose: () => void;
}

export default function BaseMenuContainerHeader(props: Props) {
    return (
        <BasePadding>
            <BaseFlexColSpaced>
                <BaseFlexRowBetween>
                    <BaseLogo width={50} height={50} />
                    <BaseCancel onClick={props.onMenuClose} />
                </BaseFlexRowBetween>
                <BaseFlexCol>
                    <BaseTitle>
                        <BaseText text="Nivelo" />
                    </BaseTitle>
                    <BaseSubtitle>
                        <BaseText text="Plataforma de finanças" />
                    </BaseSubtitle>
                </BaseFlexCol>
            </BaseFlexColSpaced>
        </BasePadding >
    );
}
