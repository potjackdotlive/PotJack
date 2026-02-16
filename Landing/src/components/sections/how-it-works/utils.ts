import {
  ChainTagItemType,
  HowItWorksItemType,
} from "@/components/sections/how-it-works/types";
import EthIcon from "@/components/icons/tokens/eth-icon";
import DotIcon from "@/components/icons/tokens/dot-icon";
import LinkIcon from "@/components/icons/tokens/link-icon";
import MaticIcon from "@/components/icons/tokens/matic-icon";
import SolIcon from "@/components/icons/tokens/sol-icon";
import XrpIcon from "@/components/icons/tokens/xrp-icon";
import AbtIcon from "@/components/icons/tokens/abt-icon";
import AdaIcon from "@/components/icons/tokens/ada-icon";
import ArbIcon from "@/components/icons/tokens/arb-icon";
import AvaxIcon from "@/components/icons/tokens/avax-icon";
import BabydogeIcon from "@/components/icons/tokens/babydoge-icon";
import BaseIcon from "@/components/icons/tokens/base-icon";
import CroIcon from "@/components/icons/tokens/cro-icon";
import DaiIcon from "@/components/icons/tokens/dai-icon";
import DfxIcon from "@/components/icons/tokens/dfx-icon";
import FlokuIcon from "@/components/icons/tokens/floku-icon";
import HpoIcon from "@/components/icons/tokens/hpo-icon";
import HstIcon from "@/components/icons/tokens/hst-icon";
import LeoIcon from "@/components/icons/tokens/leo-icon";
import LtcIcon from "@/components/icons/tokens/ltc-icon";
import NearIcon from "@/components/icons/tokens/near-icon";
import NexoIcon from "@/components/icons/tokens/nexo-icon";
import OktIcon from "@/components/icons/tokens/okt-icon";
import OmaxIcon from "@/components/icons/tokens/omax-icon";
import OpIcon from "@/components/icons/tokens/op-icon";
import PepeIcon from "@/components/icons/tokens/pepe-icon";
import ShibIcon from "@/components/icons/tokens/shib-icon";
import UniIcon from "@/components/icons/tokens/uni-icon";
import UsdcIcon from "@/components/icons/tokens/usdc-icon";
import UsdtIcon from "@/components/icons/tokens/usdt-icon";
import YfiIcon from "@/components/icons/tokens/yfi-icon";

export const howItWorksItems: HowItWorksItemType[] = [
  {
    imageUrl: "/how-it-works/how-it-works-1.png",
    title: "Get Entries. Join the Draw.",
    description:
      "Connect your wallet and choose how many entries to buy using your preferred token on any supported chain. Each entry is tracked on-chain. More entries mean higher chances. Simple and secure.",
  },
  {
    imageUrl: "/how-it-works/how-it-works-2.png",
    title: "Witness the Verification",
    description:
      "Winners are selected using Chainlink VRF or an equivalent random function. The process is verifiable and no one can alter the result.",
  },
  {
    imageUrl: "/how-it-works/how-it-works-3.png",
    title: "Win. Get Rewarded. Instantly.",
    description:
      "If your entry wins, the smart contract sends 100% of the prize to your wallet. No claims, no delays, no middlemen.",
  },
];

export const chainTagList: ChainTagItemType[] = [
  { Icon: EthIcon, token: "ETH" },
  { Icon: DotIcon, token: "DOT" },
  { Icon: LinkIcon, token: "LINK" },
  { Icon: MaticIcon, token: "MATIC" },
  { Icon: SolIcon, token: "SOL" },
  { Icon: XrpIcon, token: "XRP" },
  { Icon: AbtIcon, token: "ABT" },
  { Icon: AdaIcon, token: "ADA" },
  { Icon: ArbIcon, token: "ARB" },
  { Icon: AvaxIcon, token: "AVAX" },
  { Icon: BabydogeIcon, token: "BABYDOGE" },
  { Icon: BaseIcon, token: "BASE" },
  { Icon: CroIcon, token: "CRO" },
  { Icon: DaiIcon, token: "DAI" },
  { Icon: DfxIcon, token: "DFX" },
  { Icon: FlokuIcon, token: "FLOKU" },
  { Icon: HpoIcon, token: "HPO" },
  { Icon: HstIcon, token: "HST" },
  { Icon: LeoIcon, token: "LEO" },
  { Icon: LtcIcon, token: "LTC" },
  { Icon: NearIcon, token: "NEAR" },
  { Icon: NexoIcon, token: "NEXO" },
  { Icon: OktIcon, token: "OKT" },
  { Icon: OmaxIcon, token: "OMAX" },
  { Icon: OpIcon, token: "OP" },
  { Icon: PepeIcon, token: "PEPE" },
  { Icon: ShibIcon, token: "SHIB" },
  { Icon: UniIcon, token: "UNI" },
  { Icon: UsdcIcon, token: "USDC" },
  { Icon: UsdtIcon, token: "USDT" },
  { Icon: YfiIcon, token: "YFI" },
];
