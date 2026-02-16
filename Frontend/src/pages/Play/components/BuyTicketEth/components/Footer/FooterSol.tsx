import React from "react";
import { BuyTicketFooterProps } from "pages/Play/components/BuyTicketEth/components/Footer/BuyTicketFooter";
import { usePlayContext } from "pages/Play/contexts/playContext/playContextUtils";
import { useGetTicketPriceForSol } from "pages/Play/hooks/useGetTicketPriceForSol";
import { useSolBalance } from "pages/Play/hooks/useSolBalance";
import { FooterView } from "./FooterView";

export const FooterSol = ({ buyHandler, ticketCounter }: BuyTicketFooterProps) => {
  const { coin } = usePlayContext();
  const balance = useSolBalance();
  const { data: ticketPrice, isLoading, isError } = useGetTicketPriceForSol();
  const canBuy = Number(balance) > (ticketPrice || 0) * ticketCounter;

  return (
    <FooterView
      balance={Number(balance)}
      token={coin}
      canBuy={!isError && canBuy && !isLoading && !!ticketPrice}
      buyHandler={buyHandler}
    />
  );
};
