import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ExecutionRevertedError, WaitForTransactionReceiptErrorType } from "viem";
import { errorNotification } from "components/Notification/Notification";
import {
  TXT_ERROR,
  TXT_TRANSACTION_ERROR,
  TXT_TRANSACTION_ERROR_DESCRIPTION,
  TXT_TRANSACTION_INSUFFICIENT_ALLOWANCE_DESCRIPTION,
  TXT_TRANSACTION_NOT_FOUND,
  TXT_TRANSACTION_NOT_FOUND_DESCRIPTION,
  TXT_TRANSACTION_REVERTED,
  TXT_TRANSACTION_REVERTED_DESCRIPTION,
  TXT_TRANSACTION_TIMEOUT,
  TXT_TRANSACTION_TIMEOUT_DESCRIPTION,
  TXT_TRANSACTION_TIMEOUT_WITH_HASH,
} from "translations";
import { Noop } from "utils/noop";

type Props = {
  error: WaitForTransactionReceiptErrorType | null;
  callback: Noop;
};

export const useHandleReceiptError = ({ callback, error }: Props) => {
  const { t } = useTranslation();
  const [errorShown, setErrorShown] = useState(false);

  const getErrorDetails = (error: WaitForTransactionReceiptErrorType) => {
    // Extract transaction hash if available
    const txHash =
      error.cause && typeof error.cause === "object" && true && "transactionHash" in error.cause
        ? (error.cause as { transactionHash: string }).transactionHash
        : null;

    // Check if transaction was reverted
    const isReverted =
      error.cause &&
      typeof error.cause === "object" &&
      true &&
      "code" in error.cause &&
      (error.cause as { code: number }).code === -32000;

    // Check if it's a timeout
    const isTimeout = error.name === "WaitForTransactionReceiptTimeoutError";

    return {
      txHash,
      isReverted,
      isTimeout,
      originalMessage: error.message,
      errorName: error.name,
    };
  };

  useEffect(() => {
    if (errorShown) {
      return;
    }

    if (error) {
      const details = getErrorDetails(error);

      let message: string;
      let description: string;

      if (details.isTimeout) {
        message = t(TXT_TRANSACTION_TIMEOUT);
        description = details.txHash
          ? t(TXT_TRANSACTION_TIMEOUT_WITH_HASH, { hash: details.txHash })
          : t(TXT_TRANSACTION_TIMEOUT_DESCRIPTION);
      } else if (details.isReverted) {
        message = t(TXT_TRANSACTION_REVERTED);
        description = t(TXT_TRANSACTION_REVERTED_DESCRIPTION);
      } else if (details.errorName === "TransactionReceiptNotFoundError") {
        message = t(TXT_TRANSACTION_NOT_FOUND);
        description = t(TXT_TRANSACTION_NOT_FOUND_DESCRIPTION);
      } else if ((error as ExecutionRevertedError)?.shortMessage?.includes("Insufficient allowance")) {
        message = t(TXT_TRANSACTION_ERROR);
        description = t(TXT_TRANSACTION_INSUFFICIENT_ALLOWANCE_DESCRIPTION);
      } else {
        message = t(TXT_TRANSACTION_ERROR);
        description = details.originalMessage || t(TXT_TRANSACTION_ERROR_DESCRIPTION);
      }

      if (!(error as ExecutionRevertedError)?.shortMessage?.includes("Insufficient slippage")) {
        errorNotification({
          message: message || t(TXT_ERROR),
          description: description || t(TXT_ERROR),
        });
        setErrorShown(true);
      }
      callback();
    }
  }, [error, t, callback, errorShown]);
};
