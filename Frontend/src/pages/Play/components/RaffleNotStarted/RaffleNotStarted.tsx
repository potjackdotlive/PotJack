import { useTranslation } from "react-i18next";
import { Typography } from "antd";
import { css } from "@emotion/react";
import { useIsPhantomProviderPresent } from "components/WalletConnectors/hooks/useIsPhantomProviderPresent";
import { WalletConnectors } from "components/WalletConnectors/WalletConnectors";
import { WalletConnectorsNoPhantom } from "components/WalletConnectors/WalletConnectorsNoPhantom";
import { useWalletConnection } from "hooks/useWalletConnection";
import { BuyTicketProvider } from "pages/Play/components/BuyTicketProvider/BuyTicketProvider";
import { usePlayContext } from "pages/Play/contexts/playContext/playContextUtils";
import { commonStyles } from "styles/commonStyles";
import { typographyStyles } from "styles/typography";
import { TXT_BE_THE_FIRST_TO_ENTER, TXT_NO_ENTRIES_YET_BE_FIRST } from "translations";

const styles = {
  root: css`
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  contentWrapper: css`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 12px;
  `,
};

export const RaffleNotStarted = () => {
  const { t } = useTranslation();
  const { isConnected, connectedNetworkIds } = useWalletConnection();
  const { networkId } = usePlayContext();
  const isPhantomPresent = useIsPhantomProviderPresent();

  const showBuyModal = isConnected && networkId && connectedNetworkIds.includes(networkId);

  return (
    <div css={styles.root}>
      <div css={styles.contentWrapper}>
        <Typography css={[typographyStyles.bodyDefaultMd, commonStyles.textMuted]}>
          {t(TXT_NO_ENTRIES_YET_BE_FIRST)}
        </Typography>
        <div>
          {!isConnected && (isPhantomPresent ? <WalletConnectors /> : <WalletConnectorsNoPhantom />)}
          {showBuyModal && (
            <BuyTicketProvider
              raffleStarted={false}
              hasTicket={false}
              buttonProps={{ variant: "brand", size: "sm", outline: true }}
              customTypographyStyles={typographyStyles.bodySmallMd}
              customButtonText={t(TXT_BE_THE_FIRST_TO_ENTER)}
            />
          )}
        </div>
      </div>
    </div>
  );
};
