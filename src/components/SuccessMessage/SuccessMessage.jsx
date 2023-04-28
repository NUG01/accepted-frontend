import React from "react";
import SuccessIcon from "../../assets/icons/SuccessIcon";

function SuccessMessage(props) {
  return (
    <div className="bg-gray-200 py-[5px] px-[9px] flex items-center justify-center rounded-[4px] gap-[4px]">
      <p className="text-[var(--etxra-dark-ocean-blue)]">{props.children}</p>
      <span>
        <SuccessIcon />
      </span>
    </div>
  );
}

export default SuccessMessage;
