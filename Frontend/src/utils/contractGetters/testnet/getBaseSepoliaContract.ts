import type { GetContractReturnType, PublicClient } from "viem";
// eslint-disable-next-line no-duplicate-imports
import { getContract } from "viem";
import { _abi } from "contracts/Raffle/factories/Raffle__factory";
import { getBaseSepoliaPublicClient } from "utils/clientGetters/testnet/getBaseSepoliaPublicClient";
import { ContractAddressBaseSepolia } from "utils/contractAddresses";

export type BaseRaffleContract = GetContractReturnType<typeof _abi, PublicClient, typeof ContractAddressBaseSepolia>;
let contract: BaseRaffleContract | null = null;

export const getBaseSepoliaRaffleContract = () => {
  if (!contract) {
    contract = getContract({
      address: ContractAddressBaseSepolia,
      abi: _abi,
      client: getBaseSepoliaPublicClient(),
    });
  }

  return contract;
};
