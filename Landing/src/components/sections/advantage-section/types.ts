import { IconType } from "@/utils/types";

export type AdvantageItemType = {
  Icon: IconType;
  title: string;
  description: string;
};

export type AdvantageCategoryType = {
  title: string;
  clarification: string;
  items: AdvantageItemType[];
};

export type AdvantageCategoryProps = {
  advantageCategory: AdvantageCategoryType;
};

export type AdvantageCategoryItemProps = {
  item: AdvantageItemType;
};
