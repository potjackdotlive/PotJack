import { ArbitrumSepoliaCoinType } from "utils/enums/tokens/arbitrumSepoliaTokens";
import { AvalancheFujiCoinType } from "utils/enums/tokens/avalancheFujiTokens";
import { BaseSepoliaCoinType } from "utils/enums/tokens/baseSepoliaTokens";
import { BnbCoinType } from "utils/enums/tokens/bnbTestnetTokens";
import { OptimismSepoliaCoinType } from "utils/enums/tokens/optimismSepoliaTokens";
import { SepoliaCoinType } from "utils/enums/tokens/sepoliaTokens";
import { SolanaTokens } from "utils/enums/tokens/solanaTokens";
import { CoinType } from "utils/types";

export const getCoinFullName = (coin: CoinType) => {
  switch (coin) {
    case SolanaTokens.Solana:
      return "SOL";
    case OptimismSepoliaCoinType.OP:
      return "OP";
    case BaseSepoliaCoinType.ETH:
    case OptimismSepoliaCoinType.ETH:
    case SepoliaCoinType.Ethereum:
    case ArbitrumSepoliaCoinType.Ethereum:
      return "Ethereum";
    case AvalancheFujiCoinType.AVAX:
      return "AVAX";
    case BnbCoinType.BUSD:
      return "BUSD";
    case BnbCoinType.BNB:
      return "BNB";
    case SepoliaCoinType.DAI:
      return "DAI";
    // case PolygonAmoyCoinType.MATIC:
    //   return "MATIC";
    case SepoliaCoinType.USDC:
    case ArbitrumSepoliaCoinType.USDC:
      return "USDC";
    default:
      return "";
  }
};
