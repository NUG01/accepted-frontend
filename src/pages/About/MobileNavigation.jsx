import { NavLink } from "react-router-dom";
import CloseHamburger from "../../assets/icons/CloseHamburger";
import styles from "./About.module.scss";

function MobileNavigation({ closeHamburger }) {
  const linkStyle = {
    textDecoration: "none",
    display: "inline-block",
  };
  const linkStyle2 = {
    textDecoration: "none",
    display: "inline-block",
    color: "#2e313d",
  };

  return (
    <div className="h-[100vh] w-[100%] z-50 bg-[var(--light-soft-gray)] flex items-center justify-center">
      <div
        onClick={closeHamburger}
        className="absolute top-0 right-0 -translate-x-[60%] translate-y-[40%]"
      >
        <CloseHamburger />
      </div>
      <div className="flex items-center justify-center text-[30px]">
        <div className={`${styles.mobileLinksContainer}`}>
          <NavLink className={`${styles.a}`} style={linkStyle2} to="login">
            ავტორიზაცია
          </NavLink>
          <NavLink
            className={`${styles.a} ${styles.active}`}
            style={linkStyle}
            to="register"
          >
            რეგისტრაცია
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default MobileNavigation;
