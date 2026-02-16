import { QueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "constants/queryKeys";
import { ProcessItemStatus } from "pages/Play/components/BuyTicketEth/components/EntryConfirm/ProcessItem";
import {
  TXT_APPROVE_TOKEN_SPENDING_IN_YOUR_WALLET,
  TXT_CONFIRM_TRANSFER_MANAGER_APPROVAL_IN_YOUR_WALLET,
  TXT_EXECUTING_PRIZE_POOL_TRANSFER,
  TXT_PROCESSING_TRANSACTION_ON_CHAIN,
  TXT_SEND_TO_PRIZE_POOL,
  TXT_WAITING_FOR_YOUR_CONFIRMATION_IN_THE_WALLET
} from "translations";
import { getTokenAddress } from "utils/getTokenAddress";
import { ChainIdType, CoinType } from "utils/types";

export const getProcessItemStatus = ({ activeStep, index }: { activeStep: number; index: number }) => {
  switch (true) {
    case activeStep === index:
      return ProcessItemStatus.Ongoing;
    case activeStep < index:
      return ProcessItemStatus.Pending;
    case activeStep > index:
      return ProcessItemStatus.Done;
    default:
      return ProcessItemStatus.Ongoing;
  }
};

export const getWarningTextsByStep = ({
  activeStep,
}: {
  activeStep: number;
}): {
  message: string;
  description: string;
} => {
  switch (activeStep) {
    case 0:
      return {
        message: TXT_WAITING_FOR_YOUR_CONFIRMATION_IN_THE_WALLET,
        description: TXT_CONFIRM_TRANSFER_MANAGER_APPROVAL_IN_YOUR_WALLET,
      };
    case 1:
      return {
        message: TXT_WAITING_FOR_YOUR_CONFIRMATION_IN_THE_WALLET,
        description: TXT_APPROVE_TOKEN_SPENDING_IN_YOUR_WALLET,
      };
    case 2:
      return {
        message: TXT_PROCESSING_TRANSACTION_ON_CHAIN,
        description: TXT_EXECUTING_PRIZE_POOL_TRANSFER,
      };
    default:
      return { message: TXT_EXECUTING_PRIZE_POOL_TRANSFER, description: TXT_PROCESSING_TRANSACTION_ON_CHAIN };
  }
};

export const getWarningTextsByStepNative = ({
  activeStep,
}: {
  activeStep: number;
}): {
  message: string;
  description: string;
} => {
  switch (activeStep) {
    case 0:
      return {
        message: TXT_WAITING_FOR_YOUR_CONFIRMATION_IN_THE_WALLET,
        description: TXT_APPROVE_TOKEN_SPENDING_IN_YOUR_WALLET,
      };
    case 1:
      return {
        message: TXT_SEND_TO_PRIZE_POOL,
        description: TXT_PROCESSING_TRANSACTION_ON_CHAIN,
      };
    default:
      return { message: TXT_EXECUTING_PRIZE_POOL_TRANSFER, description: TXT_PROCESSING_TRANSACTION_ON_CHAIN };
  }
};

export const invalidateNativeEvm = async ({
  queryClient,
  currentTokenAddress,
  networkId,
}: {
  queryClient: QueryClient;
  currentTokenAddress: string | null;
  networkId: string | number | null;
}) =>
  Promise.all([
    queryClient.invalidateQueries({
      queryKey: [QUERY_KEYS.ABI.GET_RAFFLE_ROUND_DATA],
      predicate: (query) => query.queryKey[1] === currentTokenAddress,
    }),
    queryClient.invalidateQueries({
      queryKey: [QUERY_KEYS.ABI.GET_LAST_ROUNDS],
      predicate: (query) => Number(query.queryKey[1]) === Number(networkId),
    }),
  ]);

export const invalidateEvm = async ({
  queryClient,
  chainId,
  coin,
}: {
  queryClient: QueryClient;
  chainId: ChainIdType;
  coin: CoinType;
}) =>
  Promise.all([
    queryClient.invalidateQueries({
      queryKey: [QUERY_KEYS.ABI.GET_RAFFLE_ROUND_DATA],
      predicate: (query) => {
        const queryTokenAddress = query.queryKey[1];
        const currentTokenAddress = getTokenAddress({
          chainId: chainId as ChainIdType,
          coin,
        });

        return queryTokenAddress === currentTokenAddress;
      },
    }),
    queryClient.invalidateQueries({
      queryKey: [QUERY_KEYS.ABI.GET_LAST_ROUNDS],
      predicate: (query) => Number(query.queryKey[1]) === Number(chainId),
    }),
  ]);
