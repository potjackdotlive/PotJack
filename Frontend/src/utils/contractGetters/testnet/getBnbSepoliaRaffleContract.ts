import type { GetContractReturnType, PublicClient } from "viem";
// eslint-disable-next-line no-duplicate-imports
import { getContract } from "viem";
import { _abi } from "contracts/Raffle/factories/Raffle__factory";
import { getBnbTestnetPublicClient } from "utils/clientGetters/testnet/getBnbTestnetPublicClient";
import { ContractAddressBnbSmartChainTestnet } from "utils/contractAddresses";

export type BnbRaffleContract = GetContractReturnType<
  typeof _abi,
  PublicClient,
  typeof ContractAddressBnbSmartChainTestnet
>;
let contract: BnbRaffleContract | null = null;

export const getBnbSepoliaRaffleContract = () => {
  if (!contract) {
    contract = getContract({
      address: ContractAddressBnbSmartChainTestnet,
      abi: _abi,
      // todo: update for mainnet
      client: getBnbTestnetPublicClient(),
    });
  }

  return contract;
};
