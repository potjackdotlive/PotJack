import { SelfStats, UserStats } from "graphql/gen/types";

export type LeaderboardPageUserStats = Pick<UserStats, "rank" | "userAddress" | "badges" | "totalWins" | "tickets">;

export type DashboardUserStats = Pick<
  UserStats,
  "rank" | "userAddress" | "badges" | "totalWins" | "tickets" | "contractAddress"
>;

export type SelfStatsType = Pick<
  SelfStats,
  "rank" | "userAddress" | "badges" | "totalWins" | "tickets" | "contractAddress"
>;
