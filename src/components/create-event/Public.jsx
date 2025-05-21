import React from "react";
import CreateEventBtn from "../Layout-conponents/CreateEventBtn";

const Public = ({ onPrivate }) => {
  return (
    <main className="bg-[#F0F0F0] min-h-[90vh] h-fit w-full grid gap-[43px] px-20 py-10">
      <div className="flex justify-center gap-12">
        {/* left section */}
        <section className="w-fit h-fit grid gap-4">
          <div className="grid h-fit">
            <h5 className="text-black text-[14px] font-[700] leading-[20px] satoshi capitalize">
              event image
            </h5>
            <p className="text-[#8A9191] text-[12px] font-[500] leading-[18px] satoshi capitalize">
              Upload a JPEG or PNG file with a size of 2mb or less
            </p>
          </div>
          <div className="relative">
            <img
              src="private.png"
              alt="Event-img"
              className="rounded-3xl sm:w-[349px] sm:h-[349px] w-[333px] h-[306px] backdrop-blur-[12px]"
            />
            <div className="absolute hidden top-[303px] left-[302px] rounded-full lg:flex items-center justify-center h-8 w-8 bg-white">
              <img src="image.svg" className="z-10" alt="" />
            </div>
          </div>
          <div className="flex justify-center p-2 items-start bg-[#F3F0FB]">
            <p className="text-[#7A60BF] text-[12px] font-[500] leading-[18px] satoshi capitalize">
              Images with a 1 : 1 ratio (a square) work best
            </p>
          </div>
          {/* <div className="flex p-3 gap-2 rounded-[12px] bg-white/50 border border-white backdrop-blur-[2px] items-center w-full">
            <h5 className="text-[#8A9191] text-[16px] font-[700] leading-[24px] satoshi capitalize w-full">
              theme settings
            </h5>
            <div className="aspect-square size-[47px] py-3 px-2 flex justify-center items-center rounded-[6px] backdrop-blur-[12px] border border-[#866AD2]"></div>
          </div> */}
        </section>

        {/* right section */}
        <section className="grid gap-6 items-start w-fit h-fit">
          <div className="grid gap-2">
            <div
              style={{
                boxShadow: "0px 4px 24px 0px rgba(0, 0, 0, 0.08)",
                backdropFilter: "blur(16px)",
              }}
              className="flex p-[4px] rounded-[20px] bg-white w-fit h-fit"
            >
              <div className="items-center py-1 px-[10px] rounded-3xl bg-white cursor-pointer">
                <h5
                  className="text-black text-[10px] font-[700] leading-[14px] satoshi capitalize"
                  onClick={onPrivate}
                >
                  private
                </h5>
              </div>
              <div className="items-center py-1 px-[10px] rounded-3xl bg-[#BEFD66]  cursor-pointer">
                <h5 className="text-black text-[10px] font-[700] leading-[14px] satoshi capitalize">
                  public
                </h5>
              </div>
              <div></div>
            </div>
            <p className="text-[#8A9191] text-[12px] font-[500] leading-[18px] satoshi capitalize">
              Open to all! Let the world (or at least your city) know what’s
              happening!
            </p>
          </div>
          {/* <div className="grid p-3 gap-4 rounded-[12px] bg-white/50 border border-white items-center w-full">
            <input
              type="text"
              placeholder="Event name"
              class="appearance-none bg-transparent border-none text-2xl font-[400] leading-[32px] text-black placeholder-[#8A9191] focus:outline-none paytone"
            />
          </div>
          <Grid title="event details">
            <Input leftImgSrc="timer.svg" text="when is your event?" />
            <Input leftImgSrc="location.svg" text="where is your event" />
            <Input leftImgSrc="crown.svg" text="who is the host" />
            <Input leftImgSrc="note-text.svg" text="event description" />
          </Grid>
          <Grid title="event settings">
            <Input leftImgSrc="note-text.svg" text="RSVP settings" />
            <Input leftImgSrc="note-text.svg" text="enter bank details" />
            <Input leftImgSrc="note-text.svg" text="reminders" />
          </Grid> */}
          <div className="w-full h-[553px] flex flex-col justify-center align-center text-center gap-2 px-20">
            <h1 className="text-black font-bold text-[18px] capitalize satoshi">
              coming soon
            </h1>
            <p className="text-[#8A9191] font-medium text-[16px] capitalize satoshi">
              Soon, you’ll be able to create tickets and host events <br /> for
              everyone to discover and join.
            </p>
          </div>
          <section className="h-fit w-full flex justify-between gap-4">
            <CreateEventBtn
              text="view preview"
              bgcolor="bg-[#E6F2F3]"
              textcolor="text-[#095256]"
              onClick=""
            />
            <CreateEventBtn
              text="create event"
              textcolor="text-[#55695E] cursor-not-allowed"
              bgcolor="bg-[#B0BAB5]"
              onClick=""
            />
          </section>
        </section>
      </div>
    </main>
  );
};

export default Public;

const Grid = ({ children, title, buttom }) => {
  return (
    <div className="grid w-full h-fit gap-3">
      <h4 className="text-black text-[14px] font-[700] leading-[20px] satoshi capitalize">
        {title}
      </h4>
      {children}
      <div className="flex gap-4 w-full">{buttom}</div>
    </div>
  );
};

const Input = ({ leftImgSrc, text, onClickRight }) => {
  return (
    <div className="flex justify-between p-3 gap-4 rounded-[12px] bg-white/50 border border-white items-center w-full">
      {/* Left Image */}
      <div className="bg-white p-1 rounded-4xl size-fit">
        <img src={leftImgSrc} alt="" className="w-5 h-4" />
      </div>

      {/* Middle Text */}
      <div className="text-left w-full text-[#8A9191] font-medium text-[14px] capitalize satoshi">
        {text}
      </div>

      {/* Right Image */}
      <img
        src="more-circle.svg"
        alt="Right Icon"
        className="size-4 cursor-pointer"
        onClick={onClickRight}
      />
    </div>
  );
};
