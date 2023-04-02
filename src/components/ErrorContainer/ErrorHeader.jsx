import React from "react";
import RuleIcon from "../../assets/icons/RuleIcon";
import styles from "./ErrorContainer.module.scss";

function ErrorHeader(props) {
  return (
    <div className={styles.iconContainer}>
      <div className={styles.flexbox}>
        <RuleIcon></RuleIcon>
      </div>
      <div className={styles.ruleName}>{props.children}</div>
    </div>
  );
}

export default ErrorHeader;
