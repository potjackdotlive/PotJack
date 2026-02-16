import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  TXT_TX_ERROR_BALANCE_TO,
  TXT_TX_ERROR_EXPIRED,
  TXT_TX_ERROR_FAILED_DUE,
  TXT_TX_ERROR_SIMULATION_FAILED,
  TXT_TX_ERROR_WAS_ALREADY,
  TXT_TX_REJECT_ERROR,
} from "translations";

export const useNormalizeSolanaError = () => {
  const { t } = useTranslation();

  return useMemo(
    () =>
      (message: string): string => {
        const msg = message.toLowerCase();

        // Phantom / wallet
        if (msg.includes("user rejected")) {
          return t(TXT_TX_REJECT_ERROR);
        }

        // Common Solana errors
        if (msg.includes("blockhash not found")) {
          return t(TXT_TX_ERROR_EXPIRED);
        }

        if (msg.includes("insufficient funds")) {
          return t(TXT_TX_ERROR_BALANCE_TO);
        }

        if (msg.includes("already processed")) {
          return t(TXT_TX_ERROR_WAS_ALREADY);
        }

        // Anchor / Codama simulation failures
        if (msg.includes("custom program error")) {
          return t(TXT_TX_ERROR_FAILED_DUE);
        }

        if (msg.includes("failed to simulate")) {
          return t(TXT_TX_ERROR_SIMULATION_FAILED);
        }

        // Fallback (sanitized)
        return message;
      },
    [],
  );
};
