import React, { FC, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Flex, Modal, Typography } from "antd";
import { WalletSignTransactionError } from "@solana/wallet-adapter-base";
import { useQueryClient } from "@tanstack/react-query";
import useBreakpoint from "antd/es/grid/hooks/useBreakpoint";
import Crown from "icons/li_crown.svg?react";
import { Button } from "components/Button/Button";
import { errorNotification, successNotification, warningNotification } from "components/Notification/Notification";
import { QUERY_KEYS } from "constants/queryKeys";
import { useInvalidateSolanaGeneralData } from "hooks/useInvalidateSolanaGeneralData";
import { useNormalizeSolanaError } from "hooks/useNormalizeSolanaError";
import { useWalletConnection } from "hooks/useWalletConnection";
import { BuyForm } from "pages/Play/components/BuyTicketEth/BuyForm";
import { BuyTicketFooter } from "pages/Play/components/BuyTicketEth/components/Footer/BuyTicketFooter";
import { ticketStyles as styles } from "pages/Play/components/BuyTicketEth/ticketStyles";
import { BuyTicketModalProps } from "pages/Play/components/BuyTicketProvider/BuyTicketProvider";
import { ConnectPhantomModal } from "pages/Play/components/BuyTicketSol/components/ConnectPhantomModal/ConnectPhantomModal";
import { EntryConfirmSol } from "pages/Play/components/BuyTicketSol/components/EntryConfirmSol/EntryConfirmSol";
import { usePlayContext } from "pages/Play/contexts/playContext/playContextUtils";
import { commonStyles } from "styles/commonStyles";
import { typographyStyles } from "styles/typography";
import {
  TXT_BUY_A_TICKET_TO_SEE_YOUR_WIN_CHANCE,
  TXT_BUY_MORE,
  TXT_BUY_TICKETS,
  TXT_CONFIRM_ENTRIES,
  TXT_ERROR,
  TXT_FAILED_TO_PURCHASE_TICKET,
  TXT_INCREASE_YOUR_CHANCES,
  TXT_INSUFFICIENT_SLIPPAGE,
  TXT_PLEASE_SELECT_A_SLIPPAGE_TOLERANCE,
  TXT_SUCCESS,
  TXT_SUCCESSFUL_TICKET_PURCHASE,
  TXT_TO_CANCEL_THE_TX,
  TXT_TRANSACTION_FAILED,
  TXT_TX_REJECT_ERROR,
} from "translations";
import { NetworkType } from "utils/enums/networks";

export const BuyTicketSolModal: FC<BuyTicketModalProps> = ({
  hasTicket,
  raffleStarted,
  buttonProps = {},
  customTypographyStyles,
  customButtonText = "",
  showBuyTicketCall,
  buyButtonDisabled,
}) => {
  const { t } = useTranslation();
  const { xs } = useBreakpoint();
  const { connectedNetworkTypes } = useWalletConnection();
  const isConnected = connectedNetworkTypes.includes(NetworkType.Solana);
  const { roundId, networkId, maxRoundForCoin, setRoundData } = usePlayContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmActive, setIsConfirmActive] = useState(false);
  const [ticketCounter, setTicketCounter] = useState(1);
  const [slippage, setSlippage] = useState<string>("");
  const [slippageError, setSlippageError] = useState<string | null>(null);
  const previousTicketCounterRef = useRef(ticketCounter);
  const queryClient = useQueryClient();
  const [isTxPending, setIsTxPending] = useState(false);
  const normalizeSolanaError = useNormalizeSolanaError();
  const invalidateSolanaGeneralData = useInvalidateSolanaGeneralData();
  const [showConnectPhantom, setShowConnectPhantom] = useState(false);

  const titleText = isConfirmActive
    ? t(TXT_CONFIRM_ENTRIES)
    : hasTicket
      ? t(TXT_INCREASE_YOUR_CHANCES)
      : t(TXT_BUY_TICKETS);

  const showModal = async () => {
    if (!connectedNetworkTypes.includes(NetworkType.Solana)) {
      setShowConnectPhantom(true);
      return;
    }

    await queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.SOL.CURRENT_RAFFLE_ROUND_ID] });
    const currentRoundId: number = await queryClient.ensureQueryData({
      queryKey: [QUERY_KEYS.SOL.CURRENT_RAFFLE_ROUND_ID],
    });

    if (maxRoundForCoin !== null && maxRoundForCoin < currentRoundId) {
      setRoundData({ roundId: currentRoundId, maxRoundForCoin: currentRoundId });
    }

    if (Number(networkId)) {
      setIsModalOpen(true);
      return;
    }
  };

  const handleOk = () => {
    setIsModalOpen(false);
    setTicketCounter(1);
  };

  const txCancelHandler = (skipTxCheck?: boolean) => {
    if (isTxPending && !skipTxCheck) {
      warningNotification({
        message: t(TXT_ERROR),
        description: t(TXT_TO_CANCEL_THE_TX),
        duration: 5,
      });
      return;
    }

    setIsModalOpen(false);
    setIsConfirmActive(false);
    previousTicketCounterRef.current = ticketCounter;
    setTicketCounter(1);
    setSlippageError("");
  };

  const txSuccessfulClose = () => {
    setIsTxPending(false);
    queueMicrotask(() => txCancelHandler(true));

    invalidateSolanaGeneralData();

    queryClient
      .invalidateQueries({
        queryKey: [QUERY_KEYS.SOL.GET_RAFFLE_ROUND_DATA, roundId],
        exact: false,
      })
      .finally(() => {
        successNotification({ message: t(TXT_SUCCESS), description: t(TXT_SUCCESSFUL_TICKET_PURCHASE), duration: 3 });
        txCancelHandler(true);
      });
  };

  const incrementTicket = () => {
    setTicketCounter((prev) => prev + 1);
  };

  const decrementTicket = () => {
    setTicketCounter((prev) => prev - 1);
  };

  const buyHandler = async () => {
    if (!isConnected) {
      return;
    }

    if (slippage === "") {
      setSlippageError(t(TXT_PLEASE_SELECT_A_SLIPPAGE_TOLERANCE));
      return;
    }

    setIsTxPending(true);
    setIsConfirmActive(true);
  };

  const handleInsufficientSlippage = () => {
    setIsConfirmActive(false);
    setIsModalOpen(true);
    setSlippageError(t(TXT_INSUFFICIENT_SLIPPAGE));
    setTicketCounter(previousTicketCounterRef.current);

    queryClient.invalidateQueries({
      queryKey: [QUERY_KEYS.SOL.GET_TICKET_PRICE_FOR_TOKEN],
    });
    queryClient.invalidateQueries({
      queryKey: [QUERY_KEYS.SOL.GET_BALANCE],
    });
  };

  const txFailedClose = (error: unknown) => {
    let description = t(TXT_TRANSACTION_FAILED);

    if (error instanceof WalletSignTransactionError) {
      description = t(TXT_TX_REJECT_ERROR);
    }

    // Standard Error
    else if (error instanceof Error) {
      description = normalizeSolanaError(error.message);
    }

    // RPC / JSON error objects
    else if (typeof error === "object" && error !== null) {
      const maybeMessage = (error as any)?.message || (error as any)?.error?.message || (error as any)?.data?.message;

      if (typeof maybeMessage === "string") {
        description = normalizeSolanaError(maybeMessage);
      }
    }

    errorNotification({
      message: t(TXT_FAILED_TO_PURCHASE_TICKET),
      description,
    });

    setIsTxPending(false);
    queueMicrotask(() => txCancelHandler(true));
  };

  useEffect(() => {
    setSlippage("");
  }, [isModalOpen]);

  useEffect(() => {
    if (!isTxPending) {
      txCancelHandler();
    }
  }, [isTxPending]);

  return (
    <>
      <Flex css={[styles.buyTicketWrapper, commonStyles.fullWidth]}>
        {showBuyTicketCall && (
          <Flex gap={8} align="center">
            <Crown css={styles.buyTicketCallIcon} />
            <Typography css={[typographyStyles.bodySmallSb, styles.buyTicketCall]}>
              {t(TXT_BUY_A_TICKET_TO_SEE_YOUR_WIN_CHANCE)}
            </Typography>
          </Flex>
        )}
        <Button
          onClick={showModal}
          size="lg"
          css={commonStyles.fullWidth}
          disabled={buyButtonDisabled}
          {...buttonProps}
        >
          <Typography css={[typographyStyles.bodyDefaultMd, customTypographyStyles]}>
            {customButtonText || (hasTicket ? t(TXT_BUY_MORE) : t(TXT_BUY_TICKETS))}
          </Typography>
        </Button>
      </Flex>
      <Modal
        centered
        title={<Typography css={styles.header}>{titleText}</Typography>}
        closable={{ "aria-label": "Close Button" }}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={() => txCancelHandler()}
        css={[styles.root, ...(xs ? [styles.rootXs] : [])]}
        destroyOnHidden
        footer={
          isConfirmActive ? null : (
            <BuyTicketFooter buyHandler={buyHandler} ticketCounter={ticketCounter} slippage={slippage} />
          )
        }
      >
        {isConfirmActive ? (
          <EntryConfirmSol
            raffleNumber={(roundId || 0) + 1}
            ticketAmount={ticketCounter}
            slippage={slippage}
            txSuccessfulClose={txSuccessfulClose}
            txFailedClose={txFailedClose}
            setSlippage={setSlippage}
            handleInsufficientSlippage={handleInsufficientSlippage}
          />
        ) : (
          <BuyForm
            raffleStarted={raffleStarted}
            ticketCounter={ticketCounter}
            incrementTicket={incrementTicket}
            decrementTicket={decrementTicket}
            setSlippage={setSlippage}
            slippageError={slippageError}
            setSlippageError={setSlippageError}
            slippage={slippage}
          />
        )}
      </Modal>
      <ConnectPhantomModal
        open={showConnectPhantom}
        handleCancel={() => {
          setShowConnectPhantom(false);
        }}
      />
    </>
  );
};
