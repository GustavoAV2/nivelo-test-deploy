"use client";

import * as echarts from "echarts";
import { useEffect, useRef, useState } from "react";

interface PieChartDataPoint {
    name: string;
    value: number;
}

interface Props {
    data: PieChartDataPoint[];
    top: number;
    chartName?: string;
}

export default function BasePieChart({
    data,
    top,
    chartName = "Resumo"
}: Props) {
    const chartRef = useRef<HTMLDivElement>(null);

    const [isDarkMode, setIsDarkMode] = useState(() => {
        if (typeof window !== "undefined") {
            return window.matchMedia("(prefers-color-scheme: dark)").matches;
        }
        return false;
    });

    useEffect(() => {
        if (typeof window === "undefined") return;

        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        const handleChange = (e: MediaQueryListEvent) => {
            setIsDarkMode(e.matches);
        };

        mediaQuery.addEventListener("change", handleChange);
        return () => {
            mediaQuery.removeEventListener("change", handleChange);
        };
    }, []);

    useEffect(() => {
        if (!chartRef.current) return;

        if (!data || data.length === 0) {
            const oldInstance = echarts.getInstanceByDom(chartRef.current);
            if (oldInstance) {
                oldInstance.dispose();
            }
            return;
        }

        const chartInstance = echarts.init(chartRef.current);
        const legendTextColor = isDarkMode ? "#f8fafc" : "#0f172a";

        const option: echarts.EChartsOption = {
            darkMode: "auto",
            color: ["#81C784", "#E57373"],
            tooltip: {
                trigger: "item",
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                bottom: "1%",
                left: "center",
                textStyle: {
                    color: legendTextColor
                }
            },
            series: [
                {
                    name: chartName,
                    type: "pie",
                    radius: ["40%", "70%"],
                    top: top,
                    height: "100%",
                    avoidLabelOverlap: false,
                    itemStyle: {
                        borderRadius: 5
                    },
                    label: {
                        show: true,
                        position: "inside",
                        formatter: "{d}%",
                        fontSize: 10,
                        fontWeight: "bold",
                        color: "#fff"
                    },
                    emphasis: {
                        label: {
                            show: true,
                            fontSize: 12,
                            fontWeight: "bold"
                        }
                    },
                    labelLine: {
                        show: false
                    },
                    data: data
                }
            ]
        };

        chartInstance.setOption(option);

        const handleResize = () => chartInstance.resize();
        window.addEventListener("resize", handleResize);

        return () => {
            chartInstance.dispose();
            window.removeEventListener("resize", handleResize);
        };
    }, [data, chartName, top, isDarkMode]);

    return (
        <div>
            <div ref={chartRef} style={{ width: 200, height: 200 }} />
        </div>
    );
}
