import { createBrowserRouter } from "react-router-dom";
import { i18n } from "config/i18n";
import { ROUTES } from "constants/routes";
import Root from "layouts/Main/Root";
import { Leaderboard } from "pages/Leaderboard/Leaderboard";
import NotFound from "pages/NotFound";
import Play from "pages/Play";
import { RoundHistory } from "pages/RoundHistory/RoundHistory";
import { TXT_LEADERBOARD, TXT_PAGE_NOT_FOUND, TXT_PLAY, TXT_ROUND_HISTORY } from "translations";

export const router = createBrowserRouter([
  {
    path: ROUTES.Root,
    element: <Root />,
    children: [
      {
        path: ROUTES.RoundHistory,
        element: <RoundHistory />,
        handle: { title: i18n.t(TXT_ROUND_HISTORY) },
      },
      {
        path: ROUTES.RoundHistoryWithParams,
        element: <RoundHistory />,
        handle: { title: i18n.t(TXT_ROUND_HISTORY) },
      },
      {
        path: ROUTES.Leaderboard,
        element: <Leaderboard />,
        handle: { title: i18n.t(TXT_LEADERBOARD) },
      },
      {
        path: ROUTES.Play,
        element: <Play />,
        handle: { title: i18n.t(TXT_PLAY) },
      },
      {
        path: ROUTES.PlayNetwork,
        element: <Play />,
        handle: { title: i18n.t(TXT_PLAY) },
      },
      {
        path: ROUTES.PlayNetworkToken,
        element: <Play />,
        handle: { title: i18n.t(TXT_PLAY) },
      },
      {
        path: "*",
        element: <NotFound />,
        handle: { title: i18n.t(TXT_PAGE_NOT_FOUND) },
      },
    ],
  },
]);

if (import.meta.hot) {
  import.meta.hot.dispose(() => router.dispose());
}
