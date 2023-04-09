import React from "react";
import styles from "./Login.module.scss";
import { useNavigate, Link } from "react-router-dom";
import BasicButton from "../../components/BasicButton/BasicButton";
import BasicInput from "../../components/BasicInput/BasicInput";
import { useState, useEffect } from "react";
import ButtonSpinner from "../../components/Spinner/ButtonSpinner";
import BasicAxios from "../../helpers/axios/index";
import SanctumAxios from "../../helpers/axios/SanctumAxios";
import { csrf } from "../../services";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../../store/auth";

const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

function emailValidation(value) {
  if (value.match(emailRegex)) {
    return true;
  }

  return false;
}

function passwordValidation(value) {
  if (value.match(passwordRegex)) {
    return true;
  }

  return false;
}

function Login() {
  const navigate = useNavigate();
  const authState = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [formValidated, setFormValidated] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [showEmailAccept, setShowEmailAccept] = useState(false);
  const [showEmailDecline, setShowEmailDecline] = useState(false);
  const [showPasswordAccept, setShowPasswordlAccept] = useState(false);
  const [showPasswordDecline, setShowPasswordDecline] = useState(false);
  const [requestInProcess, setRequestInProcess] = useState(false);

  function closeLoginHandler() {
    navigate("..");
  }

  function updateAcceptAndDeclineState(AcceptSetter, DeclineSetter, type) {
    if (type === "Email") {
      setShowEmailAccept(AcceptSetter);
      setShowEmailDecline(DeclineSetter);
    }
    if (type === "Password") {
      setShowPasswordlAccept(AcceptSetter);
      setShowPasswordDecline(DeclineSetter);
    }
  }

  function emailUpdate(data) {
    setEmailValue(data.target.value);
    const validated =
      emailValidation(data.target.value) && passwordValidation(passwordValue);
    setFormValidated(validated);
    setButtonDisabled(!validated);
    if (emailValidation(data.target.value)) {
      updateAcceptAndDeclineState(true, false, "Email");
    } else {
      updateAcceptAndDeclineState(false, true, "Email");
    }
    if (data.target.value.length === 0) {
      updateAcceptAndDeclineState(false, false, "Email");
    }
  }

  function passwordUpdate(data) {
    setPasswordValue(data.target.value);
    const validated =
      emailValidation(emailValue) && passwordValidation(data.target.value);
    setFormValidated(validated);
    setButtonDisabled(!validated);
    if (passwordValidation(data.target.value)) {
      updateAcceptAndDeclineState(true, false, "Password");
    } else {
      updateAcceptAndDeclineState(false, true, "Password");
    }
    if (data.target.value.length === 0) {
      updateAcceptAndDeclineState(false, false, "Password");
    }
  }

  async function submitHandler(event) {
    event.preventDefault();
    if (formValidated) {
      setButtonDisabled(true);
      setRequestInProcess(true);
      const login = async () => {
        try {
          await csrf();
          const res = await BasicAxios.post("login", {
            email: emailValue,
            password: passwordValue,
          });

          dispatch(authActions.setUser(res.data.user));
          dispatch(authActions.setIsLoggedIn(true));
          // console.log(res.data.user);
          // navigate("/main");
        } catch (error) {
          alert(error);
        }
      };

      login();
    }
  }

  const linkStyle = {
    textDecoration: "none",
    color: "rgb(24 144 255)",
    fontWeight: "600",
  };
  const linkContainer = {
    textAlign: "end",
    marginTop: "1rem",
  };

  return (
    <section>
      <div onClick={closeLoginHandler} className={styles.backdrop}></div>
      <div className={styles.loginContainer}>
        <form onSubmit={submitHandler} className={styles.form}>
          <div className={styles.headerText}>ავტორიზაცია</div>
          <BasicInput
            showAccept={showEmailAccept}
            showDecline={showEmailDecline}
            input={emailUpdate}
            name="email"
            type="text"
            placeholder="Example@gmail.com"
          >
            ელ.ფოსტა
          </BasicInput>
          <BasicInput
            showAccept={showPasswordAccept}
            showDecline={showPasswordDecline}
            input={passwordUpdate}
            name="password"
            type="password"
            placeholder="Example12"
            state="login"
          >
            პაროლი
          </BasicInput>
          <div style={{ position: "relative" }}>
            <BasicButton disabled={buttonDisabled} type="submit">
              <p className={requestInProcess ? styles.opacityDecrease : ""}>
                დადასტურება
              </p>
              {requestInProcess && (
                <div className={styles.relativeContainer}>
                  <div className={styles.spinnerContainer}>
                    <ButtonSpinner />
                  </div>
                </div>
              )}
            </BasicButton>
          </div>
        </form>
        <div style={linkContainer}>
          <Link to="/forgot-password" style={linkStyle}>
            უფს, დაგავიწყდა პაროლი?
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Login;
