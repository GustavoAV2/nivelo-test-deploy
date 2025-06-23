import Balance from "@/entities/balance/balance";

export interface BalanceAccountModel {
    id: string;
    accountName: string;
    operation_type: BalanceType;
    created_at: Date;
}

export enum BalanceType {
    Add = "Adição",
    Subtract = "Subtração"
}

export class BalanceModel {
    private constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly effectiveDate: Date | null,
        public readonly balancesAccount: BalanceAccountModel[]
    ) { }

    static fromBalances(balances: Balance[]): BalanceModel[] {
        return balances.map((balance) => {
            return new BalanceModel(
                balance.id,
                balance.name,
                balance.created_at,
                balance.balance_account.map((ba) => ({
                    id: ba.id,
                    accountName: ba.account.name,
                    operation_type: ba.operation_type === "add" ? BalanceType.Add : BalanceType.Subtract,
                    created_at: ba.created_at
                }))
            );
        });
    }

    static fromBalancesIncludeAccounts(balances: Balance[]): BalanceModel[] {
        return balances.map((balance) => {
            return new BalanceModel(
                balance.id,
                balance.name,
                balance.created_at,
                balance.balance_account.map((ba) => ({
                    id: ba.id,
                    accountName: ba.account.name,
                    operation_type: ba.operation_type === "add" ? BalanceType.Add : BalanceType.Subtract,
                    created_at: ba.created_at
                }))
            );
        });
    }

    toDto() {
        return {
            id: this.id,
            name: this.name,
            effective_date: this.effectiveDate,
            balances_account: this.balancesAccount.map((ba) => ({
                id: ba.id,
                account_name: ba.accountName,
                operation_type: ba.operation_type,
                created_at: ba.created_at
            }))
        };
    }
}
