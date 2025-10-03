import Avatar from "../Avatar";
import TextButton from "../Buttons/TextButtons";
import CloseIcon from "@/assets/icons/CloseIcon";
import ProfileIcon from "@/assets/icons/ProfileIcon";
import SettingsIcon from "@/assets/icons/SettingsIcon";
import SupportIcon from "@/assets/icons/SupportIcon";
import LogoutIcon from "@/assets/icons/LogoutIcon";
import { useDisableScroll } from "@/hooks/useDisableScroll";
import { useEffect, useState } from "react";
import { NavLink } from "react-router";

export default function ProfileModal({ open, setOpen }) {
  // IsMobile
  const [isMobile, setIsMobile] = useState(false);

  // Disable scroll hook
  useDisableScroll(open && isMobile);

  // Track mobile state on resize
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (!open) return null;
  return (
    <div className="satoshi w-full z-20 md:z-auto h-full md:h-auto bg-[#f0f0f0] fixed top-0 left-0 md:top-[calc(100%+13px)] md:left-auto md:right-0 md:absolute rounded-b-[24px] md:rounded-t-[24px] overflow-hidden shadow-[0_4px_24px_0_rgba(0,0,0,0.25)] md:min-w-[272px] flex flex-col md:p-1">
      {/* Top */}
      <div className="py-3 px-6 md:p-2 flex flex-col gap-4">
        <div className="flex justify-between items-start">
          <Avatar size="xl" />
          <button
            onClick={() => setOpen(false)}
            className="md:hidden cursor-pointer"
          >
            <CloseIcon className="md:hidden" />
          </button>
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="text-[18px] leading-[12px] paytone">Newman Ogbo</h3>
          <p className="text-sm font-medium text-[#8A9191]">
            newmanogbo@gmail.com
          </p>
        </div>
      </div>
      {/* Bottom */}
      <div className="bg-white flex-1 flex flex-col justify-between md:rounded-[20px] md:shadow-[0_4px_24px_0_rgba(0,0,0,0.10)] px-6 pt-3 pb-7 md:p-2">
        <div className="flex flex-col">
          <div className="flex flex-col gap-y-4">
            <div className="flex py-3 justify-center border rounded-[16px] border-[#F0F0F0]">
              <div className="text-center flex-1 flex flex-col">
                <span className="paytone text-[#001010] text-base">2</span>
                <span className="text-[12px] leading-[18px] font-bold text-[#8A9191]">
                  Hosted
                </span>
              </div>
              <div className="min-h-full w-[1px] bg-[#F0F0F0]"></div>
              <div className="text-center flex-1 flex flex-col">
                <span className="paytone text-[#001010] text-base">2</span>
                <span className="text-[12px] leading-[18px] font-bold text-[#8A9191]">
                  Attended
                </span>
              </div>
            </div>
            {/* Profile navigation */}
            <ul className="flex flex-col border-b border-b-[#E2E2E2]">
              <li>
                <NavLink
                  onClick={() => setOpen(false)}
                  to="/profile"
                  className={({ isActive }) =>
                    `flex items-center gap-x-1 px-1 py-3 md:py-2 rounded-[8px] transition-colors hover:bg-[#F0F0F0] ${
                      isActive ? "bg-[#F0F0F0]" : ""
                    }`
                  }
                >
                  <ProfileIcon className="md:size-4" />
                  <span className="text-sm font-bold md:font-medium md:text-[12px] leading-[18px]">
                    My Profile
                  </span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/settings"
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-x-1 px-1 py-3 md:py-2 rounded-[8px] transition-colors hover:bg-[#F0F0F0] ${
                      isActive ? "bg-[#F0F0F0]" : ""
                    }`
                  }
                >
                  <SettingsIcon className="md:size-4" />
                  <span className="text-sm font-bold md:font-medium md:text-[12px] leading-[18px]">
                    Settings
                  </span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/contact"
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-x-1 px-1 py-3 md:py-2 rounded-[8px] transition-colors hover:bg-[#F0F0F0] ${
                      isActive ? "bg-[#F0F0F0]" : ""
                    }`
                  }
                >
                  <SupportIcon className="md:size-4" />
                  <span className="text-sm font-bold md:font-medium md:text-[12px] leading-[18px]">
                    Contact us
                  </span>
                </NavLink>
              </li>
            </ul>
          </div>
          {/* Log out */}
          <button className="flex gap-x-1 cursor-pointer items-center px-1 py-3 md:py-2 rounded-[8px] transition-colors hover:bg-[#F0F0F0]">
            <LogoutIcon className="md:size-4" />
            <span className="text-sm text-[#DB2863] font-bold md:font-medium md:text-[12px] leading-[18px]">
              Sign Out
            </span>
          </button>
        </div>
        {/* Create event button */}
        <TextButton text="Create Event" className="w-full md:hidden" />
      </div>
    </div>
  );
}
