import { FooterEvmNative } from "pages/Play/components/BuyTicketEth/components/Footer/FooterEvmNative";
import { FooterToken } from "pages/Play/components/BuyTicketEth/components/Footer/FooterToken";
import { usePlayContext } from "pages/Play/contexts/playContext/playContextUtils";
import { AvalancheFujiCoinType } from "utils/enums/tokens/avalancheFujiTokens";
import { BnbCoinType } from "utils/enums/tokens/bnbTestnetTokens";
import { SepoliaCoinType } from "utils/enums/tokens/sepoliaTokens";
import { SolanaTokens } from "utils/enums/tokens/solanaTokens";
import { Noop } from "utils/noop";
import { FooterSol } from "./FooterSol";

export type BuyTicketFooterProps = { buyHandler: Noop; ticketCounter: number; slippage: string };

export const BuyTicketFooter = (props: BuyTicketFooterProps) => {
  const { coin } = usePlayContext();

  switch (coin) {
    case SepoliaCoinType.Ethereum:
    case AvalancheFujiCoinType.AVAX:
    case BnbCoinType.BNB:
      // case PolygonAmoyCoinType.MATIC:
      return <FooterEvmNative {...props} />;
    case SolanaTokens.Solana:
      return <FooterSol {...props} />;
    case null:
      return null;
    default:
      return <FooterToken {...props} />;
  }
};
