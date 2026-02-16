import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Select, Typography } from "antd";
import { css } from "@emotion/react";
import { DefaultOptionType, SelectProps } from "antd/es/select";
import ChevronIcon from "icons/li_chevron-down.svg?react";
import { useConnection, useSwitchChain } from "wagmi";
import { BlockchainIconProvider } from "components/BlockchainSelector/BlockchainIconProvider";
import { getChainNameById } from "components/BlockchainSelector/utils";
import { useChainIds } from "hooks/useChainIds";
import { useWalletConnection } from "hooks/useWalletConnection";
import { commonStyles } from "styles/commonStyles";
import { TXT_SELECT_BLOCKCHAIN } from "translations";
import { SOLANA_CHAIN_ID } from "utils/constants/chainsConstants";
import { ChainIdType } from "utils/types";
import { styles } from "./styles";

type Props = SelectProps & { fullWidth?: boolean };

const BlockchainSelector: FC<Props> = ({ fullWidth = false, ...props }) => {
  const { t } = useTranslation();
  const wc = useWalletConnection();
  const wagmiConnection = useConnection();
  const wagmiChainId = wagmiConnection.chainId === undefined ? null : wagmiConnection.chainId;
  const phantomChainId =
    wc.connectedNetworkIds.length === 1 && wc.connectedNetworkIds.includes(SOLANA_CHAIN_ID) ? SOLANA_CHAIN_ID : null;
  const { mutate: switchChain } = useSwitchChain();

  const chainIds = useChainIds();

  const chainId = phantomChainId || wagmiChainId;

  const options: DefaultOptionType[] = chainIds.map(
    (cId): DefaultOptionType => ({
      label: getChainNameById(cId),
      value: cId,
      disabled: !wc.isConnected || !wc.connectedNetworkIds.includes(cId),
    }),
  );

  const onChange = (value: number) => {
    if (!wc.isConnected) {
      return;
    }

    if (!wc.connectedNetworkIds.includes(value as ChainIdType)) {
      return;
    }

    switchChain({ chainId: value });
  };

  return (
    <Select
      defaultValue=""
      value={chainId}
      optionFilterProp="label"
      labelRender={() => getChainNameById(chainId as ChainIdType)}
      onChange={onChange}
      prefix={<BlockchainIconProvider chainId={chainId} />}
      placeholder={t(TXT_SELECT_BLOCKCHAIN)}
      css={[styles.blockchainSelect, fullWidth && commonStyles.fullWidth]}
      options={options}
      optionRender={({ value, label }) => (
        <div
          css={[
            css`
              display: flex;
              min-height: 32px;
              padding: 0px 8px;
              justify-content: space-between;
              align-items: center;
              align-self: stretch;
              border-radius: var(--radius-radius-sm, 4px);
            `,
            wagmiChainId == value &&
              css`
                background: var(--color-muted-background-muted, #27272a);
              `,
          ]}
        >
          <Typography>{label}</Typography>
          {value && <BlockchainIconProvider chainId={value} width={20} height={20} />}
        </div>
      )}
      suffixIcon={<ChevronIcon />}
      {...props}
    />
  );
};

export default BlockchainSelector;
