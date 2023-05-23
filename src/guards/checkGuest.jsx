import React from "react";
import { Navigate } from "react-router-dom";
import Spinner from "../components/Spinner/Spinner";

const checkGuest = (Component) => {
  const AuthenticatedComponent = (props) => {
  
    if (props.data) {
      return <Navigate to="/board/corridor" />;
    }
    if (!props.data) {
      return <Component {...props} />;
    }
  };

  return AuthenticatedComponent;
};

export default checkGuest;
