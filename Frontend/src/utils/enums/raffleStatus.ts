export enum RaffleStatus {
  NonExistent, // 0 - Round doesn't exist yet (no tickets bought)
  Open, // 1 - Round is open for tickets buying
  Closed, // 2 - Round closed, waiting for winner ticket generation
  Completed, // 3 - Payout completed
}

export enum SolanaRaffleStatus {
  Open, // 0 - Round is open for tickets buying
  Completed, // 1 - Round closed, winner picked
}
