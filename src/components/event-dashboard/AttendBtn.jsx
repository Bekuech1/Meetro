import React from "react";
import { LoadingSpinner } from "../create-event/Private";

export const AttendBtn = ({ type = "yes", loading, onClick }) => {
  // Handle click
  const handleClick = e => {
    e.stopPropagation();
    if (!loading && onClick) {
      onClick(e);
    }
  };

  return (
    <button
      type="button"
      className={`cursor-pointer w-full h-fit rounded-[60px] hover:bg-gray-200 hover:border-gray-300 border lg:py-3 lg:px-8 lg:gap-2 py-2 px-3 gap-1 bg-white flex flex-col paytone items-center justify-center transition-all duration-300 ease-in-out ${loading ? "opacity-50" : ""}`}
      onClick={handleClick}
      disabled={loading}
    >
      {loading ? (
        <div className="flex items-center justify-center gap-2 py-3">
          <LoadingSpinner size={20} />
        </div>
      ) : (
        <React.Fragment>
          <img
            src={`${type === "yes" ? "/tick-circle-green.svg" : "/timer-modal.svg"}`}
            className="size-8"
          />
          <h6
            className={`font-[400] text-[12px] lg:leading-[18px] capitalize transition-colors duration-200 ${type === "yes" ? "text-[#61B42D] hover:text-[#BEFD66]" : "text-[#7A60BF] hover:text-[#C7BAEA]"}`}
          >
            {type === "yes" ? "Going" : "Not sure"}
          </h6>
        </React.Fragment>
      )}
    </button>
  );
};
