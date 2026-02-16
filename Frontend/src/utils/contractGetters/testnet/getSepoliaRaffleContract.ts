import type { GetContractReturnType, PublicClient } from "viem";
// eslint-disable-next-line no-duplicate-imports
import { getContract } from "viem";
import { _abi } from "contracts/Raffle/factories/Raffle__factory";
import { getSepoliaPublicClient } from "utils/clientGetters/testnet/getSepoliaPublicClient";
import { ContractAddressSepolia } from "utils/contractAddresses";

export type SepoliaRaffleContract = GetContractReturnType<typeof _abi, PublicClient, typeof ContractAddressSepolia>;
let contract: SepoliaRaffleContract | null = null;

export const getSepoliaRaffleContract = () => {
  if (!contract) {
    contract = getContract({
      address: ContractAddressSepolia,
      abi: _abi,
      client: getSepoliaPublicClient(),
    });
  }

  return contract;
};
