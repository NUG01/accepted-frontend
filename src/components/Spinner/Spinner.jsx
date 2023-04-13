import styles from "./Spinner.module.scss";

function Loading() {

  return (
    <div className={styles.div}>
      <span className={styles.loader}></span>;
    </div>
  );
}

export default Loading;
