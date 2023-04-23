import { useEffect, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import DashboardLayout from "./components/DashboardLayout/DashboardLayout";
import BasicAxios from "./helpers/axios/index";
import Error from "./pages/Error/Error";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Tests from "./pages/Tests/Tests";
import RecoverPassword from "./pages/RecoverPassword/RecoverPassword";
import Register from "./pages/Register/Register";
import Loader from "./pages/Verification/Loader";
import { authActions } from "./store/auth";
import Loading from "./pages/Loading/Loading";
import Test from "./pages/Test/Test";
import Questions from "./pages/Questions/Questions";
import Result from "./pages/Result/Result";
import Profile from "./pages/Profile/Profile";

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
      setRendered(true);
    }
    if (!user) {
      BasicAxios.get("user")
        .then((res) => {
          dispatch(authActions.setUser(res.data.user));
          dispatch(authActions.setIsLoggedIn(true));

          setUser(res.data.user);
          setAuthStatus(true);
          setRendered(true);
        })
        .catch((err) => {
          dispatch(authActions.setUser(null));
          dispatch(authActions.setIsLoggedIn(false));
          setUser(null);
          setAuthStatus(false);
          setRendered(true);
        });
    }
  }, [location]);

  if (!rendered) return <Loading />;

  return (
    <Routes>
      <Route
        path="/"
        element={<Home data={authStatus} dataIsFetched={rendered} />}
      >
        <Route
          path="login"
          element={<Login data={authStatus} dataIsFetched={rendered} />}
        ></Route>
        <Route
          path="forgot-password"
          element={
            <ForgotPassword data={authStatus} dataIsFetched={rendered} />
          }
        ></Route>
      </Route>
      <Route
        path="/register"
        element={<Register data={authStatus} dataIsFetched={rendered} />}
      ></Route>
      <Route
        path="/account-verification/:code"
        element={<Loader data={authStatus} dataIsFetched={rendered} />}
      ></Route>
      <Route
        path="/recover-password/:token"
        element={<RecoverPassword data={authStatus} dataIsFetched={rendered} />}
      ></Route>

      <Route
        path="/board"
        element={<DashboardLayout data={authStatus} dataIsFetched={rendered} />}
      >
        <Route
          path="tests"
          element={<Tests data={authStatus} dataIsFetched={rendered} />}
        ></Route>
        <Route
          path="profile"
          element={<Profile data={authStatus} dataIsFetched={rendered} />}
        ></Route>
      </Route>
      <Route
        path="/board/tests/:id"
        element={<Test data={authStatus} dataIsFetched={rendered} />}
      >
        <Route
          path="page/:questionId"
          element={<Questions data={authStatus} dataIsFetched={rendered} />}
        ></Route>
        <Route
          path="result/:resultId"
          element={<Result data={authStatus} dataIsFetched={rendered} />}
        ></Route>
      </Route>

      <Route path="*" element={<Error />}></Route>
    </Routes>
  );
}
export default App;
