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

export type Nullable<T> = T | null;

export type Address = `0x${string}`;

export type ChainIdType =
  | typeof SEPOLIA_CHAIN_ID
  | typeof SEPOLIA_ARBITRUM_CHAIN_ID
  | typeof SOLANA_CHAIN_ID
  | typeof POLYGON_AMOY_TESTNET_ID
  | typeof OPTIMISM_SEPOLIA_TESTNET_ID
  | typeof AVALANCHE_FUJI_TESTNET_ID
  | typeof BNB_SMART_CHAIN_TESTNET_ID
  | typeof BASE_SEPOLIA_TESTNET_ID;
export type CoinType =
  | SepoliaCoinType
  | ArbitrumSepoliaCoinType
  | SolanaTokens
  | PolygonAmoyCoinType
  | AvalancheFujiCoinType
  | BnbCoinType
  | BaseSepoliaCoinType
  | OptimismSepoliaCoinType;

export enum ParticipantExtraStatus {
  Whale = "Whale",
  Leader = "Leader",
  Diamond = "Diamond",
}
