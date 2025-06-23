"use client";

import BaseButton from "@/components/base-button/base-button";
import BaseSelect from "@/components/base-select/base-select";
import BaseSelectItem from "@/components/base-select/base-select-item";
import BaseText from "@/components/base-text/base-text";
import { formatDateTimeToString } from "@/utils/date/date";
import Link from "next/link";
import { useState } from "react";
import { BalanceType } from "./balance.model";
import BaseFlexColSpaced from "@/layout/base-flex-col-spaced/base-flex-col-spaced";

interface Props {
    balancesModel: {
        id: string,
        name: string,
        effective_date: Date | null,
        balances_account: {
            id: string;
            account_name: string;
            operation_type: BalanceType;
            created_at: Date;
        }[]
    }[];
}

export default function Balance(props: Props) {
    const [balance, setBalance] = useState(props.balancesModel[0] || null);

    const hasBalanceAccounts = () => {
        return balance && balance.balances_account && balance.balances_account.length > 0;
    };

    const setId = (id: string) => {
        const selectedBalance = props.balancesModel.find((b) => b.id === id);
        if (selectedBalance) {
            setBalance(selectedBalance);
        }
    };

    return (
        <BaseFlexColSpaced>
            <BaseSelect display="block" label="Selecionar saldo:" value={balance.id} onChange={setId}>
                {props.balancesModel.map((balance) => (
                    <BaseSelectItem
                        key={balance.id}
                        value={balance.id}
                        description={balance.name}
                    />
                ))}
            </BaseSelect>

            <BaseText text="Contas:" />

            {!hasBalanceAccounts()
                ? <Link href={`/app/balances/${balance.id}/edit`}>
                    <BaseButton color="tertiary">
                        <div className="flex flex-row justify-between">
                            <BaseText text="Nenhum conta vinculada" />
                        </div>
                        <div className="flex flex-row justify-between">
                            <BaseText text="Clique para adicionar uma conta!" />
                        </div>
                    </BaseButton>
                </Link>
                : balance.balances_account.map((balanceAccount) => (
                    <div key={balanceAccount.id}>
                        <Link href={`/app/balances/${balance.id}/edit`}>
                            <BaseButton color="tertiary">
                                <div className="flex flex-row justify-between">
                                    <BaseText text={balanceAccount.operation_type} />
                                </div>
                                <div className="flex flex-row justify-between">
                                    <BaseText text={balanceAccount.account_name} />
                                    <BaseText text={formatDateTimeToString(balanceAccount.created_at as Date)} />
                                </div>
                            </BaseButton>
                        </Link>
                    </div>
                ))
            }
        </BaseFlexColSpaced>
    );
}
