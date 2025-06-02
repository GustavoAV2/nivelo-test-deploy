import BaseCard from "@/components/base-card/base-card";
import BaseLabel from "@/components/base-label/base-label";
import { formatDateTimeToString } from "@/utils/date/date";
import { numberToMoney } from "@/utils/money/money";
import Link from "next/link";
import { TransactionModel, TransactionType } from "./transaction.model";

interface Props {
    transactionModel: TransactionModel;
}

export default function Transaction(props: Props) {
    const transactionRoute = () => {
        switch (props.transactionModel.type) {
        case TransactionType.Income:
            return `/app/transactions/incomes/${props.transactionModel.id}/edit`;
        case TransactionType.Expense:
            return `/app/transactions/expenses/${props.transactionModel.id}/edit`;
        case TransactionType.Transfer:
            return `/app/transactions/transfers/${props.transactionModel.id}/edit`;
        default:
            throw new Error("Tipo desconhecido de transação");
        }
    };

    const transactionColor = () => {
        switch (props.transactionModel.type) {
        case TransactionType.Income:
            return "text-green-600 text-lg";
        case TransactionType.Expense:
            return "text-red-600 text-lg";
        case TransactionType.Transfer:
            return "text-blue-600 text-lg";
        default:
            return "text-gray-800 text-lg";
        }
    };

    return (
        <Link href={transactionRoute()}>
            <BaseCard className="mb-5 cursor-pointer">
                <div className="flex flex-row justify-between">
                    <BaseLabel className="text-gray-900 dark:text-white text-lg">{props.transactionModel.type}</BaseLabel>
                    <BaseLabel className={transactionColor()}>
                        {numberToMoney(props.transactionModel.amount, "R$")}
                    </BaseLabel>
                </div>
                <div className="flex flex-row justify-between">
                    <BaseLabel className="text-gray-900 dark:text-white">{props.transactionModel.description}</BaseLabel>
                    <BaseLabel className="text-gray-900 text-sm dark:text-white">{formatDateTimeToString(props.transactionModel.effectiveDate as Date)}</BaseLabel>
                </div>
            </BaseCard>
        </Link>
    );
}
