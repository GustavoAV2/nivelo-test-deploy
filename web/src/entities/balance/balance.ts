import Account from "../account/account";
import BalanceAccount from "./balance-account";

export default class Balance {
    private constructor(
        public readonly id: string,
        public readonly user_id: string,
        public readonly name: string,
        public readonly account: Account[],
        public readonly balance_account: BalanceAccount[],
        public readonly created_at: Date,
        public readonly updated_at: Date
    ) { }

    static create(name: string, user_id: string): Partial<Balance> {
        return {
            user_id: user_id,
            name: name,
            created_at: new Date()
        };
    }

    static edit(name: string): Partial<Balance> {
        return {
            name: name,
            updated_at: new Date()
        };
    }
}
