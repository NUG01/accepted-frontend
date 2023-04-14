import styles from "./Test.module.scss";

import React from "react";
import checkAuth from "../../guards/checkAuth";
import HomeIcon from "../../assets/icons/HomeIcon";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";

function Test() {
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname;
  return (
    <section className="text-[20px] text-[#000] w-[100vw] min-h-[100vh]">
      <div
        className="absolute top-0 left-0 translate-x-1/2 translate-y-1/2 cursor-pointer z-50"
        onClick={() => {
          localStorage.clear();
          navigate("/board/tests");
        }}
      >
        <HomeIcon></HomeIcon>
      </div>
      {path == "/board/tests/1" && (
        <Link
          to="page/1"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20px] text-[#000] cursor-pointer"
        >
          ტესტის დაწყება
        </Link>
      )}

      <Outlet></Outlet>
    </section>
  );
}

export default checkAuth(Test);
