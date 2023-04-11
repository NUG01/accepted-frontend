import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import checkGuest from "../../guards/checkGuest";
import About from "../About/About";
import styles from "./Home.module.scss";

function Home() {
  useEffect(() => {}, []);

  return (
    <>
      <section>
        <div className={styles.backdropContainer}></div>
        <Outlet></Outlet>
        <About></About>
      </section>
    </>
  );
}

export default checkGuest(Home);
