import React from "react";
import { useNavigate } from "react-router-dom";
import checkAuth from "../../guards/checkAuth";

function Test() {
  const navigate = useNavigate();
  return (
    <h1
      onClick={() => {
        navigate("/main");
      }}
      className="text-[1.6rem] text-[#000]"
    >
      h1
    </h1>
  );
}

export default checkAuth(Test);
