import Account from "../account/account";

export default class Balance {
    private constructor(
        public readonly id: string,
        public readonly user_id: string,
        public readonly name: string,
        public readonly account: Account[],
        public readonly created_at: Date,
        public readonly updated_at: Date
    ) { }
}
