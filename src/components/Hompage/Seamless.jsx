import React from "react";
import Button from "../Layout-conponents/Button";
import SeamlessAni from "../Layout-conponents/SeamlessAni";

const Seamless = ({ onclick }) => {
  return (
    <div className="bg-[#E6F2F3] xl:h-screen h-fit xl:flex grid justify-center gap-[60px] items-center py-12">
      <div className="grid gap-12 xl:w-[45%] w-[90%] mx-auto xl:mx-0 max-w-[500px]">
        <div className="grid gap-6">
          <h5 className="capitalize text-[36px] md:text-[60px] font-[400] leading-[100%] text-[#055962]  w-fit lg:w-[560px] paytone">
            your event, your people.
          </h5>
          <div className="grid gap-2 w-fit">
            <div className="flex gap-2 w-fit">
              <h6 className="font-[700] text-[14px] md:text-[16px] leading-6 text-[#8A9191] satoshi">
                Create invite-only events for game nights, birthday dinners,
                beach hangouts. Whatever you’re planning, keep it lowkey and
                high-vibe.
              </h6>
            </div>
          </div>
        </div>
        <div className="flex gap-4 w-fit">
          <Button name="Join Waitlist" color="bg-[#AFFC41]" onclick={onclick} />
          <a
            href="https://chat.whatsapp.com/FLUaeqHc6oAIXNJeHilDhQ"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button name="Join Community" color="bg-white" />
          </a>
        </div>
      </div>
      <div>
        <SeamlessAni />
      </div>
    </div>
  );
};

export default Seamless;
