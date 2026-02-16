import { createContext, useContext } from "react";
import { WalletType } from "utils/enums/blockchains";
import { noop } from "utils/noop";
import { Nullable } from "utils/types";

export type WalletContextProps = {
  blockchain: Nullable<WalletType>;
  setBlockChain: (blockchain: WalletType) => void;
};

const defaultValues: WalletContextProps = {
  blockchain: null,
  setBlockChain: noop,
};

const walletContextUtils = createContext<WalletContextProps>(defaultValues);
export const useWalletContext = () => useContext<WalletContextProps>(walletContextUtils);
export const WalletContextProvider = walletContextUtils.Provider;
