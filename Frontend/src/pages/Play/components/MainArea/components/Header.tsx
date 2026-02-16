import { useLayoutEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Flex, Select, Typography } from "antd";
import { css } from "@emotion/react";
import GlobeIcon from "icons/Globe.svg?react";
import ArrowLeftIcon from "icons/li_arrow-left.svg?react";
import ArrowRightIcon from "icons/li_arrow-right.svg?react";
import ChevronIcon from "icons/li_chevron-down.svg?react";
import { BlockchainIconProvider } from "components/BlockchainSelector/BlockchainIconProvider";
import { styles } from "components/BlockchainSelector/styles";
import ChipButton from "components/ChipButton/ChipButton";
import { IconButton } from "components/IconButton/IconButton";
import { useChainCoinSet } from "hooks/useChainCoinSet";
import { useMediaQueryMatches } from "hooks/useMediaQueryMatches";
import InfoTitle from "pages/Play/components/InfoTitle";
import { Entries } from "pages/Play/components/MainArea/components/Entries";
import { usePlayContext } from "pages/Play/contexts/playContext/playContextUtils";
import { commonStyles } from "styles/commonStyles";
import { TXT_ALL_POOLS, TXT_POOL_INFO } from "translations";
import { getBlockchainSelectItems } from "utils/getBlockchainSelectItems";
import { getChainFullName } from "utils/getChainFullName";
import { getColorByChain } from "utils/getColorByChain";
import { Noop } from "utils/noop";
import { ChainIdType, CoinType } from "utils/types";

type ChipItem = {
  name: string;
  network: ChainIdType | null;
  onClick: Noop;
};

const Header = () => {
  const { t } = useTranslation();
  const { xl } = useMediaQueryMatches();
  const chipContainerRef = useRef<HTMLDivElement | null>(null);
  const { setCoin, setNetworkId, networkId, coin } = usePlayContext();

  const containerMaxWidthCalc = () => (window.innerWidth >= 1440 ? 704 : window.innerWidth - 704);
  const [containerMaxWidth, setContainerMaxWidth] = useState(containerMaxWidthCalc());

  useLayoutEffect(() => {
    const resizeHandler = () => {
      setContainerMaxWidth(containerMaxWidthCalc());
    };

    const observer = new ResizeObserver(() => {
      resizeHandler();
    });

    observer.observe(document.documentElement);

    setTimeout(resizeHandler, 0);

    return () => {
      observer.disconnect();
    };
  }, []);

  const chainOrCoinSet = useChainCoinSet();

  const goLeft = () => {
    if (!chipContainerRef?.current) {
      return;
    }

    chipContainerRef.current.scrollTo({ left: 0, behavior: "smooth" });
  };

  const goRight = () => {
    if (!chipContainerRef?.current) {
      return;
    }

    chipContainerRef.current.scrollTo({ left: chipContainerRef.current.clientWidth, behavior: "smooth" });
  };

  const items: ChipItem[] = useMemo(
    () => [
      {
        name: TXT_ALL_POOLS,
        network: null,
        onClick: () => {
          setCoin(null);
          setNetworkId(null);
        },
      },
      ...Object.entries(chainOrCoinSet).map((chainTuple) => {
        const chainId = chainTuple[0] as unknown as ChainIdType;

        return {
          name: getChainFullName(chainId),
          network: chainId,
          onClick: () => {
            setNetworkId(chainId);
          },
        };
      }),
    ],
    [setCoin, setNetworkId, chainOrCoinSet],
  );

  const onNetworkChange = (value: ChainIdType) => {
    if (Number(value) === Number(networkId)) {
      return;
    }

    setNetworkId(value);
    setCoin(null);
  };

  return (
    <Flex
      gap={16}
      vertical
      css={[
        commonStyles.fullWidth,
        xl
          ? css`
              max-width: ${containerMaxWidth}px;
            `
          : css``,
      ]}
    >
      {!xl && (
        <Flex vertical css={[commonStyles.fullWidth]} gap={16}>
          <Flex justify="space-between" css={[commonStyles.fullWidth]} gap={8}>
            <InfoTitle main={t(TXT_ALL_POOLS)} info={t(TXT_POOL_INFO)} />
            <Select
              value={networkId as ChainIdType}
              optionFilterProp="label"
              onChange={onNetworkChange}
              placeholder={t(TXT_ALL_POOLS)}
              css={styles.blockchainSelect}
              options={[{ label: t(TXT_ALL_POOLS), value: null }, ...getBlockchainSelectItems()]}
              suffixIcon={<ChevronIcon />}
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
            />
          </Flex>

          {networkId && <Entries />}
        </Flex>
      )}
      {!xl && !coin ? null : (
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
          <InfoTitle main={t(TXT_ALL_POOLS)} info={t(TXT_POOL_INFO)} />
          {xl && (
            <Flex gap={8}>
              <IconButton transparent size="sm" onClick={goLeft}>
                <ArrowLeftIcon width={20} height={20} />
              </IconButton>
              <IconButton transparent size="sm" onClick={goRight}>
                <ArrowRightIcon width={20} height={20} />
              </IconButton>
            </Flex>
          )}
        </Flex>
      )}
      {xl && (
        <Flex
          gap={8}
          ref={chipContainerRef}
          css={css`
            -ms-overflow-style: none;
            scrollbar-width: none;
            overflow-x: scroll;

            &::-webkit-scrollbar {
              display: none;
            }
          `}
        >
          {items.map((item) => (
            <ChipButton
              key={item.name}
              text={item.name}
              isActive={Number(networkId) === Number(item.network)}
              onClick={item.onClick}
              pinColor={getColorByChain(item?.network)}
            />
          ))}
        </Flex>
      )}
    </Flex>
  );
};

export default Header;
