import { ArrowDown2, ArrowUp2, Map1, Notification } from "iconsax-reactjs";
import { useState } from "react";
import Avatar from "../Avatar";
import IconButton from "../Buttons/IconButton";
import Notifications from "./Notifications";
import ProfileModal from "./ProfileModal";

// Notification
const notifications = [
  {
    img: "/sample-notification.png",
    title: "Newman invited you to an event 🎟️",
    text: "Wanna join the fun? Check out the details and let them know if you're in.",
    createdAt: "2025-09-29T04:00:00Z",
    url: "/",
  },
  {
    img: "/sample-notification.png",
    title: "Newman invited you to an event 🎟️",
    text: "Wanna join the fun? Check out the details and let them know if you're in.",
    createdAt: "2025-09-29T04:00:00Z",
    url: "/",
  },
  {
    img: "/sample-notification.png",
    title: "Newman invited you to an event 🎟️",
    text: "Wanna join the fun? Check out the details and let them know if you're in.",
    createdAt: "2025-09-29T04:00:00Z",
    url: "/",
  },
  {
    img: "/sample-notification.png",
    title: "Newman invited you to an event 🎟️",
    text: "Wanna join the fun? Check out the details and let them know if you're in.",
    createdAt: "2025-09-29T04:00:00Z",
    url: "/",
  },
  {
    img: "/sample-notification.png",
    title: "Newman invited you to an event 🎟️",
    text: "Wanna join the fun? Check out the details and let them know if you're in.",
    createdAt: "2025-09-29T04:00:00Z",
    url: "/",
  },
];

export default function TopNavigation() {
  // Notifications state
  const [openNotifications, setOpenNotifications] = useState(false);

  // Profile modal state
  const [openProfile, setOpenProfile] = useState(false);
  return (
    <div className="max-w-[1400px] satoshi py-3 px-4 md:px-8 mx-auto w-full bg-[#F0F0F0] gap-4 flex-wrap flex flex-col min-[380px]:flex-row items-center justify-between">
      {/* Logo */}
      <div className="flex items-center gap-x-2">
        <img src="/meetroLogoAlt.svg" alt="Meetro logo" />
        <span className="bg-linear-to-r satoshi flex justify-center items-center from-[#BCFF5C] to-[#C0A8FF] text-[8px] font-[700] min-w-[26px] size-fit capitalize px-1 h-[14px] leading-[14px] rounded-2xl text-[#011F0F]">
          Beta
        </span>
      </div>
      {/* State select */}
      <div className="rounded-full hidden md:flex items-center max-h-11 justify-between bg-[#f8f8f7] border border-[#E5E7E3] py-[10px] min-w-[282px] px-[6px]">
        <div className="flex items-center">
          <IconButton
            variant="tertiary"
            icon={<Map1 variant="Bold" size={16} color="#001010" />}
            smallButton
          />
          <input
            placeholder="FCT"
            className="placeholder:font-medium border-0 outline-0 px-2 placeholder:text-[#B0B5B5]"
          />
        </div>
        <ArrowDown2 variant="Outline" size={16} color="#8A9191" />
      </div>
      {/* Nav menu */}
      <div className="flex items-center gap-4">
        <IconButton
          variant="tertiary"
          icon={<Map1 variant="Bold" size={24} color="#001010" />}
          className="md:hidden size-9!"
        />
        <div className="relative">
          <IconButton
            variant="tertiary"
            icon={<Notification variant="Bold" size={24} color="#001010" />}
            onClick={() => {
              setOpenNotifications(s => !s);
              setOpenProfile(false);
            }}
            className={`${openNotifications ? "bg-[#E5E7E3]!" : ""} size-9!`}
          />
          <Notifications
            open={openNotifications}
            setOpen={setOpenNotifications}
            notifications={notifications}
          />
        </div>
        <div className="relative">
          <IconButton
            variant="tertiary"
            onClick={() => {
              // Toggle profile menu
              setOpenProfile(s => !s);

              // Close notifications
              setOpenNotifications(false);
            }}
            className={`${openProfile ? "bg-[#E5E7E3]!" : ""} h-9! w-max! p-[6px]!`}
          >
            <div className="flex items-center gap-1">
              <Avatar size="xs" />
              {openProfile ? (
                <ArrowUp2 variant="Outline" size={12} color="#001010" />
              ) : (
                <ArrowDown2 variant="Outline" size={12} color="#001010" />
              )}
            </div>
          </IconButton>
          <ProfileModal open={openProfile} setOpen={setOpenProfile} />
        </div>
      </div>
    </div>
  );
}
