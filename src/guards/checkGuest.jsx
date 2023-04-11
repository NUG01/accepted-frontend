import React from "react";
import { Navigate } from "react-router-dom";
import BasicAxios from "../helpers/axios/index";
import { useSelector, useDispatch } from "react-redux";
import { getJwtToken } from "../helpers/jwt";
import { setJwtToken } from "../helpers/jwt";
import Loading from "../pages/Loading/Loading";

const checkGuest = (Component) => {
  const AuthenticatedComponent = (props) => {
    console.log(props.data);

    if (props.loading) {
      // Handle loading state, e.g. show a spinner
      return <Loading/>;
    }

    if (props.data) {
      // Redirect to login page if user is not authenticated
      return <Navigate to="/main" />;
    }

    // Render the protected component if user is authenticated
    return <Component {...props} />;
  };

  return AuthenticatedComponent;
};

export default checkGuest;
