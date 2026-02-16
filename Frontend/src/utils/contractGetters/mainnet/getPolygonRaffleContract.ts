import type { GetContractReturnType, PublicClient } from "viem";
// eslint-disable-next-line no-duplicate-imports
import { getContract } from "viem";
import { _abi } from "contracts/Raffle/factories/Raffle__factory";
import { getPolygonPublicClient } from "utils/clientGetters/mainnet/getPolygonPublicClient";
import { ContractAddressSepolia } from "utils/contractAddresses";

export type PolygonRaffleContract = GetContractReturnType<typeof _abi, PublicClient, typeof ContractAddressSepolia>;
let contract: PolygonRaffleContract | null = null;

export const getPolygonRaffleContract = (): PolygonRaffleContract => {
  if (!contract) {
    contract = getContract({
      address: ContractAddressSepolia,
      abi: _abi,
      // todo: update for mainnet
      client: getPolygonPublicClient(),
    });
  }

  return contract;
};
