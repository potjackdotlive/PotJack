import { useMemo } from "react";
import type { EChartsOption, RegisteredSeriesOption } from "echarts/types/dist/echarts";

declare type Values<T> = T[keyof T];
export const useBaseChartOptions = (): EChartsOption =>
  useMemo(
    () => ({
      tooltip: {
        confine: true,
        trigger: "item",
        axisPointer: {
          type: "shadow",
        },
        className: "tooltip-design",
        textStyle: { color: "#fff" },
      },
      title: {
        show: true,
        text: "",
        left: "center",
        top: "45%",
        zlevel: -1,
        textStyle: {
          color: "#fff",
          fontFamily: '"Geist Mono Variable", sans-serif',
          fontSize: 24,
          fontStyle: "normal",
          fontWeight: 600,
          lineHeight: 28 /* 112.5% */,
        },
        subtext: "BTC",
        subtextStyle: {
          fontFamily: '"Geist Variable", sans-serif',
          fontSize: 14,
          fontStyle: "normal",
          fontWeight: 500,
          lineHeight: 20 /* 142.857% */,
        },
      },
      series: [
        {
          data: [],
          name: "",
          type: "pie",
          radius: ["50%", "92%"],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: "#131313",
            borderWidth: 1,
          },
          label: {
            show: false,
            position: "center",
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 20,
              fontWeight: "bold",
            },
          },
          labelLine: {
            show: false,
          },
        },
      ] as Values<RegisteredSeriesOption>[],
    }),
    [],
  );
