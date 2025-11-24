import Paystack from "@/assets/icons/Paystack";
import API from "@/lib/axios";
import React, { useState } from "react";
import { formatNaira } from "@/lib/utils";
import { useAuthStore } from "@/stores/useAuthStore";
import { createPortal } from "react-dom";
import { LoadingSpinner } from "../create-event/Private";
import { CloseCircle } from "iconsax-reactjs";

export default function ChipInModal({ close, type, eventId, amount }) {
  const [loading, setLoading] = useState(false);
  const { user } = useAuthStore();

  console.log(amount);

  const handleChipIn = async () => {
    setLoading(true);
    const payload = {
      eventId,
      amount,
      userEmail: user.email,
    };
    console.log(payload);

    try {
      const response = await API.post("/donations", payload);
      const { paymentUrl } = response.data;
      window.location.href = paymentUrl;
    } catch (error) {
      console.log("Donation failed:", error.response?.data || error);
    } finally {
      setLoading(false);
    }
  };

  return createPortal(
    <React.Fragment>
      <div
        className="fixed inset-0 bg-[#00000080] backdrop-blur-xs z-[1001] p-2"
        onClick={close}
      />
      <div className="px-4 fixed top-1/2 left-1/2 -translate-1/2 z-[1002] w-full md:max-w-[578px] flex flex-col  items-center gap-5">
        <div className="w-full flex justify-end">
          <button className="cursor-pointer flex sm:hidden">
            <CloseCircle
              size={48}
              variant="Bulk"
              onClick={close}
              color="#ffffff"
            />
          </button>
        </div>
        <div className="bg-[#FFFFFFE5] p-6 md:p-12 border border-white backdrop-blur-[32px] rounded-3xl flex flex-col items-center gap-12">
          <div className=" flex flex-col items-center gap-2">
            <h2 className="text-[#001010] paytone text-2xl">
              {type === "FIXED" && "This event has a set entry amount."}
              {type === "FLEXIBLE" && "Your vibe, your price"}
            </h2>
            <p className="text-center text-[#8A9191]">
              {type === "FIXED" &&
                "Your chip in covers the cost of entry no surprises, just good vibes."}
              {type === "FLEXIBLE" &&
                "Support the host however you can, every chip in counts."}
            </p>
          </div>
          <div className="font-bold satoshi flex flex-col items-center">
            <div className="flex items-center gap-x-2">
              <h1 className="text-[#001010] text-[48px] leading-[65px]  md:text-[72px] tracking-[-2%] md:leading-[97px]">
                ₦{amount.split(".")[0]}
              </h1>
              {type === "FLEXIBLE" && (
                <span className="text-[24px] leading-[32px] md:text-[30px] md:leading-[38px] text-[#8A9191] satoshi font-boldz">
                  Min
                </span>
              )}
            </div>
            <span className="inline-block py-1 px-2 bg-[#D9D1F1] text-[#7A60BF] rounded-full text-sm">
              {type === "FLEXIBLE" && "Give what feels right ❤️"}
              {type === "FIXED" && "Required to join the fun"}
            </span>
          </div>
          <button
            onClick={handleChipIn}
            disabled={loading}
            className="h-9 w-full flex items-center rounded-full text-[#095256] text-sm paytone gap-2.5 justify-center bg-white"
          >
            {loading ? (
              <LoadingSpinner />
            ) : (
              <React.Fragment>
                Pay with <Paystack />
              </React.Fragment>
            )}
          </button>
        </div>
      </div>
    </React.Fragment>,
    document.body
  );
}
