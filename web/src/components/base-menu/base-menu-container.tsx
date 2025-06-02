import Link from "next/link";
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
            return "-translate-x-full";
        else
            return "-translate-x-0";
    };

    return (
        <div className={`
            ${menuTransition()}
            fixed top-0 bottom-0 left-0 min-w-80
            transition-transform
            flex flex-col
            shadow bg-blue-200
            dark:bg-gray-900
            text-gray-900 dark:text-white
            `}
        >
            <BaseMenuContainerHeader onMenuClose={props.onMenuClose} />
            <BaseMenuContainerList>
                <div>
                    <Link href="/app/home">
                        <BaseMenuContainerListItem onClick={props.onMenuClose}>Página Inicial</BaseMenuContainerListItem>
                    </Link>
                    <Link href="/app/transactions">
                        <BaseMenuContainerListItem onClick={props.onMenuClose}>Transações</BaseMenuContainerListItem>
                    </Link>
                    <Link href="/app/categories">
                        <BaseMenuContainerListItem onClick={props.onMenuClose}>Categorias</BaseMenuContainerListItem>
                    </Link>
                    <Link href="/app/accounts">
                        <BaseMenuContainerListItem onClick={props.onMenuClose}>Contas</BaseMenuContainerListItem>
                    </Link>
                    <Link href="/app/balances">
                        <BaseMenuContainerListItem onClick={props.onMenuClose}>Saldos</BaseMenuContainerListItem>
                    </Link>
                </div>
                <div>
                    <BaseMenuContainerListItem onClick={props.onMenuLogout}>
                        <span>Sair</span>
                    </BaseMenuContainerListItem>
                </div>
            </BaseMenuContainerList>
        </div>
    );
}
