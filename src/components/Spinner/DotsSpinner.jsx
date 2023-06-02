import styles from "./DotsSpinner.module.scss";
function DotsSpinner() {
  return (
    <div className={styles["lds-ellipsis"]}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}

export default DotsSpinner;
