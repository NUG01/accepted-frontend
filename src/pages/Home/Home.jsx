import { useEffect } from "react";
import { NavLink, useNavigate, useLoaderData } from "react-router-dom";
import styles from "./Home.module.scss";
import { Outlet } from "react-router-dom";
import About from "../About/About";
import BasicAxios from "../../helpers/axios/index";
import useAuth from "../../hooks/useAuth";
import { useSelector } from "react-redux";

function Home() {
  const navigate = useNavigate();
  const authState = useSelector((state) => state.auth);
  BasicAxios.get("user")
    .then((res) => {
      console.log(res.data.user);
      console.log(authState);
    })
    .catch((err) => {
      console.log(err.response?.data?.message);
    });

  // useAuth();
  // const authState = useSelector((state) => state.auth);

  // if(authState.isLoggedIn) navigate('/main')

  // console.log("//");
  // console.log(authState);

  // if (loaderData) navigate("/main");
  // if (loaderData == "false") navigate("/login");

  // useEffect(() => {
  //   BasicAxios.get("user")
  //     .then((res) => {
  //       if (res.data.user != null) navigate("/main");
  //       console.log(res.data.user);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  return (
    <>
      <section>
        <div className={styles.backdropContainer}></div>
        <Outlet></Outlet>
        <About></About>
        {/* <header className={styles.container}>
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
        </header> */}
      </section>
    </>
  );
}

export default Home;
