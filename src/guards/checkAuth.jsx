import React from "react";
import { Navigate } from "react-router-dom";
import Spinner from "../components/Spinner/Spinner";

const checkAuth = (Component) => {
  const AuthenticatedComponent = (props) => {
    if (!props.data) {
      return <Navigate to="/login" />;
    }
    console.log(props.data);

    if (props.data) {
      return <Component {...props} />;
    }
  };

  return AuthenticatedComponent;
};

export default checkAuth;
