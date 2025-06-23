import BaseButton from "@/components/base-button/base-button";
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
                return "text-green-500";
            case TransactionType.Expense:
                return "text-red-500";
            case TransactionType.Transfer:
                return "text-amber-400";
            default:
                return "text-gray-900";
        }
    };

    const transactionType = () => {
        switch (props.transactionModel.type) {
            case TransactionType.Income:
                return "Receita";
            case TransactionType.Expense:
                return "Despesa";
            case TransactionType.Transfer:
                return "Transferência";
            default:
                return "";
        }
    };

    return (
        <Link href={transactionRoute()}>
            <BaseButton color="tertiary">
                <div className="flex flex-row justify-between">
                    <span>{props.transactionModel.description}</span>
                    <span className={transactionColor()}>{numberToMoney(props.transactionModel.amount, "R$")}</span>
                </div>
                <div className="flex flex-row justify-between">
                    <span>{transactionType()}</span>
                    <span>{formatDateTimeToString(props.transactionModel.effectiveDate as Date)}</span>
                </div>
            </BaseButton>
        </Link>
    );
}
