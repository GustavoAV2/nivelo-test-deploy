import Account from "../account/account";
import Category from "../category/category";

export default class Income {
    private constructor(
        public readonly id: string,
        public readonly user_id: string,
        public readonly account_id: string,
        public readonly account: Account,
        public readonly category_id: string | null,
        public readonly category: Category | null,
        public readonly amount: number,
        public readonly creation_date: Date,
        public readonly effective_date: Date | null,
        public readonly description: string | null,
        public readonly created_at: Date,
        public readonly updated_at: Date
    ) { }

    static create(user_id: string, account_id: string, category_id: string, amount: number, description: string, effective_date: Date): Partial<Income> {
        return {
            user_id: user_id,
            account_id: account_id,
            category_id: category_id,
            amount: amount,
            description: description,
            effective_date: effective_date,
            creation_date: new Date(),
            created_at: new Date()
        };
    }

    static edit(description: string, category_id: string, account_id: string, amount: number, effective_date: Date): Partial<Income> {
        return {
            description: description,
            category_id: category_id,
            account_id: account_id,
            amount: amount,
            effective_date: effective_date,
            updated_at: new Date()
        };
    }
}
