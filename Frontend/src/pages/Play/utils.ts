import {
  address,
  appendTransactionMessageInstruction,
  Base64EncodedWireTransaction,
  compileTransaction,
  createTransactionMessage,
  Decoder,
  GetAccountInfoApi,
  GetBalanceApi,
  getBase64EncodedWireTransaction,
  GetBlockApi,
  GetBlockCommitmentApi,
  GetBlockHeightApi,
  GetBlockProductionApi,
  GetBlocksApi,
  GetBlocksWithLimitApi,
  GetBlockTimeApi,
  GetClusterNodesApi,
  GetEpochInfoApi,
  GetEpochScheduleApi,
  GetFeeForMessageApi,
  GetFirstAvailableBlockApi,
  GetGenesisHashApi,
  GetHealthApi,
  GetHighestSnapshotSlotApi,
  GetIdentityApi,
  GetInflationGovernorApi,
  GetInflationRateApi,
  GetInflationRewardApi,
  GetLargestAccountsApi,
  GetLatestBlockhashApi,
  GetLeaderScheduleApi,
  GetMaxRetransmitSlotApi,
  GetMaxShredInsertSlotApi,
  GetMinimumBalanceForRentExemptionApi,
  GetMultipleAccountsApi,
  GetProgramAccountsApi,
  GetRecentPerformanceSamplesApi,
  GetRecentPrioritizationFeesApi,
  GetSignaturesForAddressApi,
  GetSignatureStatusesApi,
  GetSlotApi,
  GetSlotLeaderApi,
  GetSlotLeadersApi,
  GetStakeMinimumDelegationApi,
  GetSupplyApi,
  GetTokenAccountBalanceApi,
  GetTokenAccountsByDelegateApi,
  GetTokenAccountsByOwnerApi,
  GetTokenLargestAccountsApi,
  GetTokenSupplyApi,
  GetTransactionApi,
  GetTransactionCountApi,
  GetVersionApi,
  GetVoteAccountsApi,
  IsBlockhashValidApi,
  MinimumLedgerSlotApi,
  pipe,
  RequestAirdropApi,
  RpcFromTransport,
  RpcTransportFromClusterUrl,
  SendTransactionApi,
  setTransactionMessageFeePayer,
  setTransactionMessageLifetimeUsingBlockhash,
  SimulateTransactionApi,
} from "gill";

export const DASHBOARD_LEADERS_LIMIT = 13;

type RPCType = RpcFromTransport<
  RequestAirdropApi &
    GetAccountInfoApi &
    GetBalanceApi &
    GetBlockApi &
    GetBlockCommitmentApi &
    GetBlockHeightApi &
    GetBlockProductionApi &
    GetBlocksApi &
    GetBlocksWithLimitApi &
    GetBlockTimeApi &
    GetClusterNodesApi &
    GetEpochInfoApi &
    GetEpochScheduleApi &
    GetFeeForMessageApi &
    GetFirstAvailableBlockApi &
    GetGenesisHashApi &
    GetHealthApi &
    GetHighestSnapshotSlotApi &
    GetIdentityApi &
    GetInflationGovernorApi &
    GetInflationRateApi &
    GetInflationRewardApi &
    GetLargestAccountsApi &
    GetLatestBlockhashApi &
    GetLeaderScheduleApi &
    GetMaxRetransmitSlotApi &
    GetMaxShredInsertSlotApi &
    GetMinimumBalanceForRentExemptionApi &
    GetMultipleAccountsApi &
    GetProgramAccountsApi &
    GetRecentPerformanceSamplesApi &
    GetRecentPrioritizationFeesApi &
    GetSignaturesForAddressApi &
    GetSignatureStatusesApi &
    GetSlotApi &
    GetSlotLeaderApi &
    GetSlotLeadersApi &
    GetStakeMinimumDelegationApi &
    GetSupplyApi &
    GetTokenAccountBalanceApi &
    GetTokenAccountsByDelegateApi &
    GetTokenAccountsByOwnerApi &
    GetTokenLargestAccountsApi &
    GetTokenSupplyApi &
    GetTransactionApi &
    GetTransactionCountApi &
    GetVersionApi &
    GetVoteAccountsApi &
    IsBlockhashValidApi &
    MinimumLedgerSlotApi &
    SendTransactionApi &
    SimulateTransactionApi,
  RpcTransportFromClusterUrl<"https://api.devnet.solana.com">
>;

// todo: instruction types
export const getBase64Transaction = async (
  rpc: RPCType,
  instruction: any,
): Promise<null | Base64EncodedWireTransaction> => {
  try {
    const { value: latestBlockhash } = await rpc.getLatestBlockhash().send();

    const transactionMessage = pipe(
      createTransactionMessage({ version: 0 }),
      (tx) =>
        // todo: address
        setTransactionMessageFeePayer(
          address("14BUFPvNKBsgGeGdsWzpDtdG6LwEAegKNmLL5R9cQuhq"), // Dummy address for simulation
          tx,
        ),
      (tx) => setTransactionMessageLifetimeUsingBlockhash(latestBlockhash, tx),
      (tx) => appendTransactionMessageInstruction(instruction, tx),
    );

    const compiledTransaction = compileTransaction(transactionMessage);
    return getBase64EncodedWireTransaction(compiledTransaction);
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const getSolView = async <T>(
  rpc: RPCType,
  base64Transaction: Base64EncodedWireTransaction,
  decoder: Decoder<T>,
): Promise<null | T> => {
  const simulation = await rpc
    .simulateTransaction(base64Transaction, {
      commitment: "confirmed",
      encoding: "base64",
      replaceRecentBlockhash: true,
    })
    .send();

  if (!simulation.value.returnData) {
    return null;
  }

  const returnData = Buffer.from(simulation.value.returnData.data[0], "base64");
  try {
    return decoder.decode(returnData);
  } catch (e) {
    // todo: error callback?
    return null;
  }
};
