import { useEffect, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import BasicAxios from "./helpers/axios/index";
import About from "./pages/About/About";
import Error from "./pages/Error/Error";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Main from "./pages/Main/Main";
import RecoverPassword from "./pages/RecoverPassword/RecoverPassword";
import Register from "./pages/Register/Register";
import Test from "./pages/Test/Test";
import Loader from "./pages/Verification/Loader";
import { authActions } from "./store/auth";

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [user, setUser] = useState(useSelector((state) => state.auth.user));

  const dispatch = useDispatch();
  const [rendered, setRendered] = useState(false);
  const [authStatus, setAuthStatus] = useState(
    useSelector((state) => state.auth.isLoggedIn)
  );
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setAuthStatus(true);
    }
    if (!user) {
      BasicAxios.get("user")
        .then((res) => {
          dispatch(authActions.setUser(res.data.user));
          dispatch(authActions.setIsLoggedIn(true));

          setUser(res.data.user);
          setAuthStatus(true);
        })
        .catch((err) => {
          dispatch(authActions.setUser(null));
          dispatch(authActions.setIsLoggedIn(false));
          setUser(null);
          setAuthStatus(false);
        });
    }
    setRendered(true);
  }, [location]);

  return (
    <Routes>
      <Route path="/" element={<Home data={authStatus} loading={!rendered} />}>
        <Route
          path="login"
          element={<Login data={authStatus} loading={!rendered} />}
        ></Route>
        <Route
          path="forgot-password"
          element={<ForgotPassword data={authStatus} loading={!rendered} />}
        ></Route>
      </Route>
      <Route
        path="/register"
        element={<Register data={authStatus} loading={!rendered} />}
      ></Route>
      <Route
        path="/account-verification/:code"
        element={<Loader data={authStatus} loading={!rendered} />}
      ></Route>
      <Route
        path="/recover-password/:token"
        element={<RecoverPassword data={authStatus} loading={!rendered} />}
      ></Route>
      <Route
        path="/about"
        element={<About data={authStatus} loading={!rendered} />}
      ></Route>

      <Route
        path="/main"
        element={<Main data={authStatus} loading={!rendered} />}
      />

      <Route
        path="/home"
        element={<Test data={authStatus} loading={!rendered} />}
      />

      <Route path="*" element={<Error />}></Route>
    </Routes>
  );
}
export default App;
