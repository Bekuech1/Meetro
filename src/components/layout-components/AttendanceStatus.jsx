import { TickCircle } from "iconsax-reactjs";
import React from "react";

const statusConfig = {
  going: "bg-[#61B42D] border-[#7CE63A]",
  notgoing: "bg-[#7A60BF] border-[#866AD2]",
};


const AttendanceStatus = ({ status = "going" }) => {
  const statusStyles = statusConfig[status];

  return (
    <div
      className={`inline-flex items-center text-white gap-[4px] py-1 px-1.5 border rounded-full transition-all ${statusStyles} satoshi`}
      role="status"
    >
      <TickCircle size="12" color="white" variant="Bold" />
      <span className="font-medium capitalize text-xs">{status}</span>
    </div>
  );
};

export default AttendanceStatus;
