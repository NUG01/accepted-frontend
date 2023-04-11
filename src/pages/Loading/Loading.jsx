import React from "react";
import styles from "./Loading.module.scss";

function Loading() {
  return (
    <div className={styles.div}>
      <span className={styles.loader}></span>;
    </div>
  );
}

export default Loading;
