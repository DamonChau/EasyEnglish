/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useTypedSelector } from "../../services";
import {
  selectIsAuthenticated,
  selectLoggedUser,
} from "../../services/slices/authSlice";

const PrivateRoute = () => {
  const isAuthenticated = useTypedSelector(selectIsAuthenticated);
  const loggedUser = useTypedSelector(selectLoggedUser);
  const location = useLocation();

  return isAuthenticated ? (
    <Outlet context={loggedUser} />
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
};


export default PrivateRoute;
