import type { GetContractReturnType, PublicClient } from "viem";
// eslint-disable-next-line no-duplicate-imports
import { getContract } from "viem";
import { _abi } from "contracts/Raffle/factories/Raffle__factory";
import { getPolygonAmoyPublicClient } from "utils/clientGetters/testnet/getPolygonAmoyPublicClient";
import { ContractAddressPolygonAmoy } from "utils/contractAddresses";

export type PolygonRaffleContract = GetContractReturnType<typeof _abi, PublicClient, typeof ContractAddressPolygonAmoy>;
let contract: PolygonRaffleContract | null = null;

export const getPolygonAmoyRaffleContract = () => {
  if (!contract) {
    contract = getContract({
      address: ContractAddressPolygonAmoy,
      abi: _abi,
      client: getPolygonAmoyPublicClient(),
    });
  }

  return contract;
};
