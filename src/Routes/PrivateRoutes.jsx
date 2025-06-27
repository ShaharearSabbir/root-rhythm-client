import React, { useContext } from "react";
import { AuthContext } from "../Components/Context/AuthContext";
import Loader from "../Components/Shared/Loader";
import { Navigate, useLocation } from "react-router";

const PrivateRoutes = ({ children }) => {
  const { user, loader } = useContext(AuthContext);
  const location = useLocation();

  if (loader) {
    return <Loader></Loader>;
  }

  if (user) {
    return <div>{children}</div>;
  }

  return <Navigate state={location.pathname} to="/auth/signin"></Navigate>;
};

export default PrivateRoutes;
