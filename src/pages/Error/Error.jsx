import { useNavigate, Link } from "react-router-dom";

import styles from "./Error.module.scss";
export default function Error() {
  const navigate = useNavigate();
  function goBack() {
    navigate("..");
  }
  return (
    <>
      <main className={styles.main}>
        <div className={styles.textCenter}>
          <p className={styles.p1}>404</p>
          <h1 className={styles.h1}>გვერდი ვერ მოიძებნა</h1>
          <p className={styles.p2}>
            ბოდიში, გვერდი რომელიც თქვენ მოითხოვეთ არ არსებობს.
          </p>
          <div className={styles.div}>
            <div className={styles.a} onClick={goBack}>
              უკან დაბრუნება
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
