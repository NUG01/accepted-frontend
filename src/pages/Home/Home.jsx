import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Home.module.scss";
import { Outlet } from "react-router-dom";

function Home() {
  return (
    <>
      <section>
        <div className={styles.backdropContainer}></div>

        <Outlet></Outlet>
        <header>
          <div>mylogo</div>
          <div className={styles["menu-container"]}>
            <p>Home</p>
            <p>How it works</p>
            <p>About</p>
            <p>Pricing</p>
          </div>
          <div>
            <NavLink to="login">Login</NavLink>
            <NavLink>Register</NavLink>
          </div>
        </header>
      </section>
    </>
  );
}

export default Home;
