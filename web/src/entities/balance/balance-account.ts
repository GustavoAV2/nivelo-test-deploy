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

    static create(balance_id: string, account_id: string, type: "add" | "subtract"): Partial<BalanceAccount> {
        return {
            balance_id: balance_id,
            account_id: account_id,
            operation_type: type,
            created_at: new Date()
        };
    }

    static edit(balance_id: string, account_id: string, type: "add" | "subtract"): Partial<BalanceAccount> {
        return {
            balance_id: balance_id,
            account_id: account_id,
            operation_type: type,
            updated_at: new Date()
        };
    }
}
