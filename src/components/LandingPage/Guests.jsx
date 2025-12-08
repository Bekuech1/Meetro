import { Link } from "react-router";
import CtaButton from "../Layout-conponents/CtaButton";
import { useCreateEvent } from "@/hooks/useCreateEvent";

const Guests = () => {
  const { handleCreateEvent } = useCreateEvent();
  return (
    <div className="bg-[#E6FEC4]">
      <div className="min-h-screen xl:flex grid max-w-[1312px] px-4 mx-auto justify-center gap-[60px] 2xl:gap-x-[100px] items-center py-12">
        <div className="grid gap-12 max-w-[560px]">
          <div className="grid gap-6">
            <h5 className="capitalize text-[36px] md:text-[60px] font-[400] leading-[100%] text-[#608B23] w-fit lg:w-[560px] paytone">
              let your guests chip in
            </h5>
            <div className="grid gap-2 w-fit">
              <div className="flex gap-2 w-fit">
                <h6 className="font-[700] text-[14px] md:text-[16px] leading-6 text-[#608B23] satoshi">
                  No more fronting the bill solo. Set up a Chip In and let
                  guests contribute to food, drinks, venue or whatever’s needed.
                </h6>
              </div>
            </div>
          </div>
          <div className="flex gap-4 w-fit">
            <CtaButton name="try it out!" onClick={handleCreateEvent} />
          </div>
        </div>
        <div className="max-w-[660px] relative rounded-4xl min-h-[300px] sm:min-h-[300px] md:min-h-[400px] lg:min-h-[532px] bg-[linear-gradient(180deg,rgba(123,173,52,0.1)_0%,rgba(122,161,91,0.1)_100%)] backdrop-blur-[32px] flex justify-center items-center">
          <img
            src="/about-l.png"
            className="absolute 2xl:top-[150px] lg:top-[140px] sm:top-[100px] 2xl:-left-[65px] sm:-left-[20px] -left-[12px] size-[50%]"
            alt=""
          />
          <img src="/about-c.png" alt="" className="z-1 size-[80%]" />
          <img
            src="/about-r.png"
            className="absolute 2xl:top-[150px] lg:top-[140px] sm:top-[100px] 2xl:left-[375px] left-[52%] size-[50%]"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Guests;
