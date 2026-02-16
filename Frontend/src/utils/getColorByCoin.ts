import { AvalancheFujiCoinType } from "utils/enums/tokens/avalancheFujiTokens";
import { BaseSepoliaCoinType } from "utils/enums/tokens/baseSepoliaTokens";
import { BnbCoinType } from "utils/enums/tokens/bnbTestnetTokens";
import { OptimismSepoliaCoinType } from "utils/enums/tokens/optimismSepoliaTokens";
import { SepoliaCoinType } from "utils/enums/tokens/sepoliaTokens";
import { SolanaTokens } from "utils/enums/tokens/solanaTokens";
import { CoinType } from "utils/types";

export const getColorByCoin = (coin: CoinType): string => {
  switch (coin) {
    case SepoliaCoinType.DAI:
      return "#FB923C";
    case SepoliaCoinType.USDC:
      return "#FBBF24";
    // case PolygonAmoyCoinType.MATIC:
    //   return "#C084FC";
    case SepoliaCoinType.Ethereum:
      return "#22D3EE";
    case SolanaTokens.Solana:
      return "#34d399";
    case OptimismSepoliaCoinType.OP:
      return "#EF4444";
    case AvalancheFujiCoinType.AVAX:
      return "#F472B6";
    case BnbCoinType.BUSD:
      return "#22D3EE";
    case BnbCoinType.BNB:
      return "#FBBF24";
    case BaseSepoliaCoinType.ETH:
      return "#38BDF8";
    default:
      return "";
  }
};
