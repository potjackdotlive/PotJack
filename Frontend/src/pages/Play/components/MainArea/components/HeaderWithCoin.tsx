import { useTranslation } from "react-i18next";
import { Flex, Select, Typography } from "antd";
import { css } from "@emotion/react";
import GlobeIcon from "icons/Globe.svg?react";
import ChevronIcon from "icons/li_chevron-down.svg?react";
import { BlockchainIconProvider } from "components/BlockchainSelector/BlockchainIconProvider";
import { styles } from "components/BlockchainSelector/styles";
import { useMediaQueryMatches } from "hooks/useMediaQueryMatches";
import InfoTitle from "pages/Play/components/InfoTitle";
import { CoinSelector } from "pages/Play/components/MainArea/components/CoinSelector";
import { HeaderHistory } from "pages/Play/components/MainArea/components/HeaderHistory";
import { usePlayContext } from "pages/Play/contexts/playContext/playContextUtils";
import { commonStyles } from "styles/commonStyles";
import { TXT_ALL_POOLS, TXT_ENTRIES, TXT_POOL_INFO } from "translations";
import { getBlockchainSelectItems } from "utils/getBlockchainSelectItems";
import { getChainFullName } from "utils/getChainFullName";
import { ChainIdType, CoinType } from "utils/types";
import { OpenToParticipate } from "./OpenToParticipate";

export const HeaderWithCoin = () => {
  const { t } = useTranslation();
  const { xl } = useMediaQueryMatches();
  const { networkId, coin, setNetworkId, setCoin } = usePlayContext();

  const onNetworkChange = (value: ChainIdType) => {
    if (networkId === value) {
      return;
    }

    setNetworkId(value);
    setCoin(null);
  };

  return (
    <Flex gap={16} vertical css={commonStyles.fullWidth}>
      {!xl && (
        <Flex justify="space-between" css={[commonStyles.fullWidth]}>
          <InfoTitle main={t(TXT_ALL_POOLS)} info={t(TXT_POOL_INFO)} />
          <Select
            value={Number(networkId) as ChainIdType}
            optionFilterProp="label"
            onChange={onNetworkChange}
            placeholder={t(TXT_ALL_POOLS)}
            css={styles.blockchainSelect}
            options={[{ label: t(TXT_ALL_POOLS), value: null }, ...getBlockchainSelectItems()]}
            optionRender={({ value, label }) => (
              <div
                css={css`
                  display: flex;
                  flex-direction: row;
                  gap: 8px;
                `}
              >
                {value ? (
                  <BlockchainIconProvider chainId={value as CoinType} width={16} height={16} />
                ) : (
                  <GlobeIcon width={16} height={16} />
                )}
                <Typography>{label}</Typography>
              </div>
            )}
            {...(networkId && { prefix: <BlockchainIconProvider chainId={networkId} width={24} height={24} /> })}
            suffixIcon={<ChevronIcon />}
          />
        </Flex>
      )}
      <div
        css={css`
          display: flex;
          flex-direction: column;
          gap: 16px;
        `}
      >
        <Flex
          justify="space-between"
          css={[
            commonStyles.fullWidth,
            xl ? commonStyles.flexRow : commonStyles.flexDirectionColumn,
            xl
              ? css``
              : css`
                  gap: 16px;
                  padding: 12px;
                  border-radius: 12px;
                  border: 1px solid var(--color-neutral-border-neutral, #3f3f46);
                  background: var(--color-muted-background-muted-p50, rgba(39, 39, 42, 0.5));
                `,
          ]}
        >
          {networkId && xl ? (
            <InfoTitle main={coin as CoinType} parent={getChainFullName(networkId as ChainIdType)} />
          ) : (
            <Flex css={commonStyles.fullWidth} justify="space-between">
              <InfoTitle main={t(TXT_ENTRIES)} />
              <CoinSelector />
            </Flex>
          )}

          <div
            css={css`
              display: flex;
              flex-direction: column;
              gap: 16px;
            `}
          >
            <HeaderHistory />
            {!xl && <OpenToParticipate />}
          </div>
        </Flex>
        {xl && <OpenToParticipate />}
      </div>
    </Flex>
  );
};
