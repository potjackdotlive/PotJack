import type { GetContractReturnType, PublicClient } from "viem";
// eslint-disable-next-line no-duplicate-imports
import { getContract } from "viem";
import { _abi } from "contracts/Raffle/factories/Raffle__factory";
import { getArbitrumPublicClient } from "utils/clientGetters/mainnet/getArbitrumPublicClient";
import { ContractAddressSepolia } from "utils/contractAddresses";

export type ArbitrumRaffleContract = GetContractReturnType<typeof _abi, PublicClient, typeof ContractAddressSepolia>;
let contract: ArbitrumRaffleContract | null = null;

export const getArbitrumRaffleContract = (): ArbitrumRaffleContract => {
  if (!contract) {
    // todo: update for mainnet
    contract = getContract({
      address: ContractAddressSepolia,
      abi: _abi,
      client: getArbitrumPublicClient(),
    });
  }

  return contract;
};
