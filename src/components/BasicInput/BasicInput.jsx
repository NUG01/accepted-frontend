import { useState } from "react";
import styles from "./BasicInput.module.scss";
import AcceptedInput from "../../assets/icons/AcceptedInput";
import DeclinedInput from "../../assets/icons/DeclinedInput";

function BasicInput(props) {
  const showAccept = props.showAccept;
  const showDecline = props.showDecline;

  return (
    <div className={styles.container}>
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
        type={props.type}
      />
      <div className={styles.icon}>
        {showAccept && <AcceptedInput></AcceptedInput>}
        {showDecline && <DeclinedInput></DeclinedInput>}
      </div>
    </div>
  );
}

export default BasicInput;
