import styles from "./Main.module.scss";
import BasicAxios from "../../helpers/axios/index";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useSelector } from "react-redux";
import React from "react";

function Main() {
  // useAuth();

  // const authState = useSelector((state) => state.auth);

  // console.log(authState);
  const navigate = useNavigate();
  // if (!authState.isLoggedIn) navigate("/");

  function logoutHandler() {
    BasicAxios.post("logout").then((res) => {
      navigate("/");
    });
  }
  return (
    <>
      <p style={{ color: "red" }} onClick={logoutHandler}>
        Main Page
      </p>
    </>
  );
}

export default Main;
