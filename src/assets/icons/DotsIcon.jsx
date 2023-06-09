import React from "react";

function DotsIcon() {
  return (
    <svg
      fill="#000000"
      width="20px"
      height="20px"
      viewBox="0 0 256 256"
      id="Flat"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g opacity="0.1">
        <circle cx="128" cy="128" r="24" />
      </g>
      <g opacity="0.1">
        <circle cx="128" cy="48" r="24" />
      </g>
      <g opacity="0.1">
        <circle cx="128" cy="208" r="24" />
      </g>
      <g>
        <path d="M128,96a32,32,0,1,0,32,32A32.03667,32.03667,0,0,0,128,96Zm0,48a16,16,0,1,1,16-16A16.01833,16.01833,0,0,1,128,144Z" />
        <path d="M128,80A32,32,0,1,0,96,48,32.03667,32.03667,0,0,0,128,80Zm0-48a16,16,0,1,1-16,16A16.01833,16.01833,0,0,1,128,32Z" />
        <path d="M128,176a32,32,0,1,0,32,32A32.03667,32.03667,0,0,0,128,176Zm0,48a16,16,0,1,1,16-16A16.01833,16.01833,0,0,1,128,224Z" />
      </g>
    </svg>
  );
}

export default DotsIcon;
