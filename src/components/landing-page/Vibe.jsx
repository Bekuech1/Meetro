import { Link } from "react-router";
import Button from "../layout-components/Button";
import { useCreateEvent } from "@/hooks/useCreateEvent";

const Vibe = () => {
  const { handleCreateEvent } = useCreateEvent();

  return (
    <div className="bg-[#011F0F]">
      <div className="min-h-screen max-w-[1312px] px-4 mx-auto flex xl:flex-row flex-col-reverse justify-center gap-[60px] items-center py-12">
        <div className="max-w-[660px] w-full relative min-h-[300px] sm:min-h-[300px] md:min-h-[400px] md:mx-0 lg:min-h-[532px] max-h-[562px] overflow-y-hidden bg-[linear-gradient(180deg,rgba(123,173,52,0.1)_0%,rgba(122,161,91,0.1)_100%)] backdrop-blur-[32px] flex justify-center rounded-4xl">
          <div className="w-[313px] h-[669px] rounded-[27px] border-[12px] border-[#FFFFFF1A] mt-10">
            <img src="/statusbar.png" alt="" className="rounded-t-2xl" />
            <img src="/frame-test.png" alt="" />
          </div>
          <section className="w-fit bg-white/10 border backdrop-blur-2xl border-white/20 p-3 rounded-[12px] gap-4 absolute bottom-4 ">
            <h6 className="satoshi font-medium text-[14px] leading-5 text-white capitalize">
              themes
            </h6>
            <div className="flex gap-4 h-fit w-fit">
              <img
                src="/vibe1.png"
                alt=""
                className="aspect-square w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-[6px] object-cover border border-white"
              />
              <img
                src="/vibe2.png"
                alt=""
                className="aspect-square w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-[6px] object-cover border border-white"
              />
              <img
                src="/vibe3.png"
                alt=""
                className="aspect-square w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-[6px] object-cover border border-white"
              />
              <img
                src="/vibe4.png"
                alt=""
                className="aspect-square w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-[6px] object-cover border border-white"
              />
              <img
                src="/vibe5.png"
                alt=""
                className="aspect-square w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-[6px] object-cover border border-white"
              />
              <img
                src="/vibe6.png"
                alt=""
                className="aspect-square w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-[6px] object-cover border border-white"
              />
            </div>
          </section>
        </div>
        <div className="grid gap-12 max-w-[560px] w-full">
          <div className="grid gap-6">
            <h5 className="capitalize text-[36px] md:text-[60px] font-[400] leading-[100%] text-[#AEFC40] w-full paytone">
              set the vibe with custom event themes
            </h5>
            <div className="grid gap-2 w-fit">
              <div className="flex gap-2 w-fit">
                <h6 className="font-[700] text-[14px] md:text-[16px] leading-6 text-[#AEFC40] satoshi">
                  Whether you're planning a cozy dinner or a rooftop rave,
                  Meetro lets you pick themes that match the mood. Your event,
                  your vibe.
                </h6>
              </div>
            </div>
          </div>
          <div className="flex gap-4 w-fit">
            <Button
              name="explore themes"
              color="bg-white"
              onClick={handleCreateEvent}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Vibe;
