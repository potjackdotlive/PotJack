import { TFunction } from "i18next";
import { ROUTES } from "constants/routes";
import { TXT_HOME, TXT_LEADERBOARD, TXT_PLAY, TXT_ROUND_HISTORY } from "translations";
import { getBaseUrl } from "utils/getBaseUrl";

type Keys = keyof typeof ROUTES;
type Values = (typeof ROUTES)[Keys];

export type NavItem = {
  title: string;
  route: Values;
};

export const getNavItems = (t: TFunction): NavItem[] => [
  {
    title: t(TXT_HOME),
    route: getBaseUrl(),
  },
  {
    title: t(TXT_ROUND_HISTORY),
    route: ROUTES.RoundHistory,
  },
  {
    title: t(TXT_LEADERBOARD),
    route: ROUTES.Leaderboard,
  },
  {
    title: t(TXT_PLAY),
    route: ROUTES.Play,
  },
];
