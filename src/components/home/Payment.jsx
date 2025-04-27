import React from "react";
import ReserveLayout from "./ReserveLayout";

const Payment = ( { toClose } ) => {
  return (
    <ReserveLayout
      toClose={toClose}
      color="#001010"
      header="this event has a set entry amount"
      subText="Your chip in covers the cost of entry no surprises, just good vibes."
    >
    <div>
        <Purple text='Required to join the fun' />
    </div>
      <div className="sm:w-[450px] w-full grid gap-12">
        <div className="flex justify-center items-center text-[#095256] paytone text-[14px] font-[400] gap-3 py-3 px-6 bg-white cursor-pointer rounded-full">pay with <img src='paystack.svg' /></div>
      </div>
    </ReserveLayout>
  );
};

export default Payment;




const Purple = ( { text } ) => {
  return (
    <div className="size-fit rounded-full py-1 px-2 bg-[#D9D1F1] satoshi text-[14px] font-[700] text-[#7A60BF]">{text}</div>
  )
}
