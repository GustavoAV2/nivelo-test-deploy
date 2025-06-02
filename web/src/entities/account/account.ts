import Balance from "../balance/balance";

export default class Account {
    private constructor(
        public readonly id: string,
        public readonly user_id: string,
        public readonly name: string,
        public readonly type: string,
        public readonly created_at: Date,
        public readonly updated_at: Date,
        public readonly balance: Balance[]
    ) { }

    static create(name: string, userId: string): Partial<Account> {
        return {
            name: name,
            user_id: userId,
            created_at: new Date(),
            type: "internal"
        };
    }

    static edit(id: string, name: string): Partial<Account> {
        return {
            id: id,
            name: name,
            updated_at: new Date()
        };
    }
}
