import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store/index.js";

//Pages
import Error from "./pages/Error/Error";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import Register from "./pages/Register/Register";
import Loader from "./pages/Verification/Loader";
import Main from "./pages/Main/Main";
import RecoverPassword from "./pages/RecoverPassword/RecoverPassword";
import About from "./pages/About/About";
import BasicAxios from "./helpers/axios/index";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <Error />,
    children: [
      { path: "login", element: <Login /> },
      { path: "forgot-password", element: <ForgotPassword /> },
    ],
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/account-verification/:code",
    element: <Loader />,
  },
  {
    path: "/recover-password/:token",
    element: <RecoverPassword />,
  },
  {
    path: "/main",
    element: <Main />,
  },
  {
    path: "/about",
    element: <About />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}></RouterProvider>
    </Provider>
  </React.StrictMode>
);
