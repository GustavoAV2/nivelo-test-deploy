import { getBalancesSummary, getMonthlySummary } from "@/app/app/home/_actions/home-actions";
import { getUser } from "@/app/user/_actions/user-actions";
import BaseActions from "@/components/base-actions/base-actions";
import BaseAvatar from "@/components/base-avatar/base-avatar";
import BaseCard from "@/components/base-card/base-card";
import BasePieChart from "@/components/base-echart/base-pie-chart";
import BaseHighlight from "@/components/base-highlight/base-highlight";
import BaseText from "@/components/base-text/base-text";
import BaseFlexColSpaced from "@/layout/base-flex-col-spaced/base-flex-col-spaced";
import BaseFlexCol from "@/layout/base-flex-col/base-flex-col";
import BaseFlexRowCenter from "@/layout/base-flex-row-center/base-flex-row-center";
import BaseFlexRowSpaced from "@/layout/base-flex-row-spaced/base-flex-row-spaced";
import BasePage from "@/layout/base-page/base-page";
import BaseRoot from "@/layout/base-root/base-root";
import { numberToMoney } from "@/utils/money/money";

export default async function PageHome() {
    const user = await getUser();

    const today = new Date();
    const month = today.getMonth();
    const year = today.getFullYear();

    const summary = await getMonthlySummary(month, year);
    const balancesSummary = await getBalancesSummary();

    const welcomeMessage = () => {
        if (user && user.user_metadata && user.user_metadata.name) {
            return <BaseText text={`Bem-vindo(a), ${user.user_metadata.name}!`} />;
        } else {
            return <BaseText text={"Bem-vindo(a)!"} />;
        }
    };

    const userAvatar = () => {
        if (user && user.user_metadata && user.user_metadata.avatar_url) {
            return <BaseAvatar src={user.user_metadata.avatar_url} />;
        } else {
            return null;
        }
    };

    const expenses = () => {
        return Number((summary.totalExpenses / 100).toFixed(2));
    };

    const chartData = [
        { name: "Economia", value: Number(((summary.totalIncome / 100) - expenses()).toFixed(2)) },
        { name: "Gastos", value: expenses() }
    ];

    return (
        <BaseRoot>
            <BasePage>
                <BaseFlexColSpaced>
                    <BaseFlexColSpaced>
                        {userAvatar()}
                        {welcomeMessage()}
                    </BaseFlexColSpaced>
                    <BaseCard>
                        <BaseText text="Resumo do mês"></BaseText>
                    </BaseCard>
                    <BaseCard>
                        <BaseFlexColSpaced>
                            <BaseFlexRowSpaced>
                                <BaseFlexColSpaced>
                                    <BaseFlexRowCenter>
                                        <BasePieChart data={chartData} top={-20} />
                                    </BaseFlexRowCenter>
                                </BaseFlexColSpaced>
                                <BaseFlexColSpaced>
                                    <BaseFlexCol>
                                        <BaseText text="Total Receitas" />
                                        <BaseHighlight>
                                            <BaseText text={numberToMoney(summary.totalIncome, "R$")} />
                                        </BaseHighlight>
                                    </BaseFlexCol>
                                    <BaseFlexCol>
                                        <BaseText text="Total Despesas" />
                                        <BaseHighlight>
                                            <BaseText text={numberToMoney(summary.totalExpenses, "R$")} />
                                        </BaseHighlight>
                                    </BaseFlexCol>
                                </BaseFlexColSpaced>
                            </BaseFlexRowSpaced>
                        </BaseFlexColSpaced>
                    </BaseCard>
                    <BaseCard>
                        <BaseText text="Saldos"></BaseText>
                    </BaseCard>
                    <BaseCard>
                        <BaseFlexColSpaced>
                            {balancesSummary.map(balance => (
                                <div key={balance.id} className="flex flex-col">
                                    <BaseHighlight>
                                        <BaseText text={numberToMoney(balance.total_amount, "R$")} />
                                    </BaseHighlight>
                                    <BaseText text={balance.name} />
                                </div>
                            ))}
                        </BaseFlexColSpaced>
                    </BaseCard>
                </BaseFlexColSpaced>
            </BasePage >
            <BaseActions />
        </BaseRoot >
    );
}
