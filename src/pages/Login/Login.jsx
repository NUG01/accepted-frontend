import React from "react";
import styles from "./Login.module.scss";
import { useNavigate, Link } from "react-router-dom";
import BasicButton from "../../components/BasicButton/BasicButton";
import BasicInput from "../../components/BasicInput/BasicInput";
import { useState, useEffect } from "react";

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

  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [formValidated, setFormValidated] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [showEmailAccept, setShowEmailAccept] = useState(false);
  const [showEmailDecline, setShowEmailDecline] = useState(false);
  const [showPasswordAccept, setShowPasswordlAccept] = useState(false);
  const [showPasswordDecline, setShowPasswordDecline] = useState(false);

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

  function submitHandler(event) {
    event.preventDefault();
    if (formValidated) {
      console.log(passwordValue, emailValue);
      return;
    }
    console.log("oh");
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
            placeholder="შეიყვანეთ ელ.ფოსტა"
          >
            ელ.ფოსტა
          </BasicInput>
          <BasicInput
            showAccept={showPasswordAccept}
            showDecline={showPasswordDecline}
            input={passwordUpdate}
            name="password"
            type="text"
            placeholder="შეიყვანეთ პაროლი"
          >
            პაროლი
          </BasicInput>
          <BasicButton disabled={buttonDisabled} type="submit">
            დადასტურება
          </BasicButton>
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
