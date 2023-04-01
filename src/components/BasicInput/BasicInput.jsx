import { useState } from "react";
import styles from "./BasicInput.module.scss";
import AcceptedInput from "../../assets/icons/AcceptedInput";
import DeclinedInput from "../../assets/icons/DeclinedInput";

function BasicInput(props) {
  const showAccept = props.showAccept;
  const showDecline = props.showDecline;

  // let map;
  // if (props.rules) {
  //   map = props.rules.map((rule, key) => (
  //     <li className={styles.li} key={rule + key}>
  //       {rule[key]}
  //     </li>
  //   ));
  // }

  return (
    <div className={styles.container}>
      {/* {props.state == "registration" && (
        <div className={styles.ruleContainer}>
          {props.rules && <ul className={styles.ul}>{map}</ul>}
        </div>
      )} */}
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
            ? `${styles.input} ${styles.short}`
            : styles.input
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
