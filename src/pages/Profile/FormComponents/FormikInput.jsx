import React from "react";
import styles from "../Profile.module.scss";

function FormikInput({ name, label, errorClassShow, value, formik, touched, errors }) {
  return (
    <div className={styles.inputContainer}>
      <label htmlFor={name}>{label}</label>

      <input
        className={`${styles.input} ${errorClassShow && styles.errorPresent}`}
        id={name}
        name={name}
        type="text"
        value={value}
        placeholder={value}
        {...formik.getFieldProps(name)}
      />

<div>
      {touched && errors? (
        <div className={styles.error}>{errors}</div>
      ) : null}
    </div>

    </div>
  );
}

export default FormikInput;
