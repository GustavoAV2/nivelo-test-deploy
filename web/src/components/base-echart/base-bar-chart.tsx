"use client";

import * as echarts from "echarts";
import dynamic from "next/dynamic";
import React, { useEffect, useRef } from "react";

interface BaseBarChartProps {
    data: { [key: string]: number };
    width?: string;
    height?: string;
    title?: string;
}

const BaseBarChartComponent: React.FC<BaseBarChartProps> = ({
    data,
    width = "100%",
    height = "400px",
    title
}) => {
    const chartRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let chart: echarts.ECharts | undefined;

        if (chartRef.current) {
            chart = echarts.init(chartRef.current);

            const source = Object.entries(data).map(([product, value]) => ({ product, value }));

            const series: echarts.BarSeriesOption[] = [
                {
                    type: "bar"
                }
            ];

            const isMobile = window.innerWidth < 768;
            const getFontSize = () => {
                if (isMobile) {
                    return 8;
                }
                return 14;
            };

            const option: echarts.EChartsOption = {
                title: title ? { text: title, left: "center" } : undefined,
                tooltip: {
                    trigger: "axis",
                    axisPointer: {
                        type: "shadow"
                    }
                },
                dataset: {
                    source: source
                },
                xAxis: {
                    type: "category",
                    name: "Categ.",
                    axisLabel: {
                        fontSize: getFontSize(),
                        rotate: isMobile ? 50 : 0
                    }
                },
                yAxis: { type: "value", name: "Valores" },
                series: series,
                grid: {
                    left: "3%",
                    right: "4%",
                    bottom: "3%",
                    containLabel: true
                }
            };

            chart.setOption(option, true);

            const handleResize = () => {
                chart?.resize();
            };
            window.addEventListener("resize", handleResize);

            return () => {
                window.removeEventListener("resize", handleResize);
                chart?.dispose();
            };
        }
    }, [data, title, width, height]);

    return (
        <div
            ref={chartRef}
            style={{ width: width, height: height }}
            className="multi-series-bar-chart-container"
        />
    );
};

const BaseBarChart = dynamic(() => Promise.resolve(BaseBarChartComponent), {
    ssr: false,
    loading: () => <p>Carregando gráfico...</p>
});

export default BaseBarChart;
