import { useState } from "react";
import styles from "./BasicButton.module.scss";
import ButtonSpinner from "../Spinner/ButtonSpinner";

function BasicButton(props) {
  return (
    <div style={{ position: "relative" }}>
      <button
        disabled={props.disabled}
        style={
          props.style == "dark-outline"
            ? {
                outline: "1.5px solid var(--ocean-blue)",
              }
            : undefined
        }
        className={`${styles.button} ${props.style ? props.style : undefined}`}
        type={props.type}
      >
        {props.children}
      </button>
      {props.spinner && (
        <div className={styles.relativeContainer}>
          <div className={styles.spinnerContainer}>
            <ButtonSpinner />
          </div>
        </div>
      )}
    </div>
  );
}

export default BasicButton;
