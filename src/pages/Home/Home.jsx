import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Home.module.scss";
import { Outlet } from "react-router-dom";

function Home() {
  const linkStyle = {
    textDecoration: "none",
    display: "inline-block",
  };

  return (
    <>
      <section>
        <div className={styles.backdropContainer}></div>
        <Outlet></Outlet>
        <header className={styles.container}>
          <div>mylogo</div>
          <div className={styles["menu-container"]}>
            <p>Home</p>
            <p>How it works</p>
            <p>About</p>
            <p>Pricing</p>
          </div>
          <div className={styles.linksContainer}>
            <NavLink className={styles.a} style={linkStyle} to="login">
              ავტორიზაცია
            </NavLink>
            <NavLink className={`${styles.a} ${styles.active}`} style={linkStyle} to="register">
              რეგისტრაცია
            </NavLink>
          </div>
        </header>
      </section>
    </>
  );
}

export default Home;
