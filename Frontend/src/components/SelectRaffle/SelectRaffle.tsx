import React from "react";
import { useTranslation } from "react-i18next";
import { Divider, Flex, Modal, Typography } from "antd";
import EthMonoIcon from "icons/chain_ethereum_monochrome.svg?react";
import { Button } from "components/Button/Button";
import { useCoinList } from "hooks/useCoinList";
import { useMediaQueryMatches } from "hooks/useMediaQueryMatches";
import { useToggle } from "hooks/useToggle";
import { MultichainListItem } from "pages/Play/components/RaffleListItem/components/MultichainListItemt";
import { RaffleListItem } from "pages/Play/components/RaffleListItem/RaffleListItem";
import { usePlayContext } from "pages/Play/contexts/playContext/playContextUtils";
import { commonStyles } from "styles/commonStyles";
import { typographyStyles } from "styles/typography";
import { TXT_AVAILABLE_AMOUNT, TXT_SELECT_TOKEN } from "translations";
import { getChainFullName } from "utils/getChainFullName";
import { ChainIdType } from "utils/types";
import { selectRaffleStyles as styles } from "./selectRaffleStyles";

export const SelectRaffle = () => {
  const { lg } = useMediaQueryMatches();
  const { t } = useTranslation();
  const { open, toggleOpen } = useToggle();
  const { setCoin, setNetworkId, networkId } = usePlayContext();
  const coinList = useCoinList(networkId as ChainIdType);

  const handleGoGlobal = () => {
    setCoin(null);
    setNetworkId(null);
  };

  return (
    <>
      <Button onClick={toggleOpen} css={commonStyles.fullWidth}>
        {t(TXT_SELECT_TOKEN)}
      </Button>
      <Modal
        onCancel={toggleOpen}
        centered={lg}
        title={
          <Typography css={[typographyStyles.bodyLargeMd, commonStyles.textNeutral]}>{t(TXT_SELECT_TOKEN)}</Typography>
        }
        closable={{ "aria-label": "Custom Close Button" }}
        open={open}
        footer={null}
        width="100%"
        css={!lg ? styles.modalBottom : styles.modal}
        destroyOnHidden
      >
        <Divider css={styles.divider} />
        <div css={styles.modalContentWrapper}>
          <Flex justify="space-between" gap={8} css={[commonStyles.fullWidth, commonStyles.textMuted]} align="center">
            <Flex gap={6} align="center">
              <EthMonoIcon />
              <Typography css={[typographyStyles.bodyDefaultMd, commonStyles.textMuted]}>
                {getChainFullName(networkId as ChainIdType)}
              </Typography>
            </Flex>
            <Typography css={[typographyStyles.bodyDefaultRg, commonStyles.textMuted]}>
              {t(TXT_AVAILABLE_AMOUNT, { amount: coinList?.length || 0 })}
            </Typography>
          </Flex>
          <Flex vertical gap={8} css={[commonStyles.fullWidth, commonStyles.radius16]}>
            <MultichainListItem onClick={handleGoGlobal} />

            {coinList.map((coin) => (
              <RaffleListItem key={coin} token={coin} />
            ))}
          </Flex>
        </div>
      </Modal>
    </>
  );
};
