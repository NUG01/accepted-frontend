import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import BasicAxios from "../helpers/axios";
import { authActions } from "../store/auth.js";
import { useEffect } from "react";

let user = null;
function RequireAuth() {
  const location = useLocation();
  const authState = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    // let user = null;
    // if (!authState.user) {
    BasicAxios.get("/user").then((res) => {
      user = res.data.user;
      dispatch(authActions.setUser(res.data.user));
      dispatch(authActions.setIsLoggedIn(true));
    });

    console.log(authState);
  }, []);
  return user ? (
    <Outlet></Outlet>
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}

export default RequireAuth;

// const RequireAuth = async () => {
//   // const authState = useSelector((state) => state.auth);
//   const location = useLocation();
//   // const dispatch = useDispatch();
//   // let user = null;
//   // if (!authState.user) {
//   const res = await BasicAxios.get("/user");

//   // dispatch(authActions.setUser(res.data.user));
//   // dispatch(authActions.setIsLoggedIn(true));
//   const user = res.data.user;
//   console.log(user);

//   return user ? (
//     <Outlet></Outlet>
//   ) : (
//     <Navigate to="/login" state={{ from: location }} replace />
//   );
// };
// // }

// main();
