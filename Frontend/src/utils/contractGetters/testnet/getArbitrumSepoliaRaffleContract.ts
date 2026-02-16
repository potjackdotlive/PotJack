import type { GetContractReturnType, PublicClient } from "viem";
// eslint-disable-next-line no-duplicate-imports
import { getContract } from "viem";
import { _abi } from "contracts/Raffle/factories/Raffle__factory";
import { getArbitrumSepoliaPublicClient } from "utils/clientGetters/testnet/getArbitrumSepoliaPublicClient";
import { ContractAddressArbitrumSepolia } from "utils/contractAddresses";

export type ArbitrumRaffleContract = GetContractReturnType<
  typeof _abi,
  PublicClient,
  typeof ContractAddressArbitrumSepolia
>;
let contract: ArbitrumRaffleContract | null = null;

export const getArbitrumSepoliaRaffleContract = () => {
  if (!contract) {
    contract = getContract({
      address: ContractAddressArbitrumSepolia,
      abi: _abi,
      client: getArbitrumSepoliaPublicClient(),
    });
  }

  return contract;
};
