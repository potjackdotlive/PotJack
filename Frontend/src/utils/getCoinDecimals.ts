import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { ArbitrumSepoliaCoinType } from "utils/enums/tokens/arbitrumSepoliaTokens";
import { AvalancheFujiCoinType } from "utils/enums/tokens/avalancheFujiTokens";
import { BaseSepoliaCoinType } from "utils/enums/tokens/baseSepoliaTokens";
import { BnbCoinType } from "utils/enums/tokens/bnbTestnetTokens";
import { OptimismSepoliaCoinType } from "utils/enums/tokens/optimismSepoliaTokens";
import { SepoliaCoinType } from "utils/enums/tokens/sepoliaTokens";
import { SolanaTokens } from "utils/enums/tokens/solanaTokens";
import { CoinType } from "utils/types";

// todo: update for mainnet
export const getCoinDecimals = (coin: CoinType | null) => {
  switch (coin) {
    case SolanaTokens.Solana:
      return LAMPORTS_PER_SOL;
    case SepoliaCoinType.Ethereum:
    case ArbitrumSepoliaCoinType.Ethereum:
    case OptimismSepoliaCoinType.OP:
    case OptimismSepoliaCoinType.ETH:
    case BnbCoinType.BNB:
    case BnbCoinType.BUSD:
    case AvalancheFujiCoinType.AVAX:
    case BaseSepoliaCoinType.ETH:
      return 1e18;
    case SepoliaCoinType.USDC:
    case ArbitrumSepoliaCoinType.USDC:
      return 1e6;
    case SepoliaCoinType.DAI:
      return 1e18;
    default:
      return 1e6;
  }
};
