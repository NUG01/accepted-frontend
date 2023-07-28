import React from "react";
import styles from "./TestNavigation.module.scss";
import { NavLink, useParams } from "react-router-dom";

function TestNavigation({ questionData }) {
  const params = useParams();

  return (
    <div className={`${styles.navgrid} z-50`}>
      {questionData.map((item, i) => {
        return (
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "bg-[#464956] text-[#fff] rounded-[3px]"
                : "bg-[var(--soft-gray)] rounded-[3px]"
            }
            key={i}
            to={`/board/tests/${params.id}/page/${i + 1}`}
            style={{
              fontSize: "15px",
              border: "1px solid #000",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "1.6px",
            }}
          >
            {i + 1}
          </NavLink>
        );
      })}
    </div>
  );
}

export default TestNavigation;
