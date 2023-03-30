import React from "react";
import { NavLink } from "react-router-dom";

function Error() {
  return (
    <>
      <h1>Not found</h1>
      <NavLink to="/">home</NavLink>
    </>
  );
}

export default Error;
