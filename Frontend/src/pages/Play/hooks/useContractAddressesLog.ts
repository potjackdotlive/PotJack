import { useEffect } from "react";
import {
  ContractAddressArbitrumSepolia,
  ContractAddressAvalancheFuji,
  ContractAddressBaseSepolia,
  ContractAddressBnbSmartChainTestnet,
  ContractAddressOptimismSepolia,
  ContractAddressPolygonAmoy,
  ContractAddressSepolia,
  ContractAddressSolidity,
} from "utils/contractAddresses";

export const useContractAddressesLog = () => {
  useEffect(() => {
    console.info("====================================");
    console.info("Active contract addresses: ", {
      ContractAddressSepolia,
      ContractAddressArbitrumSepolia,
      ContractAddressPolygonAmoy,
      ContractAddressOptimismSepolia,
      ContractAddressAvalancheFuji,
      ContractAddressBnbSmartChainTestnet,
      ContractAddressBaseSepolia,
      ContractAddressSolidity,
    });
    console.info("====================================");
  }, []);
};
