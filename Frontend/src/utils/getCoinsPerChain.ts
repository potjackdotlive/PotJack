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
import { ArbitrumSepoliaCoinType } from "utils/enums/tokens/arbitrumSepoliaTokens";
import { AvalancheFujiCoinType } from "utils/enums/tokens/avalancheFujiTokens";
import { BaseSepoliaCoinType } from "utils/enums/tokens/baseSepoliaTokens";
import { BnbCoinType } from "utils/enums/tokens/bnbTestnetTokens";
import { OptimismSepoliaCoinType } from "utils/enums/tokens/optimismSepoliaTokens";
import { PolygonAmoyCoinType } from "utils/enums/tokens/polygonAmoyTokens";
import { SepoliaCoinType } from "utils/enums/tokens/sepoliaTokens";
import { SolanaTokens } from "utils/enums/tokens/solanaTokens";
import { ChainIdType } from "utils/types";

export const getCoinsPerChain = (
  chainId: ChainIdType | string | null,
):
  | SepoliaCoinType[]
  | ArbitrumSepoliaCoinType[]
  | SolanaTokens[]
  | PolygonAmoyCoinType[]
  | AvalancheFujiCoinType[]
  | BnbCoinType[]
  | BaseSepoliaCoinType[]
  | OptimismSepoliaCoinType[] => {
  switch (Number(chainId)) {
    case SEPOLIA_CHAIN_ID:
      return [SepoliaCoinType.DAI, SepoliaCoinType.USDC, SepoliaCoinType.Ethereum];
    case SEPOLIA_ARBITRUM_CHAIN_ID:
      return [ArbitrumSepoliaCoinType.Ethereum, ArbitrumSepoliaCoinType.USDC];
    case SOLANA_CHAIN_ID:
      return [SolanaTokens.Solana];
    case POLYGON_AMOY_TESTNET_ID:
      return [PolygonAmoyCoinType.USDC];
    case OPTIMISM_SEPOLIA_TESTNET_ID:
      return [OptimismSepoliaCoinType.ETH, OptimismSepoliaCoinType.OP];
    case AVALANCHE_FUJI_TESTNET_ID:
      return [AvalancheFujiCoinType.AVAX];
    case BNB_SMART_CHAIN_TESTNET_ID:
      return [BnbCoinType.BNB, BnbCoinType.BUSD];
    case BASE_SEPOLIA_TESTNET_ID:
      return [BaseSepoliaCoinType.ETH];
    default:
      return [];
  }
};
