import { Flex } from "antd";
import DoughnutChart from "pages/Play/components/MainArea/components/DoughnutChart/DoughnutChart";
import Header from "pages/Play/components/MainArea/components/Header";
import { HeaderWithCoin } from "pages/Play/components/MainArea/components/HeaderWithCoin";
import { PlayContainer } from "pages/Play/components/PlayContainer/PlayContainer";
import { usePlayContext } from "pages/Play/contexts/playContext/playContextUtils";
import { commonStyles } from "styles/commonStyles";

export const MainArea = () => {
  const { coin } = usePlayContext();

  return (
    <PlayContainer customCss={{ flexGrow: 1 }}>
      <Flex vertical align="flex-start" gap={48} css={[commonStyles.fullWidth, commonStyles.fullHeight]}>
        {coin ? <HeaderWithCoin /> : <Header />}
        <DoughnutChart />
      </Flex>
    </PlayContainer>
  );
};
