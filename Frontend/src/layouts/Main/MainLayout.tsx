import React, { PropsWithChildren } from "react";
import { Outlet } from "react-router-dom";
import { Flex } from "antd";
import BlockchainSelector from "components/BlockchainSelector";
import { NotificationList } from "components/NotificationList/NotificationList";
import { useIsPhantomProviderPresent } from "components/WalletConnectors/hooks/useIsPhantomProviderPresent";
import { WalletConnectors } from "components/WalletConnectors/WalletConnectors";
import { WalletConnectorsNoPhantom } from "components/WalletConnectors/WalletConnectorsNoPhantom";
import { useMediaQueryMatches } from "hooks/useMediaQueryMatches";
import { useWalletConnection } from "hooks/useWalletConnection";
import Nav from "pages/Play/components/Hero/components/Nav";
import { commonStyles } from "styles/commonStyles";

const MainLayout: React.FC<PropsWithChildren> = ({ children }) => {
  const { md, sm } = useMediaQueryMatches();
  const wc = useWalletConnection();
  const phantomWallet = useIsPhantomProviderPresent();

  const showBlockchainSelector = sm || md;

  return (
    <div css={commonStyles.fullHeight}>
      <Flex justify="space-between" style={{ padding: "16px 0" }}>
        <Nav />
        <Flex gap={5}>
          {wc.address && wc.isConnected && <NotificationList />}
          {showBlockchainSelector && <BlockchainSelector />}
          {phantomWallet ? <WalletConnectors /> : <WalletConnectorsNoPhantom />}
        </Flex>
      </Flex>
      <Outlet />
      {children}
    </div>
  );
};

export default MainLayout;
