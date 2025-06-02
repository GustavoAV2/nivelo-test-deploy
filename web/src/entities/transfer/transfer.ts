import Account from "../account/account";

export default class Transfer {
    private constructor(
        public readonly id: string,
        public readonly user_id: string,
        public readonly source_account_id: string,
        public readonly source_account: Account,
        public readonly target_account_id: string,
        public readonly target_account: Account,
        public readonly amount: number,
        public readonly effective_date: Date,
        public readonly description: string | null,
        public readonly created_at: Date,
        public readonly updated_at: Date
    ) { }

    static create(user_id: string, source_account_id: string, target_account_id: string, amount: number, description: string, effective_date: Date){
        return {
            user_id: user_id,
            source_account_id: source_account_id,
            target_account_id: target_account_id,
            amount: amount,
            description: description,
            effective_date: effective_date,
            created_at: new Date(),
            creation_date: new Date()
        };
    }

    static edit(source_account_id: string, target_account_id: string, amount: number, description: string, effective_date: Date){
        return {
            source_account_id: source_account_id,
            target_account_id: target_account_id,
            amount: amount,
            description: description,
            effective_date: effective_date,
            updated_at: new Date()
        };
    }

}
