import { IconType } from "@/utils/types";

export type HowItWorksItemType = {
  imageUrl: string;
  title: string;
  description: string;
};

export type ChainTagItemType = {
  Icon: IconType;
  token: string;
};

export type HowItWorksCardProps = {
  index: number;
  card: HowItWorksItemType;
};

export type ChainTagItemProps = {
  tag: ChainTagItemType;
};
