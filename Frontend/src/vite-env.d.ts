/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />
/// <reference types="@emotion/react/types/css-prop" />

import { Eip1193Provider } from "ethers";

declare global {
  interface Window {
    ethereum: Eip1193Provider;
    phantom?: {
      solana?: PhantomProvider;
    };
  }
}
