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
      className="fixed left-0 bottom-0 cursor-pointer bg-[var(--soft-gray)] pl-[15px] pb-[15px] pr-[3px] pt-[3px] rounded-tr-[6px]"
    >
      <BackArrow></BackArrow>
    </Link>
  );
}

export default PreviousArrow;
