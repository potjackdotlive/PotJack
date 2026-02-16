import React from "react";
import { css } from "@emotion/react";
import ReactECharts from "echarts-for-react";
import { useDoughnutChart } from "pages/Play/components/MainArea/components/DoughnutChart/useDoughnutChart";
import { commonStyles } from "styles/commonStyles";

const DoughnutChart = () => {
  const { chartRef, containerRef, maxWidth, chartOptions } = useDoughnutChart();

  return (
    <div
      ref={containerRef}
      css={[
        commonStyles.fullWidth,
        css`
          max-width: ${maxWidth}px;
          height: 400px;
          min-height: 400px;
        `,
      ]}
    >
      {containerRef?.current && (
        <ReactECharts
          ref={chartRef}
          option={chartOptions}
          lazyUpdate
          notMerge
          style={{ width: "100%", height: "100%" }}
        />
      )}
    </div>
  );
};

export default DoughnutChart;
