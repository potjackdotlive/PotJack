import { useTranslation } from "react-i18next";
import { Flex, Typography } from "antd";
import RaffleCoins from "icons/RaffleCoins.svg?react";
import { SelectNetworkModal } from "components/SelectNetworkModal/SelectNetworkModal";
import { useIsPhantomProviderPresent } from "components/WalletConnectors/hooks/useIsPhantomProviderPresent";
import { WalletConnectors } from "components/WalletConnectors/WalletConnectors";
import { WalletConnectorsNoPhantom } from "components/WalletConnectors/WalletConnectorsNoPhantom";
import { useWalletConnection } from "hooks/useWalletConnection";
import { BuyTicketProvider } from "pages/Play/components/BuyTicketProvider/BuyTicketProvider";
import { DetailsTable } from "pages/Play/components/PersonalHub/DetailsTable";
import { usePlayContext } from "pages/Play/contexts/playContext/playContextUtils";
import { useRaffleRound } from "pages/Play/hooks/useRaffleRound";
import { commonStyles } from "styles/commonStyles";
import { typographyStyles } from "styles/typography";
import { TXT_BE_THE_FIRST_BUYER_GET_2_FOR_1, TXT_CONNECT_YOUR_WALLET_TO_PLAY } from "translations";
import { RaffleStatus } from "utils/enums/raffleStatus";
import { coinFormatter } from "utils/formatters/coinFormatter";
import { getCoinScaledValue } from "utils/getCoinScaledValue";
import { ChainIdType } from "utils/types";

export const HubDetails = () => {
  const { t } = useTranslation();
  const { coin, roundId, maxRoundForCoin, networkId } = usePlayContext();
  const { isConnected, address } = useWalletConnection();
  const isPhantomPresent = useIsPhantomProviderPresent();
  const { raffleRoundData } = useRaffleRound({ coin, roundId, chainId: networkId as ChainIdType });

  const isActive = raffleRoundData?.round?.active;
  const roundStatus = raffleRoundData?.round?.status;
  const isSelectingWinner = roundStatus && roundStatus === RaffleStatus.Closed;
  const ticketsCount = raffleRoundData?.round?.ticketCount || 0;
  const poolBalance = getCoinScaledValue(raffleRoundData?.round?.poolBalance || 0, coin);

  const players = raffleRoundData?.players;
  const playersCount = players?.length || 0;

  const currentUserInRound = players?.find((p) => p.player === address);
  const playerTicketCount = Number(currentUserInRound?.ticketsCount || 0);

  const canBuyMore = roundId === maxRoundForCoin;

  const showDetailsTable = coin && ((isConnected && !!ticketsCount) || roundId !== maxRoundForCoin);

  return (
    <Flex vertical gap={8} css={commonStyles.fullWidth} align="center">
      {showDetailsTable && (
        <DetailsTable
          poolBalance={`${coinFormatter(poolBalance, { maximumFractionDigits: 5 })}`}
          playerTicketCount={playerTicketCount}
          ticketsCount={ticketsCount || 0}
          playersCount={playersCount}
        />
      )}
      {coin && ticketsCount === 0 && roundId === maxRoundForCoin && (
        <>
          <Flex gap={8} style={{ color: "#EAB308" }}>
            <RaffleCoins />
            <Typography css={typographyStyles.bodyDefaultSb} style={{ color: "inherit" }}>
              {t(TXT_BE_THE_FIRST_BUYER_GET_2_FOR_1)}
            </Typography>
          </Flex>
        </>
      )}
      {coin && isConnected && canBuyMore && (
        <BuyTicketProvider
          hasTicket={!!playerTicketCount}
          raffleStarted={isActive}
          showBuyTicketCall={!!ticketsCount && !playerTicketCount}
          buyButtonDisabled={isSelectingWinner || false}
        />
      )}
      {!isConnected && (
        <Flex vertical gap={12} css={commonStyles.fullWidth} align="center">
          <Typography css={[typographyStyles.bodyDefaultMd, commonStyles.textMuted]}>
            {t(TXT_CONNECT_YOUR_WALLET_TO_PLAY)}
          </Typography>
          {isPhantomPresent ? (
            <WalletConnectors fullWidth transparent={false} />
          ) : (
            <WalletConnectorsNoPhantom fullWidth transparent={false} />
          )}
        </Flex>
      )}
      {isConnected && !networkId && (
        <Flex vertical gap={12} css={commonStyles.fullWidth} align="center">
          <SelectNetworkModal />
        </Flex>
      )}
    </Flex>
  );
};
