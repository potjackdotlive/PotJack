import type { GetContractReturnType, PublicClient } from "viem";
// eslint-disable-next-line no-duplicate-imports
import { getContract } from "viem";
import { _abi } from "contracts/Raffle/factories/Raffle__factory";
// todo: update
import { getAvalanchePublicClient } from "utils/clientGetters/mainnet/getAvalanchePublicClient";
import { ContractAddressAvalanche } from "utils/contractAddresses";

export type AvalancheRaffleContract = GetContractReturnType<typeof _abi, PublicClient, typeof ContractAddressAvalanche>;
let contract: AvalancheRaffleContract | null = null;

export const getAvalancheRaffleContract = (): AvalancheRaffleContract => {
  if (!contract && ContractAddressAvalanche) {
    contract = getContract({
      address: ContractAddressAvalanche,
      abi: _abi,
      client: getAvalanchePublicClient(),
    });
  }

  return contract as AvalancheRaffleContract;
};
