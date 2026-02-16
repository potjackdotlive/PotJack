// Here we export some useful types and functions for interacting with the Anchor program.
import { Account, getBase58Decoder, SolanaClient } from "gill";
import {
  GET_RAFFLE_ROUND_RESULT_DISCRIMINATOR,
  getGetRaffleRoundResultInstructionDataDecoder,
  RAFFLE_PROGRAM_ADDRESS,
  RaffleState,
} from "./client/js";
import { getProgramAccountsDecoded } from "./helpers/get-program-accounts-decoded";

export type RaffleStateAccount = Account<RaffleState, string>;

export * from "./client/js";

export function getRaffleRoundResultInstructionData(rpc: SolanaClient["rpc"]) {
  return getProgramAccountsDecoded(rpc, {
    decoder: getGetRaffleRoundResultInstructionDataDecoder(),
    filter: getBase58Decoder().decode(GET_RAFFLE_ROUND_RESULT_DISCRIMINATOR),
    programAddress: RAFFLE_PROGRAM_ADDRESS,
  });
}

export function getRaffleRoundResultInstructionFetch(rpc: SolanaClient["rpc"]) {
  return getProgramAccountsDecoded(rpc, {
    decoder: getGetRaffleRoundResultInstructionDataDecoder(),
    filter: getBase58Decoder().decode(GET_RAFFLE_ROUND_RESULT_DISCRIMINATOR),
    programAddress: RAFFLE_PROGRAM_ADDRESS,
  });
}
