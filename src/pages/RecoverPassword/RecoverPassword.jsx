import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import PasswordReseted from "../../assets/icons/PasswordReseted";
import BasicButton from "../../components/BasicButton/BasicButton";
import BasicInput from "../../components/BasicInput/BasicInput";
import ButtonSpinner from "../../components/Spinner/ButtonSpinner";
import checkGuest from "../../guards/checkGuest";
import BasicAxios from "../../helpers/axios/index";
import styles from "./RecoverPassword.module.scss";

import React from "react";

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

function passwordValidation(value) {
  if (value.match(passwordRegex)) {
    return true;
  }

  return false;
}
function passwordConfirmValidation(value, passwordValue) {
  if (value == passwordValue) {
    return true;
  }

  return false;
}

function RecoverPassword() {
  const params = useParams();
  const navigate = useNavigate();
  const [passwordError, setPaswordError] = useState(false);
  const [passwordConfirmError, setPaswordConfirmError] = useState(false);
  const [passwordValue, setPasswordValue] = useState("");
  const [passwordConfirmValue, setPasswordConfirmValue] = useState("");
  const [requestInProcess, setRequestInProcess] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [passwordRecovered, setPasswordRecovered] = useState(false);

  const [showPasswordAccept, setShowPasswordlAccept] = useState(false);
  const [showPasswordDecline, setShowPasswordDecline] = useState(false);
  const [showPasswordConfirmAccept, setShowPasswordConfirmAccept] =
    useState(false);
  const [showPasswordConfirmDecline, setShowPasswordConfirmDecline] =
    useState(false);

  useEffect(() => {
    BasicAxios.post("password-recover-validity", {
      token: params.token,
    }).catch(() => {
      navigate("/login");
    });
  }, []);

  function passwordUpdate(data) {
    setPasswordValue(data.target.value);
  }
  function passwordConfirmUpdate(data) {
    setPasswordConfirmValue(data.target.value);
  }

  function passwordUpdate(data) {
    setPasswordValue(data.target.value);
    const validated =
      passwordConfirmValidation(passwordConfirmValue, data.target.value) &&
      passwordValidation(data.target.value);
    setButtonDisabled(!validated);
    if (passwordValidation(data.target.value)) {
      setShowPasswordlAccept(true);
      setShowPasswordDecline(false);
    } else {
      setShowPasswordlAccept(false);
      setShowPasswordDecline(true);
    }
    if (data.target.value.length === 0) {
      setShowPasswordlAccept(false);
      setShowPasswordDecline(false);
    }
    if (passwordConfirmValidation(passwordConfirmValue, data.target.value)) {
      setShowPasswordConfirmAccept(true);
      setShowPasswordConfirmDecline(false);
    } else {
      setShowPasswordConfirmAccept(false);
      setShowPasswordConfirmDecline(true);
    }
    if (passwordConfirmValue === 0) {
      setShowPasswordConfirmAccept(false);
      setShowPasswordConfirmDecline(false);
    }
  }
  function passwordConfirmUpdate(data) {
    setPasswordConfirmValue(data.target.value);
    const validated =
      passwordConfirmValidation(data.target.value, passwordValue) &&
      passwordValidation(passwordValue);
    setButtonDisabled(!validated);
    if (passwordConfirmValidation(data.target.value, passwordValue)) {
      setShowPasswordConfirmAccept(true);
      setShowPasswordConfirmDecline(false);
    } else {
      setShowPasswordConfirmAccept(false);
      setShowPasswordConfirmDecline(true);
    }
    if (data.target.value.length === 0) {
      setShowPasswordConfirmAccept(false);
      setShowPasswordConfirmDecline(false);
    }
  }

  async function submitHandler(event) {
    event.preventDefault();
    console.log(passwordConfirmValue, passwordValue);
    if (
      passwordConfirmValidation(passwordConfirmValue, passwordValue) &&
      passwordValidation(passwordValue)
    ) {
      try {
        setButtonDisabled(true);
        setRequestInProcess(true);
        const res = await BasicAxios.post("recover-password", {
          token: params.token,
          password: passwordValue,
        });
        setPasswordRecovered(true);
      } catch (error) {
        alert(error);
      }
    }
  }
  return (
    <section className={styles.container}>
      <main className={styles.formContainer}>
        {passwordRecovered && (
          <div className={styles.passwordReset}>
            <PasswordReseted />
            <p className={styles.resetText}>პაროლი წარმატებით განახლდა</p>
            <Link className={styles.a} to="/login">
              ავტორიზაცია
            </Link>
          </div>
        )}
        {!passwordRecovered && (
          <form onSubmit={submitHandler} className={styles.form}>
            <BasicInput
              showAccept={showPasswordAccept}
              showDecline={showPasswordDecline}
              input={passwordUpdate}
              name="password"
              type="password"
              state="password-recover"
              placeholder="Password123"
            >
              პაროლი
            </BasicInput>
            <BasicInput
              showAccept={showPasswordConfirmAccept}
              showDecline={showPasswordConfirmDecline}
              input={passwordConfirmUpdate}
              name="password_confirmation"
              type="password"
              state="password-recover"
              placeholder="Password123"
            >
              გაიმეორე პაროლი
            </BasicInput>
            {/* {error && <div className={styles.errorContainer}>{errors}</div>} */}
            <div style={{ position: "relative" }}>
              <BasicButton disabled={buttonDisabled} type="submit">
                <p className={requestInProcess ? styles.opacityDecrease : ""}>
                  პაროლის აღდგენა
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
        )}
      </main>
    </section>
  );
}

export default checkGuest(RecoverPassword);
