import React from "react";
import styles from "./TestNavigation.module.scss";
import { NavLink, useParams } from "react-router-dom";

function TestNavigation({ questionData }) {
  const params = useParams();
  return (
    <div className={`${styles.navgrid} z-50`}>
      {questionData.map((item) => {
        return (
          // <div>

          <NavLink
            className={({ isActive }) => (isActive ? "bg-gray-200" : "")}
            key={item.id}
            to={`/board/tests/${params.id}/page/${item.id}`}
            style={{
              fontSize: "15px",
              border: "1px solid #000",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "1.6px",
            }}
          >
            {item.id}
          </NavLink>
          // </div>
        );
      })}
    </div>
  );
}

export default TestNavigation;
