import BaseFlexColSpaced from "@/layout/base-flex-col-spaced/base-flex-col-spaced";
import { CreditCardPosIcon, DollarCircleIcon, Home05Icon, MoneyBag02Icon, Tag01Icon } from "hugeicons-react";
import Link from "next/link";
import BaseFlexCol from "../../layout/base-flex-col/base-flex-col";
import BaseText from "../base-text/base-text";
import BaseMenuContainerHeader from "./base-menu-container-header";
import BaseMenuContainerList from "./base-menu-container-list";
import BaseMenuContainerListItem from "./base-menu-container-list-item";

interface Props {
    isMenuOpen: boolean;
    onMenuClose: () => void;
    onMenuLogout: () => void;
}

export default function BaseMenuContainer(props: Props) {
    const menuTransition = () => {
        if (!props.isMenuOpen)
            return "translate-x-full";
        else
            return "translate-x-0";
    };

    return (
        <div
            className={`
                ${menuTransition()}
                fixed top-0 bottom-0 right-0 min-w-80
                overflow-y-auto
                transition-transform
                duration-300
                flex flex-col
                shadow-2xl border
                border-slate-300 dark:border-slate-600
                bg-slate-50 dark:bg-slate-800
            `}
        >
            <BaseFlexCol>
                <BaseMenuContainerHeader onMenuClose={props.onMenuClose} />
                <BaseMenuContainerList>
                    <BaseFlexColSpaced>
                        <BaseFlexCol>
                            <Link href="/app/home">
                                <BaseMenuContainerListItem onClick={props.onMenuClose}>
                                    <BaseText text="Página Inicial" icon={<Home05Icon />} />
                                </BaseMenuContainerListItem>
                            </Link>
                            <Link href="/app/transactions">
                                <BaseMenuContainerListItem onClick={props.onMenuClose}>
                                    <BaseText text="Transações" icon={<DollarCircleIcon />} />
                                </BaseMenuContainerListItem>
                            </Link>
                            <Link href="/app/categories">
                                <BaseMenuContainerListItem onClick={props.onMenuClose}>
                                    <BaseText text="Categorias" icon={<Tag01Icon />} />
                                </BaseMenuContainerListItem>
                            </Link>
                            <Link href="/app/accounts">
                                <BaseMenuContainerListItem onClick={props.onMenuClose}>
                                    <BaseText text="Contas" icon={<CreditCardPosIcon />} />
                                </BaseMenuContainerListItem>
                            </Link>
                            <Link href="/app/balances">
                                <BaseMenuContainerListItem onClick={props.onMenuClose}>
                                    <BaseText text="Saldos" icon={<MoneyBag02Icon />} />
                                </BaseMenuContainerListItem>
                            </Link>
                        </BaseFlexCol>
                        <BaseFlexCol>
                            <BaseMenuContainerListItem onClick={props.onMenuLogout}>
                                <BaseText text="Sair" />
                            </BaseMenuContainerListItem>
                        </BaseFlexCol>
                    </BaseFlexColSpaced>
                </BaseMenuContainerList>
            </BaseFlexCol>
        </div >
    );
}
