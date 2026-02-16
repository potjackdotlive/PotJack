import TrophyIcon from "@/components/icons/trophy-icon";
import UsersThreeIcon from "@/components/icons/users-three-icon";
import CubeTransparentIcon from "@/components/icons/cube-transparent-icon";
import FediverseLogoIcon from "@/components/icons/fediverse-logo-icon";
import CubeFocusIcon from "@/components/icons/cube-focus-icon";
import ShieldCheckIcon from "@/components/icons/shield-check-icon";
import StrategyIcon from "@/components/icons/strategy-icon";
import GlobeIcon from "@/components/icons/globe-icon";
import UserSoundIcon from "@/components/icons/user-sound-icon";
import RocketIcon from "@/components/icons/rocket-icon";
import CircleDashedIcon from "@/components/icons/circle-dashed-icon";
import DiceFiveIcon from "@/components/icons/dice-five-icon";
import RowsPlusIcon from "@/components/icons/rows-plus-icon";
import MedalIcon from "@/components/icons/medal-icon";
import classes from "./styles/what-is-card.module.scss";
import { WhatIsCardType } from "@/components/sections/what-is/types";

export const whatIsCardList: WhatIsCardType[] = [
  {
    icon: TrophyIcon,
    tag: "Truly Decentralized",
    title: "WIN with Confidence",
    description:
      "Your game isn't controlled by any single entity. Our protocol ensures no central operators, no middlemen, and no single point of failure. Just immutable code on the blockchain guaranteeing fair play",
    imageUrl: "/what-is/what-is-item-1.png",
    tasks: [
      {
        icon: FediverseLogoIcon,
        name: "Truly Decentralized",
        className: classes.task1,
      },
      {
        icon: CubeFocusIcon,
        name: "Uncontrolled",
        className: classes.task2,
      },
      {
        icon: ShieldCheckIcon,
        name: "Guarantee",
        className: classes.task3,
      },
      {
        icon: StrategyIcon,
        name: "Fair Play",
        className: classes.task4,
      },
    ],
  },
  {
    icon: UsersThreeIcon,
    tag: "Global Community",
    title: "Community First, Always",
    description:
      "Proof of Luck is more than a game — it's a global movement. Join the protocol where every verifier matters and helps shape the future of trust on the blockchain.",
    reverse: true,
    imageUrl: "/what-is/what-is-item-2.png",
    tasks: [
      {
        icon: GlobeIcon,
        name: "Global Movement",
        className: classes.task5,
      },
      {
        icon: UserSoundIcon,
        name: "Community",
        className: classes.task6,
      },
      {
        icon: RocketIcon,
        name: "New Era",
        className: classes.task7,
      },
    ],
  },
  {
    icon: CubeTransparentIcon,
    tag: "See Every Step",
    title: "Provably Fair & Transparent",
    description:
      "Powered by Chainlink VRF (or equivalent), every draw is verifiably random. All transactions and results are public on-chain. Trust isn't just promised; it's coded in",
    imageUrl: "/what-is/what-is-item-3.png",
    tasks: [
      {
        icon: CircleDashedIcon,
        name: "Transparent",
        className: classes.task8,
      },
      {
        icon: DiceFiveIcon,
        name: "Verifiable Random",
        className: classes.task9,
      },
      {
        icon: RowsPlusIcon,
        name: "Public Results",
        className: classes.task10,
      },
      {
        icon: MedalIcon,
        name: "Provably Fair",
        className: classes.task11,
      },
    ],
  },
];
