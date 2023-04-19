import React from "react";
import { Link } from "react-router-dom";
import BackArrow from "../../assets/icons/BackArrow";

function PreviousArrow() {
  function pageChange(ev) {
    let url = location.pathname;
    let parts = url.split("/");
    let lastParam = parts.pop();
    let newLastParam;
    if (ev == "next") newLastParam = parseInt(lastParam) + 1;
    if (ev == "previous") newLastParam = parseInt(lastParam) - 1;
    parts.push(newLastParam);
    let newUrl = parts.join("/");

    return newUrl;
  }
  return (
    <Link
      to={pageChange("previous")}
      className="absolute left-0 bottom-0 translate-x-1/2 -translate-y-1/2 cursor-pointer"
    >
      <BackArrow></BackArrow>
    </Link>
  );
}

export default PreviousArrow;
