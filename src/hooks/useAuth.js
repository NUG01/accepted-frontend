import { useEffect } from "react";
import BasicAxios from "../helpers/axios/index";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../store/auth";
import { csrf, getUser } from "../services";

function useAuth() {
  const authState = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // useEffect(() => {
  async function main() {
    try {
      csrf();
      const user = await getUser();
      console.log(user);
      // dispatch(authActions.setUser(user));
      // dispatch(authActions.setIsLoggedIn(true));
      console.log(authState);
    } catch (error) {
      console.log(error);
    }
  }

  main();
  // BasicAxios.get("user")
  //   .then((res) => {
  //     if (res.data.user != null) navigate("/main");
  //     console.log(res.data.user);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
  // }, []);
}

export default useAuth;
