import { useTranslation } from "react-i18next";
import { Flex } from "antd";
import { getChainNameById } from "components/BlockchainSelector/utils";
import ChipButton from "components/ChipButton/ChipButton";
import InfoTitle from "pages/Play/components/InfoTitle";
import { NetworkList } from "pages/Play/components/NetworkList/NetworkList";
import { PlayContainer } from "pages/Play/components/PlayContainer/PlayContainer";
import { RaffleList } from "pages/Play/components/RaffleList/RaffleList";
import { MultichainListItem } from "pages/Play/components/RaffleListItem/components/MultichainListItemt";
import { usePlayContext } from "pages/Play/contexts/playContext/playContextUtils";
import { playStyles as styles } from "pages/Play/styles";
import { commonStyles } from "styles/commonStyles";
import { TXT_ALL_POOLS, TXT_ENTRIES, TXT_ENTRIES_INFO } from "translations";
import { getColorByChain } from "utils/getColorByChain";
import { ChainIdType } from "utils/types";

export const NavigationBlock = () => {
  const { t } = useTranslation();
  const { setCoin, setNetworkId, networkId, setRoundData } = usePlayContext();

  const handleMultichainClick = () => {
    setCoin(null);
    setNetworkId(null);
    setRoundData({ roundId: null });
  };

  return (
    <PlayContainer css={styles.sideBar}>
      <Flex gap={8} justify="space-between" css={commonStyles.fullWidth}>
        <InfoTitle main={t(TXT_ENTRIES)} info={t(TXT_ENTRIES_INFO)} />
        <ChipButton
          text={networkId === null ? t(TXT_ALL_POOLS) : getChainNameById(networkId as ChainIdType)}
          size="small"
          pinColor={getColorByChain(networkId as ChainIdType)}
        />
      </Flex>

      <Flex vertical gap={8} css={commonStyles.fullWidth}>
        <MultichainListItem
          rootStyles={[styles.multichainItem, ...(networkId ? [] : [styles.multichainItemActive])]}
          onClick={handleMultichainClick}
        />
        {networkId ? <RaffleList /> : <NetworkList />}
      </Flex>
    </PlayContainer>
  );
};
