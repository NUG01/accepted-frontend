import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.scss";

//Pages
import Error from "./pages/Error/Error";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <Error />,
    children: [{ path: "login", element: <Login /> }],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
