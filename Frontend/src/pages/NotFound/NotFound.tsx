import React from "react";
import { Navigate } from "react-router-dom";
import { ROUTES } from "constants/routes";

const NotFound = () => <Navigate to={ROUTES.Play} replace />;

export default NotFound;
