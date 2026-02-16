import { createConfig, fallback, http } from "wagmi";
import {
  arbitrumSepolia,
  avalancheFuji,
  baseSepolia,
  bscTestnet,
  optimismSepolia,
  polygonAmoy,
  sepolia,
} from "wagmi/chains";
import { metaMask, walletConnect } from "wagmi/connectors";
import { getArbSepoliaRpcUrl } from "utils/clientGetters/testnet/getArbitrumSepoliaPublicClient";
import { getBaseSepoliaRpcUrl } from "utils/clientGetters/testnet/getBaseSepoliaPublicClient";
import { getBnbRpcUrl } from "utils/clientGetters/testnet/getBnbTestnetPublicClient";
import { getOptimismSepoliaRpcUrl } from "utils/clientGetters/testnet/getOptimismSepoliaPublicClient";
import { getPolygonAmoyRpcUrl } from "utils/clientGetters/testnet/getPolygonAmoyPublicClient";
import { getSepoliaRpcUrl } from "utils/clientGetters/testnet/getSepoliaPublicClient";

// todo: provide real wallet connect id for prod
const walletConnectProjectId = "48865e78dcb73c57c14f2e1895f34fc8";

const defaultFallbackConfig = {
  rank: false, // Don't automatically rank by latency
  retryCount: 2,
  retryDelay: 150,
};

export const wagmiConfig = createConfig({
  chains: [sepolia, arbitrumSepolia, polygonAmoy, optimismSepolia, avalancheFuji, baseSepolia, bscTestnet],
  multiInjectedProviderDiscovery: false,
  transports: {
    [sepolia.id]: fallback([http(), http(getSepoliaRpcUrl())], { ...defaultFallbackConfig }),
    [arbitrumSepolia.id]: fallback([http(), http(getArbSepoliaRpcUrl())], {
      ...defaultFallbackConfig,
    }),
    [polygonAmoy.id]: fallback([http(), http(getPolygonAmoyRpcUrl())], { ...defaultFallbackConfig }),
    [optimismSepolia.id]: fallback([http(), http(getOptimismSepoliaRpcUrl())], { ...defaultFallbackConfig }),
    [avalancheFuji.id]: fallback([http()], { ...defaultFallbackConfig }),
    [baseSepolia.id]: fallback([http(), http(getBaseSepoliaRpcUrl())], { ...defaultFallbackConfig }),
    [bscTestnet.id]: fallback([http(), http(getBnbRpcUrl())], { ...defaultFallbackConfig }),
  },
  connectors: [walletConnect({ projectId: walletConnectProjectId }), metaMask()],
});
