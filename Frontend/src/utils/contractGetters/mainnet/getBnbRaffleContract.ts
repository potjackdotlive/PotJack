import type { GetContractReturnType, PublicClient } from "viem";
// eslint-disable-next-line no-duplicate-imports
import { getContract } from "viem";
import { _abi } from "contracts/Raffle/factories/Raffle__factory";
import { getBnbPublicClient } from "utils/clientGetters/mainnet/getBnbPublicClient";
import { ContractAddressBnbSmartChain } from "utils/contractAddresses";

export type BnbRaffleContract = GetContractReturnType<typeof _abi, PublicClient, typeof ContractAddressBnbSmartChain>;
let contract: BnbRaffleContract | null = null;

export const getBnbRaffleContract = () => {
  if (!contract && ContractAddressBnbSmartChain) {
    contract = getContract({
      address: ContractAddressBnbSmartChain,
      abi: _abi,
      // todo: update for mainnet
      client: getBnbPublicClient(),
    });
  }

  return contract;
};
