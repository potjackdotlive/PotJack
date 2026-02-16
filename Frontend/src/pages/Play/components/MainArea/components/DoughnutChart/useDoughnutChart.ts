import { useEffect, useLayoutEffect, useRef } from "react";
import useBreakpoint from "antd/es/grid/hooks/useBreakpoint";
import ReactECharts from "echarts-for-react";
import { useChartOptions } from "pages/Play/components/MainArea/hooks/useChartOptions";
import { useHighlightContext } from "pages/Play/contexts/chartHighlightContext/chartHighlightContextUtils";

export const useDoughnutChart = () => {
  const chartRef = useRef<ReactECharts | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const chartOptions = useChartOptions();
  const { xl, lg } = useBreakpoint();
  const { setHighlightedItem } = useHighlightContext();

  useLayoutEffect(() => {
    if (!chartRef.current || !containerRef.current) {
      return;
    }

    const resizeHandler = () => {
      chartRef.current?.getEchartsInstance().resize();
      if (containerRef.current) {
        containerRef.current.style.height = `${400}px`;
      }
    };

    const observer = new ResizeObserver(() => {
      resizeHandler();
    });

    observer.observe(document.documentElement);

    setTimeout(resizeHandler, 0);

    return () => {
      observer.disconnect();
    };
  }, []);

  useLayoutEffect(() => {
    if (!containerRef.current) {
      return;
    }

    const resizeHandler = (num: number) => {
      if (containerRef.current) {
        containerRef.current.style.height = `${num}px`;
      }
    };

    setTimeout(() => {
      resizeHandler(401);
      resizeHandler(400);
    }, 0);
  }, [containerRef]);

  const maxWidth = xl === false && lg === true ? 1115 : 702;

  useEffect(() => {
    if (!chartRef?.current) {
      return;
    }

    chartRef.current.getEchartsInstance().on("mouseover", (e) => {
      const data = e.data as unknown as { groupName?: string; playerAddress?: string };

      if (data?.groupName) {
        setHighlightedItem(data.groupName);
      }

      if (data?.playerAddress) {
        setHighlightedItem(data.playerAddress);
      }
    });

    chartRef.current.getEchartsInstance().on("mouseout", () => {
      setHighlightedItem(null);
    });
  }, [chartRef]);

  return {
    chartOptions,
    chartRef,
    containerRef,
    maxWidth,
  };
};
