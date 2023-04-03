import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

//Pages
import Error from "./pages/Error/Error";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import Register from "./pages/Register/Register";
import Loader from "./pages/Verification/Loader";

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
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
