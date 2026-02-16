import type { GetContractReturnType, PublicClient } from "viem";
// eslint-disable-next-line no-duplicate-imports
import { getContract } from "viem";
import { _abi } from "contracts/Raffle/factories/Raffle__factory";
import { getOptimismPublicClient } from "utils/clientGetters/mainnet/getOptimismPublicClient";
import { ContractAddressOptimism } from "utils/contractAddresses";

export type OptimismRaffleContract = GetContractReturnType<typeof _abi, PublicClient, typeof ContractAddressOptimism>;
let contract: OptimismRaffleContract | null = null;

export const geOptimismRaffleContract = (): OptimismRaffleContract | null => {
  if (!contract && ContractAddressOptimism) {
    contract = getContract({
      address: ContractAddressOptimism,
      abi: _abi,
      // todo: update for mainnet
      client: getOptimismPublicClient(),
    });
  }

  return contract;
};
