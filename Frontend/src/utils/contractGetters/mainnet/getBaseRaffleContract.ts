import type { GetContractReturnType, PublicClient } from "viem";
// eslint-disable-next-line no-duplicate-imports
import { getContract } from "viem";
import { _abi } from "contracts/Raffle/factories/Raffle__factory";
import { getBasePublicClient } from "utils/clientGetters/mainnet/getBasePublicClient";
import { ContractAddressBase } from "utils/contractAddresses";

export type BaseRaffleContract = GetContractReturnType<typeof _abi, PublicClient, typeof ContractAddressBase>;
let contract: BaseRaffleContract | null = null;

export const getBaseRaffleContract = () => {
  if (!contract && ContractAddressBase) {
    contract = getContract({
      address: ContractAddressBase,
      abi: _abi,
      // todo: update for mainnet
      client: getBasePublicClient(),
    });
  }

  return contract;
};
