import type { GetContractReturnType, PublicClient } from "viem";
// eslint-disable-next-line no-duplicate-imports
import { getContract } from "viem";
import { _abi } from "contracts/Raffle/factories/Raffle__factory";
import { getSepoliaPublicClient } from "utils/clientGetters/testnet/getSepoliaPublicClient";
import { ContractAddressSepolia } from "utils/contractAddresses";

export type EthereumRaffleContract = GetContractReturnType<typeof _abi, PublicClient, typeof ContractAddressSepolia>;
let contract: EthereumRaffleContract | null = null;

export const getEthereumRaffleContract = (): EthereumRaffleContract => {
  if (!contract) {
    contract = getContract({
      address: ContractAddressSepolia,
      abi: _abi,
      // todo: update for mainnet
      client: getSepoliaPublicClient(),
    });
  }

  return contract;
};
