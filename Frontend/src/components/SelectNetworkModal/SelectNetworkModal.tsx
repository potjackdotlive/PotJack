import React from "react";
import { useTranslation } from "react-i18next";
import { Flex, Modal, Typography } from "antd";
import { css } from "@emotion/react";
import { Button } from "components/Button/Button";
import { NetworkListItem } from "components/SelectNetworkModal/components/NetworkListItem";
import { useMediaQueryMatches } from "hooks/useMediaQueryMatches";
import { useToggle } from "hooks/useToggle";
import { MultichainListItem } from "pages/Play/components/RaffleListItem/components/MultichainListItemt";
import { usePlayContext } from "pages/Play/contexts/playContext/playContextUtils";
import { useRaffleRoundsAllNetworks } from "pages/Play/hooks/useRaffleRoundsAllNetworks";
import { commonStyles } from "styles/commonStyles";
import { typographyStyles } from "styles/typography";
import { TXT_SELECT_NETWORK } from "translations";
import { BTC_PER_TICKET } from "utils/constants/raffleConstants";
import { ChainIdType } from "utils/types";
import { selectNetworkModalStyles as styles } from "./selectNetworkModalStyles";

export const SelectNetworkModal = () => {
  const { lg } = useMediaQueryMatches();
  const { t } = useTranslation();
  const { open, toggleOpen } = useToggle();
  const { setCoin, setNetworkId } = usePlayContext();
  const { dataByNetwork } = useRaffleRoundsAllNetworks();

  const handleGoGlobal = () => {
    setCoin(null);
    setNetworkId(null);
    toggleOpen();
  };

  return (
    <>
      <Button onClick={toggleOpen} css={commonStyles.fullWidth}>
        {t(TXT_SELECT_NETWORK)}
      </Button>
      <Modal
        onCancel={toggleOpen}
        centered={lg}
        title={
          <Typography
            css={[
              typographyStyles.bodyLargeMd,
              commonStyles.textNeutral,
              css`
                margin-bottom: 24px;
              `,
            ]}
          >
            {t(TXT_SELECT_NETWORK)}
          </Typography>
        }
        closable={{ "aria-label": "Custom Close Button" }}
        open={open}
        footer={null}
        width="100%"
        css={lg ? styles.modal : styles.modalBottom}
        destroyOnHidden
      >
        <div css={styles.modalContentWrapper}>
          <Flex vertical gap={8} css={[commonStyles.fullWidth, commonStyles.radius16]}>
            <MultichainListItem
              onClick={handleGoGlobal}
              rootStyles={css`
                justify-content: flex-start;
                border-radius: var(--radius-radius-md, 12px);
                border: 1px solid var(--color-neutral-border-neutral-light, #71717a);
                background: var(--color-muted-background-muted, #27272a);
              `}
            />

            {Object.entries(dataByNetwork).map(([chainId, data]) => {
              const pool = (data.totalTickets - data.lotteriesActive) * BTC_PER_TICKET;

              return (
                <NetworkListItem
                  key={chainId}
                  chainId={Number(chainId) as unknown as ChainIdType}
                  pool={pool < 0 ? 0 : pool}
                />
              );
            })}
          </Flex>
        </div>
      </Modal>
    </>
  );
};
