import React from "react";
import styles from "./Login.module.scss";
import { useNavigate, Link } from "react-router-dom";
import BasicButton from "../../components/BasicButton/BasicButton";
import BasicInput from "../../components/BasicInput/BasicInput";
import { useState } from "react";

function emailValidation(value) {
  if (value.length === 3) {
    return true;
  }

  return false;
}

function passwordValidation(value) {
  if (value.length === 3) {
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

  function closeLoginHandler() {
    navigate("..");
  }

  function emailUpdate(data) {
    setEmailValue(data.target.value);
    const validated =
      emailValidation(data.target.value) && passwordValidation(passwordValue);
    setFormValidated(validated);
    setButtonDisabled(!validated);
  }
  function passwordUpdate(data) {
    setPasswordValue(data.target.value);
    const validated =
      emailValidation(emailValue) && passwordValidation(data.target.value);
    setFormValidated(validated);
    setButtonDisabled(!validated);
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
            input={emailUpdate}
            name="email"
            type="text"
            placeholder="შეიყვანეთ ელ.ფოსტა"
          >
            ელ.ფოსტა
          </BasicInput>
          <BasicInput
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
