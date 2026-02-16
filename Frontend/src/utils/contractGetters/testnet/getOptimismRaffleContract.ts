import type { GetContractReturnType, PublicClient } from "viem";
// eslint-disable-next-line no-duplicate-imports
import { getContract } from "viem";
import { _abi } from "contracts/Raffle/factories/Raffle__factory";
import { getOptimismSepoliaPublicClient } from "utils/clientGetters/testnet/getOptimismSepoliaPublicClient";
import { ContractAddressOptimismSepolia } from "utils/contractAddresses";

export type OptimismRaffleContract = GetContractReturnType<
  typeof _abi,
  PublicClient,
  typeof ContractAddressOptimismSepolia
>;
let contract: OptimismRaffleContract | null = null;

export const getOptimismSepoliaRaffleContract = () => {
  if (!contract) {
    contract = getContract({
      address: ContractAddressOptimismSepolia,
      abi: _abi,
      client: getOptimismSepoliaPublicClient(),
    });
  }

  return contract;
};
