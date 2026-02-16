import React, { PropsWithChildren } from "react";
import { Navigate, useMatch } from "react-router-dom";
import { ROUTES } from "constants/routes";
import { useExternalNavigation } from "hooks/useExternalNavigation";
import MainLayout from "layouts/Main/MainLayout";
import { getBaseUrl } from "utils/getBaseUrl";

const Root: React.FC<PropsWithChildren> = ({ children }) => {
  const isMatch = useMatch(ROUTES.Root);
  const isHomeMatch = useMatch(ROUTES.Home);

  useExternalNavigation(getBaseUrl(), !!isHomeMatch);

  if (isMatch) {
    return <Navigate to={ROUTES.Play} replace />;
  }

  return <MainLayout>{children}</MainLayout>;
};

export default Root;
