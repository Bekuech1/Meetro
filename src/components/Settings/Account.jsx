import React, { useState } from "react";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "../ui/select";
import PopUpInput from "../create-event/PopUps/Popup components/PopUpInput";
import TextOnlyInput from "../create-event/PopUps/Popup components/TextOnlyInput";
import { statesAndCapitals } from "@/constants/StateAndCapital";

const Account = ({ form, setForm }) => {
  const handleChange = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  const [stateLocation, setStateLocation] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="satoshi flex flex-col gap-8 mb-8">
      {/* users profile image update section */}
      <div className="flex flex-col gap-4">
        <div>
          <h2 className="text-[#001010] text-[14px] font-bold">
            Profile picture
          </h2>
          <p className="text-[#8A9191] text-[14px] font-medium">
            Upload a JPEG or PNG file with a size of 2mb or less
          </p>
        </div>

        <div className="flex flex-col md:flex-row md:items-center gap-4 md:w-[426px]">
          <img
            src="/profileimg.png"
            alt="user-profile-picture"
            className="w-[83px] h-[83px] md:w-[154px] md:h-[154px]"
          />

          <div className="flex flex-col gap-4 w-full md:w-[300px]">
            <p className="bg-[#F3F0FB] md:w-[256px] p-2 rounded-2xl text-[#7A60BF] text-[12px] font-medium">
              Images with a 1:1 ratio (a square) work best
            </p>

            <div className="flex items-center gap-4">
              <button className="w-full p-2 bg-[#FFFFFE] text-[#095256] paytone rounded-[60px]">
                Upload image
              </button>
              <button className="w-fit p-3 bg-[#FFFFFE] rounded-[60px] flex items-center justify-center">
                <img src="/trash.svg" alt="del-icon" className="" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* basic user profile data */}
      <div className="flex flex-col gap-2">
        <div>
          <h2 className="text-[#001010] text-[14px] font-bold">Your Profile</h2>
          <p className="text-[#8A9191] text-[14px] font-medium">
            Choose how you want to be displayed as a Host or Guest
          </p>
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="" className="text-[12px] font-bold text-[#8A9191]">
            Name
          </label>
          <div className="flex gap-1">
            <div className="relative flex items-center w-1/2">
              <img
                src="/user.svg"
                alt=""
                className="rounded-full absolute ml-2"
              />
              <input
                type="text"
                placeholder="First name"
                value={form.firstName}
                onChange={(e) => handleChange("firstName", e.target.value)}
                className="pl-10 bg-[#FFFFFE80] border border-[#FFFFFE] rounded-l-[12px] py-3 text-[#8A9191] text-[14px] font-medium w-full"
              />
            </div>
            <input
              type="text"
              placeholder="Last name"
              value={form.lastName}
              onChange={(e) => handleChange("lastName", e.target.value)}
              className="py-2 px-2 bg-[#FFFFFE80] border border-[#FFFFFE] rounded-r-[12px] text-[14px] text-[#8A9191] font-medium w-1/2"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="" className="text-[12px] font-bold text-[#8A9191]">
            Email
          </label>
          <div className="flex relative items-center w-full bg-[#FFFFFE80] rounded-[12px] border border-[#FFFFFE] py-[10px]">
            <div className="ml-2 absolute bg-white p-1 rounded-[50px]">
              <img src="/sms.svg" alt="" className="rounded-full" />
            </div>
            <input
              type="email"
              placeholder="Enter your email address"
              value={form.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className="pl-10 w-full px-2 outline-none cursor-text text-left text-[#8A9191] font-medium text-[14px] satoshi"
            />
          </div>
        </div>

        {/* <div>
          <label htmlFor="" className="font-bold text-[12px] text-[#8A9191]">
            Location
          </label>
          <div className="flex gap-1 w-full">
            <div className="flex relative items-center w-1/2 bg-[#FFFFFE80] rounded-l-[12px] border border-[#FFFFFE] py-2">
              <img
                src="/location.svg"
                alt=""
                className="rounded-full absolute ml-2"
              />
              <input
                type="text"
                placeholder="Type in offline loaction"
                // value={form.location || ""}
                // onChange={(e) => handleChange("location", e.target.value)}
                className="pl-10 w-full px-2 outline-none cursor-text text-left text-[#8A9191] font-medium text-[14px] capitalize satoshi"
              />
            </div>

            <div className="w-1/2 relative">
              <PopUpInput
                value={stateLocation} // Display the selected state
                onClick={() => setIsOpen(!isOpen)}
                isOpen={isOpen}
                // leftIcon="/calendar.svg"
                rightIcon="/arrow-down-gray.svg"
                // showLeftIcon={true}
                showRightIcon={true}
                rounded="rounded-r-[12px]"
                placeholder="State"
                className="w-1/2 bg-[#FFFFFE80] py-3 px-2 border border-[#FFFFFE] text-[#8A9191] text-[14px] font-medium h-full"
              />
              {isOpen && (
                <ul className="absolute bg-white border rounded-[12px] shadow-lg top-10 -right-0 w-[50%] z-10 text-center  h-[164px] overflow-y-auto scrollbar-hide scroll-smooth">
                  {statesAndCapitals.map(({ state }) => (
                    <li
                      key={state}
                      className="flex items-center px-4 py-2 cursor-pointer hover:scale-105 transition-transform justify-center font-medium text-[14px] capitalize"
                      // onClick={() => handleStateLocationChange(state)}
                    >
                      <span
                        className={`cursor-pointer rounded-md flex justify-center transition text-[16px] satoshi ${
                          state === stateLocation
                            ? "text-black font-[600]"
                            : "text-[#8A9191] font-medium"
                        }`}
                        onClick={() => {
                          setStateLocation(state);
                          handleChange("state", state);
                          setIsOpen(false);
                        }}>
                        {state}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div> */}
      </div>

      {/* 3rd party accounts */}
      <div>
        <div>
          <h2 className="text-[#001010] text-[14px] font-bold">
            Third Party Account Syncing
          </h2>
          <p className="text-[#8A9191] text-[14px] font-medium">
            Link your accounts to meetro for convenience
          </p>
        </div>

        <div className="flex justify-between items-center gap-4 bg-[#FFFFFE80] border border-[#FFFFFE] backdrop-blur-[4px] p-4 rounded-[12px] mt-4">
          <div className="flex gap-2 items-center">
            <img src="/icons/google.svg" alt="" />

            <div>
              <p className="text-[#001010] font-bold text-[14px]">
                Google Account
              </p>
              <p className="text-[#8A9191] font-medium text-[14px]">
                newman@gmail.com
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <img src="/tick-circle-green.svg" alt="" />
            <p className="text-[#61B42D]">Synced</p>
          </div>
        </div>
      </div>

      {/* account deletion confirmation */}
      {/* <div className="flex items-center justify-between gap-3">
        <div className="flex flex-col gap-2">
          <h2 className="text-[#001010] font-bold text-[14px]">
            Account Deletion
          </h2>
          <p className="text-[#8A9191] text-[14px] font-medium">
            If you no longer wish to use Meetro you can permanently delete your
            account
          </p>
        </div>

        <button className="bg-[#C7245A] text-[12px] font-bold text-[#FFFFFE] py-2 px-3 rounded-3xl text-nowrap">
          Delete Account
        </button>
      </div> */}
    </div>
  );
};

export default Account;
