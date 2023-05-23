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
import Corridor from "./pages/Corridor/Corridor";
import PostReviewPage from "./pages/Post/PostReviewPage";
import Spinner from "./components/Spinner/Spinner";

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

  return (
    <Routes>
      <Route
        path="/"
        element={rendered ? <Home data={authStatus} /> : <Spinner />}
      >
        <Route
          path="login"
          element={rendered ? <Login data={authStatus} /> : <Spinner />}
        ></Route>
        <Route
          path="forgot-password"
          element={
            rendered ? <ForgotPassword data={authStatus} /> : <Spinner />
          }
        ></Route>
      </Route>
      <Route
        path="/register"
        element={rendered ? <Register data={authStatus} /> : <Spinner />}
      ></Route>
      <Route
        path="/account-verification/:code"
        element={rendered ? <Loader data={authStatus} /> : <Spinner />}
      ></Route>
      <Route
        path="/recover-password/:token"
        element={rendered ? <RecoverPassword data={authStatus} /> : <Spinner />}
      ></Route>

      <Route
        path="/board"
        element={rendered ? <DashboardLayout data={authStatus} /> : <Spinner />}
      >
        <Route
          path="corridor"
          element={rendered ? <Corridor data={authStatus} /> : <Spinner />}
        ></Route>
        <Route
          path="post/:postId"
          element={
            rendered ? <PostReviewPage data={authStatus} /> : <Spinner />
          }
        ></Route>
        <Route
          path="tests"
          element={rendered ? <Tests data={authStatus} /> : <Spinner />}
        ></Route>
        <Route
          path="profile"
          element={rendered ? <Profile data={authStatus} /> : <Spinner />}
        ></Route>
      </Route>
      <Route
        path="/board/tests/:id"
        element={rendered ? <Test data={authStatus} /> : <Spinner />}
      >
        <Route
          path="page/:questionId"
          element={rendered ? <Questions data={authStatus} /> : <Spinner />}
        ></Route>
        <Route
          path="result/:resultId"
          element={rendered ? <Result data={authStatus} /> : <Spinner />}
        ></Route>
      </Route>

      <Route path="*" element={<Error />}></Route>
    </Routes>
  );
}
export default App;
