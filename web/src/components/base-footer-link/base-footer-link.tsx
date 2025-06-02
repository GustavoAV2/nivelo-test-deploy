import BaseFooter from "@/components/base-footer/base-footer";
import BaseFooterItem from "@/components/base-footer/base-footer-item";
import { CircleArrowDataTransferDiagonalIcon, MoneyReceiveCircleIcon, MoneySendCircleIcon } from "hugeicons-react";
import Link from "next/link";

export default function BaseFooterLink() {
    return (
        <BaseFooter>
            <Link href={"transactions/incomes/new"}>
                <BaseFooterItem icon={<MoneyReceiveCircleIcon />} text={"Receitas"} />
            </Link>

            <Link href={"transactions/transfers/new"}>
                <BaseFooterItem icon={<CircleArrowDataTransferDiagonalIcon />} text={"Transferências"} />
            </Link>

            <Link href={"transactions/expenses/new"}>
                <BaseFooterItem icon={<MoneySendCircleIcon />} text={"Despesas"} />
            </Link>
        </BaseFooter>
    );
}
