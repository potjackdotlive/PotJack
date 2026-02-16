import React, { FC, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Flex, Modal, Typography } from "antd";
import { useQueryClient } from "@tanstack/react-query";
import useBreakpoint from "antd/es/grid/hooks/useBreakpoint";
import Crown from "icons/li_crown.svg?react";
import { SwitchChainError } from "viem";
import { useConnection, useSwitchChain } from "wagmi";
import { Button } from "components/Button/Button";
import { errorNotification, warningNotification } from "components/Notification/Notification";
import { QUERY_KEYS } from "constants/queryKeys";
import { useIsInPhantomApp } from "hooks/useIsInPhantomApp";
import { BuyForm } from "pages/Play/components/BuyTicketEth/BuyForm";
import { EntryConfirm } from "pages/Play/components/BuyTicketEth/components/EntryConfirm/EntryConfirm";
import { EntryConfirmEth } from "pages/Play/components/BuyTicketEth/components/EntryConfirm/EntryConfirmEth";
import { invalidateEvm, invalidateNativeEvm } from "pages/Play/components/BuyTicketEth/components/EntryConfirm/utils";
import { BuyTicketFooter } from "pages/Play/components/BuyTicketEth/components/Footer/BuyTicketFooter";
import { ticketStyles as styles } from "pages/Play/components/BuyTicketEth/ticketStyles";
import { BuyTicketModalProps } from "pages/Play/components/BuyTicketProvider/BuyTicketProvider";
import { SwitchWalletModal } from "pages/Play/components/SwitchWalletModal/SwitchWalletModal";
import { usePlayContext } from "pages/Play/contexts/playContext/playContextUtils";
import { commonStyles } from "styles/commonStyles";
import { typographyStyles } from "styles/typography";
import {
  TXT_BUY_A_TICKET_TO_SEE_YOUR_WIN_CHANCE,
  TXT_BUY_MORE,
  TXT_BUY_TICKETS,
  TXT_CANNOT_PURCHASE_ETH_ON_PHANTOM,
  TXT_CONFIRM_ENTRIES,
  TXT_ERROR,
  TXT_ETH_WALLETS_ARE_NOT_AVAILABLE_INSIDE_PHANTOM,
  TXT_FAILED_TO_SWITCH_CHAIN,
  TXT_INCREASE_YOUR_CHANCES,
  TXT_INSUFFICIENT_SLIPPAGE,
  TXT_NETWORK_MISMATCH_DETECTED,
  TXT_PLEASE_SELECT_A_SLIPPAGE_TOLERANCE,
  TXT_WARNING
} from "translations";
import { AvalancheFujiCoinType } from "utils/enums/tokens/avalancheFujiTokens";
import { BnbCoinType } from "utils/enums/tokens/bnbTestnetTokens";
import { SepoliaCoinType } from "utils/enums/tokens/sepoliaTokens";
import { getTokenAddress } from "utils/getTokenAddress";
import { ChainIdType, CoinType } from "utils/types";

export const BuyTicketEthModal: FC<BuyTicketModalProps> = ({
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
  const { chainId, isConnected } = useConnection();
  const { mutateAsync: switchChainAsync } = useSwitchChain();
  const isInPhantomApp = useIsInPhantomApp();
  const { coin, roundId, networkId } = usePlayContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [switchModalOpen, setSwitchModalOpen] = useState(false);
  const [isConfirmActive, setIsConfirmActive] = useState(false);
  const [ticketCounter, setTicketCounter] = useState(1);
  const [slippage, setSlippage] = useState<string>("");
  const [slippageError, setSlippageError] = useState<string | null>(null);
  const previousTicketCounterRef = useRef(ticketCounter);
  const queryClient = useQueryClient();

  const titleText = isConfirmActive
    ? t(TXT_CONFIRM_ENTRIES)
    : hasTicket
      ? t(TXT_INCREASE_YOUR_CHANCES)
      : t(TXT_BUY_TICKETS);

  const showModal = async () => {
    if (Number(chainId) === Number(networkId)) {
      setIsModalOpen(true);
      return;
    }

    try {
      const newChain = await switchChainAsync({ chainId: Number(networkId) });
      if (Number(networkId) !== Number(newChain?.id)) {
        warningNotification({ message: t(TXT_WARNING), description: t(TXT_NETWORK_MISMATCH_DETECTED), duration: 4 });
        return;
      }

      setIsModalOpen(true);
    } catch (e) {
      if (e instanceof SwitchChainError) {
        errorNotification({ message: t(TXT_ERROR), description: e?.shortMessage || t(TXT_FAILED_TO_SWITCH_CHAIN) });
      }

      errorNotification({ message: t(TXT_ERROR), description: t(TXT_FAILED_TO_SWITCH_CHAIN) });
    }
  };

  const isNativeEvmToken =
    !!coin && ([SepoliaCoinType.Ethereum, AvalancheFujiCoinType.AVAX, BnbCoinType.BNB] as CoinType[]).includes(coin);

  const checkAbilityToPurchase = () => {
    if (isInPhantomApp) {
      warningNotification({
        message: t(TXT_CANNOT_PURCHASE_ETH_ON_PHANTOM),
        description: t(TXT_ETH_WALLETS_ARE_NOT_AVAILABLE_INSIDE_PHANTOM),
        duration: 4,
      });
      return;
    }

    if (isConnected) {
      showModal();
    } else {
      setSwitchModalOpen(true);
    }
  };

  const switchModalCallback = () => {
    setSwitchModalOpen(false);
    showModal();
  };

  const switchCancelCallback = () => {
    setSwitchModalOpen(false);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    setTicketCounter(1);
  };

  const txCancelHandler = () => {
    setIsModalOpen(false);
    setIsConfirmActive(false);
    previousTicketCounterRef.current = ticketCounter;
    setTicketCounter(1);
    setSlippageError("");

    if (!coin || !chainId) {
      return;
    }

    if (isNativeEvmToken) {
      const currentTokenAddress = getTokenAddress({ chainId: networkId as ChainIdType, coin });
      invalidateNativeEvm({ queryClient, networkId, currentTokenAddress }).finally(() => {
        queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.ABI.GET_WALLET_TOKEN_BALANCE], exact: false });
      });
    } else {
      invalidateEvm({ queryClient, chainId: networkId as ChainIdType, coin }).finally(() => {
        queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.ABI.GET_WALLET_TOKEN_BALANCE], exact: false });
      });
    }
  };

  const incrementTicket = () => {
    setTicketCounter((prev) => prev + 1);
  };

  const decrementTicket = () => {
    setTicketCounter((prev) => prev - 1);
  };

  const handleInsufficientSlippage = () => {
    setIsConfirmActive(false);
    setIsModalOpen(true);
    setSlippageError(t(TXT_INSUFFICIENT_SLIPPAGE));
    setTicketCounter(previousTicketCounterRef.current);

    queryClient.invalidateQueries({
      queryKey: [QUERY_KEYS.ABI.GET_TICKET_PRICE_FOR_TOKEN],
    });
    queryClient.invalidateQueries({
      queryKey: [QUERY_KEYS.ABI.GET_TICKET_PRICE_NATIVE],
    });
  };

  const buyHandler = async () => {
    if (!isConnected) {
      return;
    }

    if (slippage === "" && !isNativeEvmToken) {
      setSlippageError(t(TXT_PLEASE_SELECT_A_SLIPPAGE_TOLERANCE));
      return;
    }

    setIsConfirmActive(true);
  };

  const confirmProps = {
    txCancelHandler,
    raffleNumber: (roundId || 0) + 1,
    ticketAmount: ticketCounter,
  };

  useEffect(() => {
    setSlippage("");
  }, [isModalOpen]);

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
          onClick={checkAbilityToPurchase}
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
      <SwitchWalletModal open={switchModalOpen} callback={switchModalCallback} handleCancel={switchCancelCallback} />
      <Modal
        centered
        title={<Typography css={styles.header}>{titleText}</Typography>}
        closable={{ "aria-label": "Close Button" }}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={txCancelHandler}
        css={[styles.root, ...(xs ? [styles.rootXs] : [])]}
        destroyOnHidden
        footer={
          isConfirmActive ? null : (
            <BuyTicketFooter buyHandler={buyHandler} ticketCounter={ticketCounter} slippage={slippage} />
          )
        }
      >
        {isConfirmActive ? (
          isNativeEvmToken ? (
            <EntryConfirmEth {...confirmProps} />
          ) : (
            <EntryConfirm
              {...confirmProps}
              slippage={slippage}
              setSlippage={setSlippage}
              handleInsufficientSlippage={handleInsufficientSlippage}
            />
          )
        ) : (
          <BuyForm
            isNativeEthToken={isNativeEvmToken}
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
    </>
  );
};
