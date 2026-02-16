import { useQueryClient } from "@tanstack/react-query";
import { Address } from "viem";
import { useWatchContractEvent } from "wagmi";
import { QUERY_KEYS } from "constants/queryKeys";
import { _abi } from "contracts/Raffle/factories/Raffle__factory";
import {
  ContractAddressArbitrumSepolia,
  ContractAddressBaseSepolia,
  ContractAddressBnbSmartChainTestnet,
  ContractAddressOptimismSepolia,
  ContractAddressPolygonAmoy,
  ContractAddressSepolia,
} from "utils/contractAddresses";

export const useRaffleEventHandling = () => {
  const queryClient = useQueryClient();
  const addressesList = [
    ContractAddressSepolia,
    ContractAddressArbitrumSepolia,
    ContractAddressPolygonAmoy,
    ContractAddressOptimismSepolia,
    ContractAddressBnbSmartChainTestnet,
    ContractAddressBaseSepolia,
  ] as Address[];

  useWatchContractEvent({
    address: addressesList,
    abi: _abi,
    eventName: "WinnerPicked",
    pollingInterval: 5_000,
    enabled: !import.meta.env.DEV,
    onLogs() {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.ABI.GET_LAST_ROUNDS], exact: false }).finally(() => {
        queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.ABI.GET_RAFFLE_ROUND_DATA], exact: false });
      });
    },
  });

  useWatchContractEvent({
    address: addressesList,
    abi: _abi,
    eventName: "TicketPurchased",
    pollingInterval: 5_000,
    enabled: !import.meta.env.DEV,
    onLogs(logs) {
      const eventArgs = logs?.[0]?.args;

      if (!eventArgs) {
        return;
      }

      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.ABI.GET_LAST_ROUNDS],
        exact: false,
      });
    },
  });
};
