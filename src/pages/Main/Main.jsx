import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import checkAuth from "../../guards/checkAuth";
import BasicAxios from "../../helpers/axios/index";
import { authActions } from "../../store/auth.js";

function Main() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  function logoutHandler() {
    BasicAxios.post("logout").then((res) => {
      dispatch(authActions.setUser(null));
      dispatch(authActions.setIsLoggedIn(false));
      window.location.reload();
    });
  }
  return (
    <>
      <div>
        <p style={{ color: "red" }} onClick={logoutHandler}>
          Main Page
        </p>
        <Link to="/home" className="text-[#000] text-[2rem]">
          home
        </Link>
        <Link to="/" className="text-[#000] text-[2rem]">
          esa
        </Link>
      </div>
    </>
  );
}

export default checkAuth(Main);
