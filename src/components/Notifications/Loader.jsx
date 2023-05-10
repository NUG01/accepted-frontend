import React from "react";
import styles from "./Notifications.module.scss";

function Loader() {
  return (
    <div className="flex items-center justify-center pt-[150px]">
      <span class={styles.loader}></span>
    </div>
  );
}

export default Loader;
