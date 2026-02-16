import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Select, SelectProps, Typography } from "antd";
import { css } from "@emotion/react";
import GlobeIcon from "icons/Globe.svg?react";
import ChevronIcon from "icons/li_chevron-down.svg?react";
import { styles } from "components/BlockchainSelector/styles";
import { CoinIconProvider } from "components/CoinIconProvider/CoinIconProvider";
import { useChainCoinSet } from "hooks/useChainCoinSet";
import { usePlayContext } from "pages/Play/contexts/playContext/playContextUtils";
import { useLastRounds } from "pages/Play/hooks/useLastRounds";
import { TXT_ALL_POOLS } from "translations";
import { CoinType } from "utils/types";

export const CoinSelector = () => {
  const { t } = useTranslation();
  const { coin, setCoin, networkId, setRoundData } = usePlayContext();
  const { data } = useLastRounds();
  const chainCoinSet = useChainCoinSet();

  const onChange = useMemo(() => {
    if (!data) {
      return (newCoin: CoinType) => {
        if (coin !== newCoin) {
          setCoin(newCoin);
        }
      };
    }

    return (newCoin: CoinType) => {
      if (coin !== newCoin) {
        setCoin(newCoin);

        if (!!newCoin && !!networkId && !!data[networkId] && !!data[networkId][newCoin]) {
          const roundData = data[networkId][newCoin];
          setRoundData({
            roundId: roundData.actualRoundId,
            active: roundData.active,
            maxRoundForCoin: roundData.actualRoundId,
          });
        }
      }
    };
  }, [data, networkId, coin]);

  const selectItems: SelectProps<CoinType>[] = (networkId ? chainCoinSet[networkId] : []).map((coinItem) => ({
    label: coinItem,
    value: coinItem as CoinType,
  }));

  return (
    <Select
      value={coin}
      optionFilterProp="label"
      onChange={onChange}
      placeholder={t(TXT_ALL_POOLS)}
      css={styles.blockchainSelect}
      options={[{ label: t(TXT_ALL_POOLS), value: null }, ...selectItems]}
      optionRender={({ value, label }) => (
        <div
          css={css`
            display: flex;
            flex-direction: row;
            gap: 8px;
          `}
        >
          {value ? (
            <CoinIconProvider token={value as CoinType} width={16} height={16} />
          ) : (
            <GlobeIcon width={16} height={16} />
          )}
          <Typography>{label}</Typography>
        </div>
      )}
      {...(coin && { prefix: <CoinIconProvider token={coin} width={24} height={24} /> })}
      suffixIcon={<ChevronIcon />}
    />
  );
};
