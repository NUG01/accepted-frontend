import { useState } from "react";
import styles from "./BasicInput.module.scss";
import AcceptedInput from "../../assets/icons/AcceptedInput";
import DeclinedInput from "../../assets/icons/DeclinedInput";
import HidePassword from "../../assets/icons/HidePassword";
import ShowPassword from "../../assets/icons/ShowPassword";

function BasicInput(props) {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const showAccept = props.showAccept;
  const showDecline = props.showDecline;

  function passwordVisibilityHandler() {
    setPasswordVisible(!passwordVisible);
  }

  return (
    <div className={styles.container}>
      {props.type == "password" && props.state == "registration" && (
        <div
          onClick={passwordVisibilityHandler}
          className={styles.passwordVisibility}
        >
          {!passwordVisible && <HidePassword />}
          {passwordVisible && <ShowPassword />}
        </div>
      )}
      <label
        className={
          props.state == "registration" ? styles.lightLabel : styles.label
        }
        htmlFor={props.name}
      >
        {props.children}
      </label>

      <input
        onChange={props.input}
        className={
          props.state == "registration"
            ? !props.errorState
              ? `${styles.input} ${styles.short}`
              : `${styles.input} ${styles.invalid} ${styles.short}`
            : !props.errorState
            ? `${styles.input}`
            : `${styles.input} ${styles.invalid}`
        }
        placeholder={props.placeholder}
        id={props.name}
        type={!passwordVisible ? props.type : "text"}
      />

      <div className={styles.icon}>
        <div className={styles.iconsContainer}>
          {props.type == "password" &&
            (props.state == "login" || props.state == "password-recover") && (
              <div
                onClick={passwordVisibilityHandler}
                className={
                  showAccept || showDecline
                    ? styles.passwordVisibilityLoginSecondary
                    : styles.passwordVisibilityLogin
                }
              >
                {!passwordVisible && <HidePassword />}
                {passwordVisible && <ShowPassword />}
              </div>
            )}
          {showAccept && <AcceptedInput></AcceptedInput>}
          {showDecline && <DeclinedInput></DeclinedInput>}
        </div>
      </div>
    </div>
  );
}

export default BasicInput;
