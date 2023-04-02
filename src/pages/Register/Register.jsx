import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Register.module.scss";
import BasicInput from "../../components/BasicInput/BasicInput";
import BasicButton from "../../components/BasicButton/BasicButton";
import HomeIcon from "../../assets/icons/HomeIcon";
import ButtonSpinner from "../../components/Spinner/ButtonSpinner";
import ErrorContainer from "../../components/ErrorContainer/ErrorContainer";
import RustaveliSvg from "../../assets/icons/RustaveliSvg";

import BasicAxios from "../../helpers/axios";

const regexGeorgian = /^[ა-ჰ]{2,16}$/;
const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

function Register() {
  const navigate = useNavigate();

  const [checkboxValue, setCheckboxValue] = useState("");
  const [nameValue, setNameValue] = useState("");
  const [surnameValue, setSurnameValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [passwordConfirmValue, setPasswordConfirmValue] = useState("");
  const [requestInProcess, setRequestInProcess] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const [nameError, setNameError] = useState(false);
  const [surnameError, setSurnameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPaswordError] = useState(false);
  const [passwordConfirmError, setPaswordConfirmError] = useState(false);
  const [checkboxError, setCheckboxError] = useState(false);

  function navigateToHomePage() {
    navigate("..");
  }

  function checkboxHandler(data) {
    setCheckboxValue(data.target.getAttribute("value"));
    if (checkboxError)
      formAccepted(data.target.getAttribute("value"), "checkbox");
  }
  function nameUpdate(data) {
    setNameValue(data.target.value);
    if (nameError) formAccepted(data.target.value, "name");
  }
  function surnameUpdate(data) {
    setSurnameValue(data.target.value);
    if (surnameError) formAccepted(data.target.value, "surname");
  }
  function emailUpdate(data) {
    setEmailValue(data.target.value);
    if (emailError) formAccepted(data.target.value, "email");
  }
  function passwordUpdate(data) {
    setPasswordValue(data.target.value);
    if (passwordError) formAccepted(data.target.value, "password");
  }
  function passwordConfirmUpdate(data) {
    setPasswordConfirmValue(data.target.value);
    if (passwordConfirmError) formAccepted(data.target.value, "confirm");
  }

  function formAccepted(value, type) {
    if (
      nameValue.match(regexGeorgian) &&
      surnameValue.match(regexGeorgian) &&
      emailValue.match(emailRegex) &&
      passwordValue.match(passwordRegex) &&
      passwordConfirmValue == passwordValue &&
      (checkboxValue == "1" || checkboxValue == "2" || checkboxValue == "3")
    ) {
      return true;
    }
    if (
      type == "name"
        ? !value.match(regexGeorgian)
        : !nameValue.match(regexGeorgian)
    ) {
      setNameError(true);
    } else {
      setNameError(false);
    }

    if (
      type == "surname"
        ? !value.match(regexGeorgian)
        : !surnameValue.match(regexGeorgian)
    ) {
      setSurnameError(true);
    } else {
      setSurnameError(false);
    }

    if (
      type == "email" ? !value.match(emailRegex) : !emailValue.match(emailRegex)
    ) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }

    if (
      type == "password"
        ? !value.match(passwordRegex)
        : !passwordValue.match(passwordRegex)
    ) {
      setPaswordError(true);
    } else {
      setPaswordError(false);
    }

    if (
      type == "confirm"
        ? value != passwordValue
        : passwordConfirmValue != passwordValue
    ) {
      setPaswordConfirmError(true);
    } else {
      setPaswordConfirmError(false);
    }

    if (
      type == "checkbox"
        ? !(value == "1" || value == "2" || value == "3")
        : !(
            checkboxValue == "1" ||
            checkboxValue == "2" ||
            checkboxValue == "3"
          )
    ) {
      setCheckboxError(true);
    } else {
      setCheckboxError(false);
    }
    return false;
  }

  async function submitHandler(event) {
    event.preventDefault();
    formAccepted();
    if (formAccepted() == false) {
      return;
    }
    const data = {
      name: nameValue,
      surname: surnameValue,
      email: emailValue,
      password: passwordValue,
      password_confirmation: passwordConfirmValue,
      role: checkboxValue,
    };
    try {
      setButtonDisabled(true);
      setRequestInProcess(true);
      const res = await BasicAxios.post("register", data);
      console.log(res);
    } catch (err) {
      alert(err);
    }
  }

  return (
    <section className={styles.container}>
      <div className={styles.writing}>
        <RustaveliSvg></RustaveliSvg>
      </div>
      <div className={styles.errorContainer}>
        <ErrorContainer
          nameError={nameError}
          surnameError={surnameError}
          emailError={emailError}
          passwordError={passwordError}
          passwordConfirmError={passwordConfirmError}
          checkboxError={checkboxError}
        ></ErrorContainer>
      </div>
      <div onClick={navigateToHomePage} className={styles.icon}>
        <HomeIcon></HomeIcon>
      </div>
      <main className={styles.formContainer}>
        <form onSubmit={submitHandler} className={styles.form}>
          <BasicInput
            input={nameUpdate}
            errorState={nameError}
            name="name"
            type="text"
            state="registration"
            placeholder="შოთა"
          >
            სახელი
          </BasicInput>
          <BasicInput
            errorState={surnameError}
            input={surnameUpdate}
            name="surname"
            type="text"
            state="registration"
            placeholder="რუსთაველი"
          >
            გვარი
          </BasicInput>
          <BasicInput
            errorState={emailError}
            input={emailUpdate}
            name="email"
            type="text"
            state="registration"
            placeholder="Example@gmail.com"
          >
            ელ.ფოსტა
          </BasicInput>
          <BasicInput
            errorState={passwordError}
            input={passwordUpdate}
            name="password"
            type="password"
            state="registration"
            placeholder="Password123"
          >
            პაროლი
          </BasicInput>
          <BasicInput
            errorState={passwordConfirmError}
            input={passwordConfirmUpdate}
            name="password_confirmation"
            type="password"
            state="registration"
            placeholder="Password123"
          >
            გაიმეორე პაროლი
          </BasicInput>
          <div>
            <label htmlFor="select" className={styles.lightLabel}>
              ვინ ხარ?
            </label>
            <div
              id="select"
              name="select"
              className={
                !checkboxError
                  ? styles.select
                  : `${styles.select} ${styles.invalid}`
              }
            >
              <div
                onClick={checkboxHandler}
                value="1"
                className={
                  checkboxValue == 1
                    ? `${styles.checkBox} ${styles.selected}`
                    : styles.checkBox
                }
              >
                აბიტურიენტი
              </div>
              <div
                onClick={checkboxHandler}
                value="2"
                className={
                  checkboxValue == 2
                    ? `${styles.checkBox} ${styles.selected}`
                    : styles.checkBox
                }
              >
                სტუდენტი
              </div>
              <div
                onClick={checkboxHandler}
                value="3"
                className={
                  checkboxValue == 3
                    ? `${styles.checkBox} ${styles.selected}`
                    : styles.checkBox
                }
              >
                მასწავლებელი
              </div>
            </div>
          </div>
          <div style={{ position: "relative" }}>
            <BasicButton disabled={buttonDisabled} type="submit">
              <p className={requestInProcess ? styles.opacityDecrease : ""}>
                რეგისტრაცია
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
      </main>
    </section>
  );
}

export default Register;
