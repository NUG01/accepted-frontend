import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MailIcon from "../../assets/icons/MailIcon";
import BasicButton from "../../components/BasicButton/BasicButton";
import BasicInput from "../../components/BasicInput/BasicInput";
import ButtonSpinner from "../../components/Spinner/ButtonSpinner";
import checkGuest from "../../guards/checkGuest";
import BasicAxios from "../../helpers/axios/index";
import styles from "./ForgotPassword.module.scss";

const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

function emailValidation(value) {
  if (value.match(emailRegex)) {
    return true;
  }

  return false;
}

function ForgotPassword() {
  const navigate = useNavigate();

  const [emailValue, setEmailValue] = useState("");
  const [showEmailAccept, setShowEmailAccept] = useState(false);
  const [showEmailDecline, setShowEmailDecline] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [requestInProcess, setRequestInProcess] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  function closeLoginHandler() {
    navigate("..");
  }

  function emailUpdateHandler(data) {
    setEmailValue(data.target.value);
    const validated = emailValidation(data.target.value);
    setButtonDisabled(!validated);
    if (emailValidation(data.target.value)) {
      setShowEmailAccept(true);
      setShowEmailDecline(false);
    } else {
      setShowEmailAccept(false);
      setShowEmailDecline(true);
    }
    if (data.target.value.length === 0) {
      setShowEmailAccept(false);
      setShowEmailDecline(false);
    }
  }

  async function submitHandler(event) {
    event.preventDefault();
    setButtonDisabled(true);
    setRequestInProcess(true);

    try {
      const res = await BasicAxios.post("forgot-password", {
        email: emailValue,
      });
      setEmailSent(true);
    } catch (error) {
      setButtonDisabled(true);
      setRequestInProcess(true);
      alert(error);
    }
  }

  const linkStyle = {
    textDecoration: "none",
    color: "var(--dark-gray)",
    fontWeight: "500",
    fontSize: "1.1rem",
  };
  const linkContainer = {
    textAlign: "center",
    marginTop: "1rem",
  };

  return (
    <section>
      <div onClick={closeLoginHandler} className={styles.backdrop}></div>
      <div className={styles.formContainer}>
        {emailSent && (
          <div className={styles.emailSent}>
            <MailIcon />
            <p className={styles.mailText}>
              ელ.ფოსტაზე გამოგზავნილია პაროლის აღსადგენი ბმული
            </p>
            <a className={styles.a} href="https://gmail.com/" target="_blank">
              ელ.ფოსტის შემოწმება
            </a>
          </div>
        )}
        {!emailSent && (
          <form onSubmit={submitHandler}>
            <div className={styles.headerText}>დაგავიწყდა პაროლი?</div>
            <BasicInput
              showAccept={showEmailAccept}
              showDecline={showEmailDecline}
              input={emailUpdateHandler}
              name="password"
              type="text"
              placeholder="Example@gmail.com"
            >
              ელ.ფოსტა
            </BasicInput>
            <div className={styles.buttonContainer}>
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

              <div style={linkContainer}>
                <Link to=".." style={linkStyle}>
                  უკან დაბრუნება
                </Link>
              </div>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}

export default checkGuest(ForgotPassword);
