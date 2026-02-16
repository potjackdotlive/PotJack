import React, { useEffect, useState } from "react";
import { useGetTicketPriceForToken } from "hooks/abi/useGetTicketPriceForToken";
import { useCoinBalance } from "hooks/useCoinBalance";
import { BuyTicketFooterProps } from "pages/Play/components/BuyTicketEth/components/Footer/BuyTicketFooter";
import { usePlayContext } from "pages/Play/contexts/playContext/playContextUtils";
import { getCoinDecimals } from "utils/getCoinDecimals";
import { FooterView } from "./FooterView";

export const FooterToken = ({ buyHandler, ticketCounter }: BuyTicketFooterProps) => {
  const { coin } = usePlayContext();
  const { data: walletBalance } = useCoinBalance(coin);
  const [balance, setBalance] = useState(0);
  const { formatted } = useGetTicketPriceForToken({ coin });
  const canBuy = !!Number(formatted || 0) && balance > ticketCounter * Number(formatted || 0);
  const decimals = getCoinDecimals(coin);

  useEffect(() => {
    setBalance(Number(walletBalance || 0) / decimals);
  }, [walletBalance, decimals]);

  return <FooterView balance={balance} token={coin} canBuy={canBuy} buyHandler={buyHandler} />;
};
