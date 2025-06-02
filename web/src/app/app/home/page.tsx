import { getMonthlySummary } from "@/app/app/home/_actions/home-actions";
import { getUser } from "@/app/user/_actions/user-actions";
import BaseAvatar from "@/components/base-avatar/base-avatar";
import BaseCard from "@/components/base-card/base-card";
import BaseFooterLink from "@/components/base-footer-link/base-footer-link";
import BaseLabel from "@/components/base-label/base-label";
import BasePage from "@/components/base-page/base-page";
import { numberToMoney } from "@/utils/money/money";
import { PencilEdit02Icon } from "hugeicons-react";

export default async function PageHome() {
    const user = await getUser();

    const today = new Date();
    const month = today.getMonth();
    const year = today.getFullYear();

    const summary = await getMonthlySummary(month, year);

    const welcomeMessage = () => {
        if (user && user.user_metadata && user.user_metadata.name) {
            return <BaseLabel className="mb-6">{`Bem-vindo(a), ${user.user_metadata.name}!`}</BaseLabel>;
        } else {
            return <BaseLabel className="mb-6">{"Bem-vindo(a)!"}</BaseLabel>;;
        }
    };

    const userAvatar = () => {
        if (user && user.user_metadata && user.user_metadata.avatar_url) {
            return <BaseAvatar className="mb-3" src={user.user_metadata.avatar_url} />;
        } else {
            return null;
        }
    };

    const economyPercentage = () => {
        if (summary.economyPercentage) {
            return summary.economyPercentage.toLocaleString("pt-BR", { maximumFractionDigits: 1 });
        } else {
            return "-";
        }
    };

    return (
        <>
            <BasePage className="flex flex-col flex-grow">
                {userAvatar()}
                {welcomeMessage()}
                <BaseCard className="flex flex-col mb-6">
                    <BaseLabel className="mb-4">Resumo do Mês</BaseLabel>
                    <div className="flex flex-row gap-6">
                        <div className="flex flex-col items-center gap-2">
                            <div className="flex items-center justify-center border-blue-300 border-8 rounded-full w-20 h-20">
                                <BaseLabel>{economyPercentage()}%</BaseLabel>
                            </div>
                            <BaseLabel>Economia</BaseLabel>
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="flex flex-col">
                                <BaseLabel >Total Receitas</BaseLabel>
                                <BaseLabel className="text-lg">{numberToMoney(summary.totalIncome, "R$")}</BaseLabel>
                            </div>
                            <div className="flex flex-col">
                                <BaseLabel >Total Despesas</BaseLabel>
                                <BaseLabel className="text-lg">{numberToMoney(summary.totalExpenses, "R$")}</BaseLabel>
                            </div>
                        </div>
                    </div>
                </BaseCard>
                <BaseCard>
                    <div className="mb-6 flex flex-row justify-between">
                        <BaseLabel >Saldos</BaseLabel>
                        <PencilEdit02Icon size={24} />
                    </div>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col">
                            <BaseLabel className="text-lg">R$ 120.000,00</BaseLabel>
                            <BaseLabel className="text-slate-600 dark:text-slate-400">Total em conta</BaseLabel>
                        </div>
                        <div className="flex flex-col">
                            <BaseLabel className="text-lg">R$ 250.000,00</BaseLabel>
                            <BaseLabel className="text-slate-600 dark:text-slate-400">Patrimônio</BaseLabel>
                        </div>
                        <div className="flex flex-col">
                            <BaseLabel className="text-lg">R$ 12.000,00</BaseLabel>
                            <BaseLabel className="text-slate-600 dark:text-slate-400">A pagar</BaseLabel>
                        </div>
                        <div className="flex flex-col">
                            <BaseLabel className="text-lg">R$ 30.000,00</BaseLabel>
                            <BaseLabel className="text-slate-600 dark:text-slate-400">A receber</BaseLabel>
                        </div>
                    </div>
                </BaseCard>
            </BasePage>

            <BaseFooterLink />
        </>
    );
}
