import Account from "../account/account";
import Balance from "./balance";

export default class BalanceAccount {
    private constructor(
        public readonly id: string,
        public readonly balance_id: string,
        public readonly balance: Balance,
        public readonly account_id: string,
        public readonly account: Account,
        public readonly operation_type: "add" | "subtract",
        public readonly created_at: Date,
        public readonly updated_at: Date
    ) { }
}
