import { FC } from "react";
import { css } from "@emotion/react";
import TokenSolIcon from "icons/tokens/tocken_sol.svg?react";
import TokenAvaxIcon from "icons/tokens/token_avax.svg?react";
import TokenBaseIcon from "icons/tokens/token_base.svg?react";
import TokenBnbIcon from "icons/tokens/token_bnb.svg?react";
import TokenBusdIcon from "icons/tokens/token_busd.svg?react";
import TokenDaiIcon from "icons/tokens/token_dai.svg?react";
import TokenEthereumIcon from "icons/tokens/token_eth.svg?react";
import TokenOpIcon from "icons/tokens/token_optimism.svg?react";
import TokenUsdcIcon from "icons/tokens/token_usdc.svg?react";
import { AvalancheFujiCoinType } from "utils/enums/tokens/avalancheFujiTokens";
import { BnbCoinType } from "utils/enums/tokens/bnbTestnetTokens";
import { OptimismSepoliaCoinType } from "utils/enums/tokens/optimismSepoliaTokens";
import { PolygonAmoyCoinType } from "utils/enums/tokens/polygonAmoyTokens";
import { SepoliaCoinType } from "utils/enums/tokens/sepoliaTokens";
import { SolanaTokens } from "utils/enums/tokens/solanaTokens";
import { CoinType } from "utils/types";

type Props = {
  token: CoinType;
  width?: number;
  height?: number;
};

export const CoinIconProvider: FC<Props> = ({ token, height = 40, width = 40 }) => {
  const style = css`
    width: ${width}px;
    height: ${height}px;
    flex-shrink: 0;
    border-radius: ${width}px;
  `;

  switch (token) {
    case SepoliaCoinType.Ethereum:
    case OptimismSepoliaCoinType.ETH:
      return <TokenEthereumIcon css={style} style={{ width, height }} />;
    case SepoliaCoinType.DAI:
      return <TokenDaiIcon css={style} style={{ width, height }} />;
    case "BASE" as CoinType:
      return <TokenBaseIcon css={style} style={{ width, height }} />;
    case OptimismSepoliaCoinType.OP:
      return <TokenOpIcon css={style} style={{ width, height }} />;
    case BnbCoinType.BUSD:
      return <TokenBusdIcon css={style} style={{ width, height }} />;
    case BnbCoinType.BNB:
      return <TokenBnbIcon css={style} style={{ width, height }} />;
    case AvalancheFujiCoinType.AVAX:
      return <TokenAvaxIcon css={style} style={{ width, height }} />;
    case PolygonAmoyCoinType.USDC:
    case SepoliaCoinType.USDC:
      return <TokenUsdcIcon css={style} style={{ width, height }} />;
    case SolanaTokens.Solana:
      return <TokenSolIcon css={style} style={{ width, height }} />;
    default:
      return <></>;
  }
};
