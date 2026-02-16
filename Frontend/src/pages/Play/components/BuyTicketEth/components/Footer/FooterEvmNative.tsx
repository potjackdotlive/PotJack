import React from "react";
import { useBalance, useConnection } from "wagmi";
import { useGetTicketPriceInEth } from "hooks/abi/useGetTicketPriceInEth";
import { BuyTicketFooterProps } from "pages/Play/components/BuyTicketEth/components/Footer/BuyTicketFooter";
import { SepoliaCoinType } from "utils/enums/tokens/sepoliaTokens";
import { toBig } from "utils/toBig";
import { FooterView } from "./FooterView";

export const FooterEvmNative = ({ buyHandler, ticketCounter }: BuyTicketFooterProps) => {
  const { price } = useGetTicketPriceInEth({ amount: ticketCounter });
  const { address } = useConnection();
  const { data: balance } = useBalance({
    address,
    query: {
      staleTime: 5000,
    },
  });

  const numberBalance = balance?.decimals
    ? toBig(balance?.value || 0)
        .div(10 ** balance?.decimals)
        .toNumber()
    : 0;

  const canBuy = toBig(price || 0).lt(balance?.value?.toString() || 0);

  return (
    <FooterView balance={numberBalance} buyHandler={buyHandler} token={SepoliaCoinType.Ethereum} canBuy={canBuy} />
  );
};
