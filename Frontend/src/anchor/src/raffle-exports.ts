// Here we export some useful types and functions for interacting with the Anchor program.
import { Account, getBase58Decoder, SolanaClient } from "gill";
import { getTokenRaffleDecoder, RAFFLE_PROGRAM_ADDRESS, RaffleState, TOKEN_RAFFLE_DISCRIMINATOR } from "./client/js";
import { getProgramAccountsDecoded } from "./helpers/get-program-accounts-decoded";

export type RaffleStateAccount = Account<RaffleState, string>;

export * from "./client/js";

export function getTokenRaffle(rpc: SolanaClient["rpc"]) {
  return getProgramAccountsDecoded(rpc, {
    decoder: getTokenRaffleDecoder(),
    filter: getBase58Decoder().decode(TOKEN_RAFFLE_DISCRIMINATOR),
    programAddress: RAFFLE_PROGRAM_ADDRESS,
  });
}
