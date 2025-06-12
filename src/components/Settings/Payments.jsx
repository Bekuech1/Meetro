import React from "react";

const Payments = () => {
  return (
    <div className="flex flex-col gap-1 mb-8">
      <div>
        <h2 className="text-[#001010] font-bold text-[14px] satoshi">
          Get Paid Your Way
        </h2>
        <p className="text-[#8A9191] text-[14px] font-medium">
          Choose how you want to receive your events earnings{" "}
        </p>
      </div>
      <div className="flex gap-2 items-center bg-[#FFFFFE80] border border-[#FFFFFE] rounded-[12px] p-4 mb-6">
        <img src="/icons/bank.svg" alt="" />

        <div className="w-full flex flex-col gap-1">
          <h2 className="text-[#001010] font-bold text-[14px] satoshi">
            Bank Details
          </h2>
          <p className="text-[#8A9191] font-medium text[14px]">
            Get your money straight to your bank account
          </p>
        </div>

        <img src="/icons/arrow-right.svg" alt="" />
      </div>
    </div>
  );
};

export default Payments;
