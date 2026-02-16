import { ArbitrumSepoliaCoinType } from "utils/enums/tokens/arbitrumSepoliaTokens";
import { AvalancheFujiCoinType } from "utils/enums/tokens/avalancheFujiTokens";
import { BaseSepoliaCoinType } from "utils/enums/tokens/baseSepoliaTokens";
import { BnbCoinType } from "utils/enums/tokens/bnbTestnetTokens";
import { OptimismSepoliaCoinType } from "utils/enums/tokens/optimismSepoliaTokens";
import { PolygonAmoyCoinType } from "utils/enums/tokens/polygonAmoyTokens";
import { SepoliaCoinType } from "utils/enums/tokens/sepoliaTokens";
import { SolanaTokens } from "utils/enums/tokens/solanaTokens";

export const TOP_LEADERS_LIMIT = 3;
export const LEADERS_LIMIT = 20;
export const LEADERS_POLL_INTERVAL = 5000 * (import.meta.env.DEV ? 1000 : 1);

// todo: mainnet
export const ethCoinTypes = [ArbitrumSepoliaCoinType.Ethereum, SepoliaCoinType.Ethereum];
export const solCoinTypes = [SolanaTokens.Solana];
export const polygonCoinTypes = [PolygonAmoyCoinType.USDC];
export const avalancheCoinTypes = [AvalancheFujiCoinType.AVAX];
export const baseCoinTypes = [BaseSepoliaCoinType.ETH];
export const bnbCoinTypes = [BnbCoinType.BNB, BnbCoinType.BUSD];
export const optimismCoinTypes = [OptimismSepoliaCoinType.ETH, OptimismSepoliaCoinType.OP];
