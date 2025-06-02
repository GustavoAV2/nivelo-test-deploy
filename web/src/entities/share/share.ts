import Account from "../account/account";

export default class Share {
    private constructor(
        public readonly id: string,
        public readonly account_id: string,
        public readonly account: Account,
        public readonly userId: string,
        public readonly share_link: string,
        public readonly is_active: boolean,
        public readonly expires_at: Date | null,
        public readonly created_at: Date,
        public readonly updated_at: Date
    ) { }
}
