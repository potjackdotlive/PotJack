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
import { ArbitrumSepoliaAddressToToken } from "utils/enums/addresses/arbitrumSepoliaTokenAddresses";
import { AvalancheFujiAddressToToken } from "utils/enums/addresses/avalancheFujiTokenAddresses";
import { BaseSepoliaAddressToToken } from "utils/enums/addresses/baseSepoliaTokenAddresses";
import { bnbSepoliaAddressToToken } from "utils/enums/addresses/bnbSepoliaTokenAddresses";
import { OptimismSepoliaAddressToToken } from "utils/enums/addresses/optimismSepoliaTokenAddresses";
import { PolygonAmoyAddressToToken } from "utils/enums/addresses/polygonAmoyTokenAddresses";
import { SepoliaAddressToToken } from "utils/enums/addresses/sepoliaTokenAddresses";
import { SolanaAddressToToken } from "utils/enums/addresses/solanaTokenAddresses";
import { ChainIdType, CoinType } from "utils/types";

export const getAddressToTokenSet = (chainId: ChainIdType | string | number): Record<Address, CoinType> | null => {
  switch (Number(chainId)) {
    case SEPOLIA_CHAIN_ID:
      return SepoliaAddressToToken;
    case SEPOLIA_ARBITRUM_CHAIN_ID:
      return ArbitrumSepoliaAddressToToken;
    case POLYGON_AMOY_TESTNET_ID:
      return PolygonAmoyAddressToToken;
    case OPTIMISM_SEPOLIA_TESTNET_ID:
      return OptimismSepoliaAddressToToken;
    case AVALANCHE_FUJI_TESTNET_ID:
      return AvalancheFujiAddressToToken;
    case BNB_SMART_CHAIN_TESTNET_ID:
      return bnbSepoliaAddressToToken;
    case BASE_SEPOLIA_TESTNET_ID:
      return BaseSepoliaAddressToToken;
    case SOLANA_CHAIN_ID:
      return SolanaAddressToToken as Record<Address, CoinType>;
    default:
      return null;
  }
};
