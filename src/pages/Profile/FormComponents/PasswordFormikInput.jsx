import React from "react";
import styles from "../Profile.module.scss";

function PasswordFormikInput({
  name,
  label,
  value,
  formik,
  touched,
  errors,
  type,
}) {
  return (
    <div className={styles.inputContainer}>
      <label htmlFor={name}>{label}</label>

      <input
        className={`${styles.input}  ${
          touched && errors && styles.errorPresent
        }`}
        id={name}
        name={name}
        type={type}
        value={value}
        placeholder={value}
        {...formik.getFieldProps(name)}
      />

      <div>
        {touched && errors ? (
          <div className={styles.error}>{errors}</div>
        ) : null}
      </div>
    </div>
  );
}

export default PasswordFormikInput;
