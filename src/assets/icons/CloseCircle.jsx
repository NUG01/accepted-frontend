import { useState } from "react";

function CloseCircle() {
  const [hover, setHover] = useState(false);
  return (
    <svg
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      width="30px"
      height="36px"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="style=doutone">
        <g id="close-circle">
          <path
            id="vector (Stroke)"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 2.75C6.89137 2.75 2.75 6.89137 2.75 12C2.75 17.1086 6.89137 21.25 12 21.25C17.1086 21.25 21.25 17.1086 21.25 12C21.25 6.89137 17.1086 2.75 12 2.75ZM1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C17.9371 1.25 22.75 6.06294 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75C6.06294 22.75 1.25 17.9371 1.25 12Z"
            fill={hover ? "#fff" : "#000"}
          />
          <path
            id="vector (Stroke)_2"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M8.46967 8.46967C8.76257 8.17678 9.23744 8.17678 9.53033 8.46967L15.5303 14.4697C15.8232 14.7626 15.8232 15.2374 15.5303 15.5303C15.2374 15.8232 14.7625 15.8232 14.4696 15.5303L8.46967 9.53033C8.17678 9.23743 8.17678 8.76256 8.46967 8.46967Z"
            fill="#BFBFBF"
          />
          <path
            id="vector (Stroke)_3"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M15.5303 8.46967C15.8232 8.76257 15.8232 9.23744 15.5303 9.53033L9.53033 15.5303C9.23743 15.8232 8.76256 15.8232 8.46967 15.5303C8.17678 15.2374 8.17678 14.7625 8.46967 14.4696L14.4697 8.46967C14.7626 8.17678 15.2374 8.17678 15.5303 8.46967Z"
            fill="#BFBFBF"
          />
        </g>
      </g>
    </svg>
  );
}

export default CloseCircle;
