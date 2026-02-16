import type { GetContractReturnType, PublicClient } from "viem";
// eslint-disable-next-line no-duplicate-imports
import { getContract } from "viem";
import { _abi } from "contracts/Raffle/factories/Raffle__factory";
import { getAvalancheFujiPublicClient } from "utils/clientGetters/testnet/getAvalancheFujiPublicClient";
import { ContractAddressAvalancheFuji } from "utils/contractAddresses";

export type AvalancheRaffleContract = GetContractReturnType<
  typeof _abi,
  PublicClient,
  typeof ContractAddressAvalancheFuji
>;
let contract: AvalancheRaffleContract | null = null;

export const getAvalancheFujiRaffleContract = () => {
  if (!contract) {
    contract = getContract({
      address: ContractAddressAvalancheFuji,
      abi: _abi,
      client: getAvalancheFujiPublicClient(),
    });
  }

  return contract;
};
