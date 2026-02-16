import * as React from "react";
import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { Flex } from "antd";
import { ROUTES } from "constants/routes";
import { useGetTicketPriceInBtc } from "hooks/abi/useGetTicketPriceInBtc";
import { useMediaQueryMatches } from "hooks/useMediaQueryMatches";
import { MainArea } from "pages/Play/components/MainArea/MainArea";
import PersonalHub from "pages/Play/components/PersonalHub";
import { ChartHighlightContext } from "pages/Play/contexts/chartHighlightContext/ChartHighlightContext";
import { PlayContext } from "pages/Play/contexts/playContext/PlayContext";
import { useContractAddressesLog } from "pages/Play/hooks/useContractAddressesLog";
import { useEndTime } from "pages/Play/hooks/useEndTime";
import { useRaffleRoundsAllNetworks } from "pages/Play/hooks/useRaffleRoundsAllNetworks";
import { NavigationBlock } from "pages/Play/NavigationBlock";
import { PlayersBlock } from "pages/Play/PlayersBlock";
import { playStyles as styles } from "pages/Play/styles";
import { commonStyles } from "styles/commonStyles";
import { SOLANA_CHAIN_ID, SUPPORTED_ETH_CHAINS, SUPPORTED_SOL_CHAINS } from "utils/constants/chainsConstants";
import { SepoliaTokenAddresses } from "utils/enums/addresses/sepoliaTokenAddresses";
import { SepoliaCoinType } from "utils/enums/tokens/sepoliaTokens";
import { SolanaTokens } from "utils/enums/tokens/solanaTokens";
import { ChainIdType, CoinType } from "utils/types";
import Hero from "./components/Hero";
import { useRaffleEventHandling } from "./hooks/useRaffleEventHandling";

const PlayContent = () => {
  const containerRef = useRef(null);
  const { xl } = useMediaQueryMatches();
  const { totalTicketsWithoutBonus, raffleRounds } = useRaffleRoundsAllNetworks();
  const btcPerTicket = useGetTicketPriceInBtc();

  useContractAddressesLog();
  useRaffleEventHandling();

  useEndTime({ raffleRounds });

  return (
    <div ref={containerRef}>
      <Hero totalPool={totalTicketsWithoutBonus * btcPerTicket || 0} />
      <div css={[styles.root, !xl && commonStyles.flexDirectionColumn]}>
        {xl && <NavigationBlock />}

        <Flex vertical gap={8} css={styles.centerWrapper}>
          <MainArea />
          <PersonalHub containerRef={containerRef} />
        </Flex>

        <PlayersBlock />
      </div>
    </div>
  );
};

const Play = () => {
  const params = useParams<{ network: string; token: CoinType }>();

  const networkId = [...SUPPORTED_ETH_CHAINS, ...SUPPORTED_SOL_CHAINS].includes(Number(params.network))
    ? Number(params.network)
    : null;

  const coin =
    networkId === SOLANA_CHAIN_ID
      ? SolanaTokens.Solana
      : SepoliaTokenAddresses[params.token as SepoliaCoinType]
        ? params.token
        : null;

  useEffect(() => {
    history.pushState({}, "", ROUTES.Play);
  }, []);

  return (
    <PlayContext networkId={networkId as ChainIdType} coin={coin as CoinType}>
      <ChartHighlightContext>
        <PlayContent />
      </ChartHighlightContext>
    </PlayContext>
  );
};

export default Play;
