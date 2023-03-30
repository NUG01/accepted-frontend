import React from "react";
import styles from "./BasicInput.module.scss";

function BasicInput(props) {
  return (
    <div className={styles.container}>
      <label className={styles.label} htmlFor={props.name}>
        {props.children}
      </label>
      <input
        onChange={props.input}
        className={styles.input}
        placeholder={props.placeholder}
        id={props.name}
        type={props.type}
      />
    </div>
  );
}

export default BasicInput;
