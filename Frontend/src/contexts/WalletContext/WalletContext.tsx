import { FC, PropsWithChildren, useState } from "react";
import { WalletType } from "utils/enums/blockchains";
import { WalletContextProps, WalletContextProvider } from "./walletContextUtils";

const WalletContext: FC<PropsWithChildren> = ({ children }) => {
  const [state, setState] = useState<Pick<WalletContextProps, "blockchain">>({
    blockchain: WalletType.Ethereum,
  });

  const setBlockChain = (blockchain: WalletType) => {
    setState((prevState) => ({ ...prevState, blockchain }));
  };

  return (
    <WalletContextProvider
      value={{
        blockchain: state.blockchain,
        setBlockChain,
      }}
    >
      {children}
    </WalletContextProvider>
  );
};

export default WalletContext;
