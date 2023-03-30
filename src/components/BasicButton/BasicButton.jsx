import React from "react";
import styles from "./BasicButton.module.scss";

function BasicButton(props) {
  return (
    <button
      disabled={props.disabled}
      className={styles.button}
      type={props.type}
    >
      {props.children}
    </button>
  );
}

export default BasicButton;
