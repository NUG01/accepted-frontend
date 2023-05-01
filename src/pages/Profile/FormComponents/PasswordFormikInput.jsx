import { useState } from "react";
import styles from "../Profile.module.scss";
import HidePasswordIcon from "../../../assets/icons/HidePassword";
import ShowPasswordIcon from "../../../assets/icons/ShowPassword";

function PasswordFormikInput({
  name,
  label,
  value,
  formik,
  touched,
  errors,
  type,
  showPassword,
  toggleState,
}) {
  return (
    <div className={styles.inputContainer}>
      <label htmlFor={name}>{label}</label>
      <div className="relative">
        <input
          className={`pr-[30px] ${styles.input}  ${
            touched && errors && styles.errorPresent
          }`}
          id={name}
          name={name}
          type={type}
          value={value}
          placeholder={value}
          {...formik.getFieldProps(name)}
        />
        <div className={styles.passwordShow} onClick={toggleState}>
          {showPassword ? <ShowPasswordIcon /> : <HidePasswordIcon />}
        </div>
      </div>

      <div>
        {touched && errors ? (
          <div className={styles.error}>{errors}</div>
        ) : null}
      </div>
    </div>
  );
}

export default PasswordFormikInput;
