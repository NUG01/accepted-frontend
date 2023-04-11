import BasicAxios from "../helpers/axios/index";
import Loading from "../pages/Loading/Loading";

export const notAuthenticated = (
  authState,
  dispatch,
  navigate,
  authActions
) => {
  if (!authState.isLoggedIn) {
    BasicAxios.get("/user")
      .then((res) => {
        dispatch(authActions.setUser(res.data.user));
        dispatch(authActions.setIsLoggedIn(true));
      })
      .catch((err) => {
        dispatch(authActions.setUser({}));
        dispatch(authActions.setIsLoggedIn(false));
        navigate("/");
      });
  }
};

export const authenticated = (authState, dispatch, navigate, authActions) => {
  if (!authState.isLoggedIn) {
    BasicAxios.get("/user")
      .then((res) => {
        dispatch(authActions.setUser(res.data.user));
        dispatch(authActions.setIsLoggedIn(true));
        navigate("/main");
      })
      .catch((err) => {
        dispatch(authActions.setUser({}));
        dispatch(authActions.setIsLoggedIn(false));
      });
  } else {
    navigate("/main");
  }
};
