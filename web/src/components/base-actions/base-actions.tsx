import BaseFooter from "@/components/base-footer/base-footer";
import BaseFooterItem from "@/components/base-footer/base-footer-item";
import { ArrowDataTransferDiagonalIcon, TradeDownIcon, TradeUpIcon } from "hugeicons-react";
import Link from "next/link";

export default function BaseActions() {
    return (
        <BaseFooter>
            <Link className="flex flex-grow" href={"transactions/incomes/new"}>
                <BaseFooterItem
                    color="text-green-500"
                    icon={<TradeUpIcon />}
                    text={"Receitas"}
                />
            </Link>
            <Link className="flex flex-grow" href={"transactions/transfers/new"}>
                <BaseFooterItem
                    color="text-amber-400"
                    icon={<ArrowDataTransferDiagonalIcon />}
                    text={"Transf."}
                />
            </Link>
            <Link className="flex flex-grow" href={"transactions/expenses/new"}>
                <BaseFooterItem
                    color="text-red-500"
                    icon={<TradeDownIcon />}
                    text={"Despesas"}
                />
            </Link>
        </BaseFooter>
    );
}
