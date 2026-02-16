import { FC } from "react";
import CountUp from "react-countup";
import { Statistic, StatisticProps, Typography } from "antd";
import { useStyles } from "pages/Play/components/Hero/components/Counter/useStyles";

type Props = {
  from?: number;
  duration?: number;
  to: number;
};

const formatter: StatisticProps["formatter"] = (value) => (
  <CountUp end={value as number} duration={2} decimalPlaces={6} decimals={6} separator="," />
);

const Counter: FC<Props> = ({ to }) => {
  const styles = useStyles();

  return (
    <Typography.Title level={3} css={styles.text}>
      <Statistic value={to} formatter={formatter} />
    </Typography.Title>
  );
};

export default Counter;
