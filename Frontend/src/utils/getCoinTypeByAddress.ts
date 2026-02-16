import { Address } from "viem";
import {
  AVALANCHE_FUJI_TESTNET_ID,
  BASE_SEPOLIA_TESTNET_ID,
  BNB_SMART_CHAIN_TESTNET_ID,
  OPTIMISM_SEPOLIA_TESTNET_ID,
  POLYGON_AMOY_TESTNET_ID,
  SEPOLIA_ARBITRUM_CHAIN_ID,
  SEPOLIA_CHAIN_ID,
} from "utils/constants/chainsConstants";
import { ArbitrumSepoliaTokenAddresses } from "utils/enums/addresses/arbitrumSepoliaTokenAddresses";
import { avalancheFujiTokenAddresses } from "utils/enums/addresses/avalancheFujiTokenAddresses";
import { baseSepoliaTokenAddresses } from "utils/enums/addresses/baseSepoliaTokenAddresses";
import { bnbSepoliaTokenAddresses } from "utils/enums/addresses/bnbSepoliaTokenAddresses";
import { optimismSepoliaTokenAddresses } from "utils/enums/addresses/optimismSepoliaTokenAddresses";
import { PolygonAmoyTokenAddresses } from "utils/enums/addresses/polygonAmoyTokenAddresses";
import { SepoliaTokenAddresses } from "utils/enums/addresses/sepoliaTokenAddresses";
import { ArbitrumSepoliaCoinType } from "utils/enums/tokens/arbitrumSepoliaTokens";
import { AvalancheFujiCoinType } from "utils/enums/tokens/avalancheFujiTokens";
import { BaseSepoliaCoinType } from "utils/enums/tokens/baseSepoliaTokens";
import { BnbCoinType } from "utils/enums/tokens/bnbTestnetTokens";
import { OptimismSepoliaCoinType } from "utils/enums/tokens/optimismSepoliaTokens";
import { PolygonAmoyCoinType } from "utils/enums/tokens/polygonAmoyTokens";
import { SepoliaCoinType } from "utils/enums/tokens/sepoliaTokens";
import { ChainIdType } from "utils/types";

const SepoliaSet = {
  [SepoliaTokenAddresses[SepoliaCoinType.USDC]]: SepoliaCoinType.USDC,
  [SepoliaTokenAddresses[SepoliaCoinType.DAI]]: SepoliaCoinType.DAI,
  [SepoliaTokenAddresses[SepoliaCoinType.Ethereum]]: SepoliaCoinType.Ethereum,
};

const ArbitrumSepoliaSet = {
  [ArbitrumSepoliaTokenAddresses[ArbitrumSepoliaCoinType.USDC]]: ArbitrumSepoliaCoinType.USDC,
  [ArbitrumSepoliaTokenAddresses[ArbitrumSepoliaCoinType.Ethereum]]: ArbitrumSepoliaCoinType.Ethereum,
};

const PolygonAmoySet = {
  // [PolygonAmoyTokenAddresses[PolygonAmoyCoinType.MATIC]]: PolygonAmoyCoinType.MATIC,
  [PolygonAmoyTokenAddresses[PolygonAmoyCoinType.USDC]]: PolygonAmoyCoinType.USDC,
};

const OptimismSepoliaSet = {
  [optimismSepoliaTokenAddresses[OptimismSepoliaCoinType.OP]]: OptimismSepoliaCoinType.OP,
  [optimismSepoliaTokenAddresses[OptimismSepoliaCoinType.ETH]]: OptimismSepoliaCoinType.ETH,
};

const BaseSepoliaSet = {
  [baseSepoliaTokenAddresses[BaseSepoliaCoinType.ETH]]: BaseSepoliaCoinType.ETH,
};

const AvalancheFujiSet = {
  [avalancheFujiTokenAddresses[AvalancheFujiCoinType.AVAX]]: AvalancheFujiCoinType.AVAX,
};

const BnbSepoliaSet = {
  [bnbSepoliaTokenAddresses[BnbCoinType.BNB]]: BnbCoinType.BNB,
  [bnbSepoliaTokenAddresses[BnbCoinType.BUSD]]: BnbCoinType.BUSD,
};

type Props = {
  chainId: ChainIdType | string;
  coinAddress: Address;
};

// todo: mainnet
export const getCoinTypeByAddress = ({
  chainId,
  coinAddress,
}: Props):
  | SepoliaCoinType
  | BnbCoinType
  | ArbitrumSepoliaCoinType
  | OptimismSepoliaCoinType
  | AvalancheFujiCoinType
  | PolygonAmoyCoinType
  | BaseSepoliaCoinType
  | null => {
  switch (Number(chainId)) {
    case SEPOLIA_CHAIN_ID:
      return SepoliaSet[coinAddress];
    case POLYGON_AMOY_TESTNET_ID:
      return PolygonAmoySet[coinAddress];
    case AVALANCHE_FUJI_TESTNET_ID:
      return AvalancheFujiSet[coinAddress];
    case BASE_SEPOLIA_TESTNET_ID:
      return BaseSepoliaSet[coinAddress];
    case OPTIMISM_SEPOLIA_TESTNET_ID:
      return OptimismSepoliaSet[coinAddress];
    case SEPOLIA_ARBITRUM_CHAIN_ID:
      return ArbitrumSepoliaSet[coinAddress];
    case BNB_SMART_CHAIN_TESTNET_ID:
      return BnbSepoliaSet[coinAddress];
    default:
      return null;
  }
};
