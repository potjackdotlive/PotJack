import { Address } from "viem";
import {
  AVALANCHE_FUJI_TESTNET_ID,
  BASE_SEPOLIA_TESTNET_ID,
  BNB_SMART_CHAIN_TESTNET_ID,
  OPTIMISM_SEPOLIA_TESTNET_ID,
  POLYGON_AMOY_TESTNET_ID,
  SEPOLIA_ARBITRUM_CHAIN_ID,
  SEPOLIA_CHAIN_ID,
  SOLANA_CHAIN_ID,
} from "utils/constants/chainsConstants";
import { ArbitrumSepoliaTokenAddresses } from "utils/enums/addresses/arbitrumSepoliaTokenAddresses";
import { avalancheFujiTokenAddresses } from "utils/enums/addresses/avalancheFujiTokenAddresses";
import { baseSepoliaTokenAddresses } from "utils/enums/addresses/baseSepoliaTokenAddresses";
import { bnbSepoliaTokenAddresses } from "utils/enums/addresses/bnbSepoliaTokenAddresses";
import { optimismSepoliaTokenAddresses } from "utils/enums/addresses/optimismSepoliaTokenAddresses";
import { PolygonAmoyTokenAddresses } from "utils/enums/addresses/polygonAmoyTokenAddresses";
import { SepoliaTokenAddresses } from "utils/enums/addresses/sepoliaTokenAddresses";
import { SolanaTokenAddress } from "utils/enums/addresses/solanaTokenAddresses";
import { ArbitrumSepoliaCoinType } from "utils/enums/tokens/arbitrumSepoliaTokens";
import { AvalancheFujiCoinType } from "utils/enums/tokens/avalancheFujiTokens";
import { BaseSepoliaCoinType } from "utils/enums/tokens/baseSepoliaTokens";
import { BnbCoinType } from "utils/enums/tokens/bnbTestnetTokens";
import { OptimismSepoliaCoinType } from "utils/enums/tokens/optimismSepoliaTokens";
import { PolygonAmoyCoinType } from "utils/enums/tokens/polygonAmoyTokens";
import { SepoliaCoinType } from "utils/enums/tokens/sepoliaTokens";
import { ChainIdType, CoinType } from "utils/types";

type Props = {
  chainId: ChainIdType | null | string;
  coin: CoinType | null;
};

export const getTokenAddress = ({ chainId, coin }: Props): Address | string | null => {
  if (!coin) return null;

  // todo: update for mainnet
  switch (Number(chainId)) {
    case SEPOLIA_ARBITRUM_CHAIN_ID:
      return ArbitrumSepoliaTokenAddresses[coin as ArbitrumSepoliaCoinType] || null;
    case OPTIMISM_SEPOLIA_TESTNET_ID:
      return optimismSepoliaTokenAddresses[coin as OptimismSepoliaCoinType] || null;
    case BASE_SEPOLIA_TESTNET_ID:
      return baseSepoliaTokenAddresses[coin as BaseSepoliaCoinType] || null;
    case SEPOLIA_CHAIN_ID:
      return SepoliaTokenAddresses[coin as SepoliaCoinType] || null;
    case AVALANCHE_FUJI_TESTNET_ID:
      return avalancheFujiTokenAddresses[coin as AvalancheFujiCoinType] || null;
    case BNB_SMART_CHAIN_TESTNET_ID:
      return bnbSepoliaTokenAddresses[coin as BnbCoinType] || null;
    case SOLANA_CHAIN_ID:
      return SolanaTokenAddress[coin] || null;
    case POLYGON_AMOY_TESTNET_ID:
      return PolygonAmoyTokenAddresses[coin as PolygonAmoyCoinType] || null;
    default:
      return null;
  }
};
