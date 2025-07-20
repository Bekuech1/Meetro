import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SiteBtn from "../Layout-conponents/SiteBtn";
import { useAuthStore } from "@/stores/useAuthStore";
import useEventStore from "@/stores/eventStore";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const dropdownRef = useRef(null);
  const notificationRef = useRef(null);
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const toggleDropdown = () => setIsOpen((prev) => !prev);
  const toggleNotification = () => setIsNotificationOpen((prev) => !prev);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
    if (
      notificationRef.current &&
      !notificationRef.current.contains(event.target)
    ) {
      setIsNotificationOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const dropdownItems = [
    {
      text: "my profile",
      image: "/user.svg",
      className: "",
      onClick: () => navigate("/profile"),
    },
    {
      text: "settings",
      image: "/support.svg",
      className: "border-b border-gray-300",
      onClick: () => navigate("/settings"),
    },
    // {
    //   text: "contact us",
    //   image: "/header-contact.svg",
    //   className: "border-b border-gray-300",
    //   onClick: () => navigate("/home"),
    // },
    {
      text: "sign out",
      image: "/logout.svg",
      className: "text-[#DB2863]",
      onClick: () => {
        logout();
        // localStorage.clear();
        // useAuthStore.getState().setUser(null);
        // useAuthStore.getState().setAccessToken(null);
        // useAuthStore.getState().setRefreshToken(null);
        // useAuthStore.getState().setIdToken(null);
        // // useEventStore.getState().resetStore();
        navigate("/");
      },
    },
  ];

  const totalEvents = useEventStore((state) => state.totalEvents);
  const totalAttendees = useEventStore((state) => state.totalAttendees);

  return (
    <header className="flex sm:px-8 sm:py-3 p-4 justify-between bg-[#011F0F] items-center z-20 sticky top-0 shadow-md w-full">
      {/* Logo and My Events */}
      <section className="flex items-center sm:gap-6 gap-2">
        <button onClick={() => navigate("/home")}>
          <img
            src="/Logo.svg"
            alt="Logo"
            className="sm:w-[30px] sm:h-8 w-5 h-4"
          />
        </button>

        <div className="flex gap-1 py-1 px-2 h-fit w-fit">
          <img src="/ticket-star.svg" alt="My Events Icon" />
          <h6 className="satoshi text-[12px] font-[500] leading-[18px] text-white capitalize my-auto">
            My Events
          </h6>
        </div>
      </section>

      {/* Actions Section */}
      <section className="flex items-center gap-4">
        {/* Notification */}
        <div ref={notificationRef}>
          <button
            onClick={toggleNotification}
            className={` h-fit w-fit p-1 rounded-[24px] bg-[#344C3F] ${
              isNotificationOpen ? "bg-[#496A1B]" : ""
            }`}>
            <img
              src="/notification-bing.svg"
              alt="Notification"
              className="sm:w-6 sm:h-6 size-[22px]"
            />
          </button>

          {isNotificationOpen && (
            <div className="absolute top-full right-2 mt-2 pb-2 bg-white rounded-[16px] shadow-lg w-[391px] h-[815px] transform transition-transform duration-300 ease-in-out satoshi z-20 sm:block hidden overflow-clip">
              <div className="flex items-center h-12 px-2 justify-between bg-[#f4f4f4]">
                <h4 className="satoshi text-[14px] font-bold leading-[18px] capitalize">
                  Notifications
                </h4>

                <img
                  onClick={toggleNotification}
                  className="cursor-pointer"
                  src="/close-circle.svg"
                  alt="close-icon"
                />
              </div>

              <div className="h-full w-full">
                {/* <div className="h-full flex flex-col items-center justify-center gap-2">
                  <p className="satoshi text-[18px] font-bold leading-[18px] capitalize text-[#001010]">
                    No Notifications
                  </p>
                  <p className="satoshi text-[16px] font-[500] leading-[18px] capitalize text-[#8A9191]">
                    Create an event first and come back to check{" "}
                  </p>
                </div> */}

                {/* would be checking for notification items here later  */}
                <div className="h-full w-full">
                  {/* <div className="w-full h-full "> */}
                  <div className="flex gap-2 p-2 border-b-2 border-[#F0F0F0]">
                    <img
                      src="/events-img.png"
                      alt=""
                      className="w-[41.8px] h-[38px] rounded-xl"
                    />

                    <div className="flex flex-col gap-2">
                      <div>
                        <p className="satoshi text-[14px] font-medium leading-[18px] capitalize text-[#001010]">
                          Newman invited you to an event
                        </p>
                        <p className="satoshi text-[12px] font-medium leading-[18px] capitalize text-[#8A9191]">
                          Wanna join the fun? Check out the details and let them
                          know if you're in.
                        </p>
                      </div>

                      <p className="satoshi text-[12px] font-medium leading-[18px] capitalize text-[#8A9191]">
                        2h ago
                      </p>
                    </div>
                  </div>
                  {/* </div> */}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* User Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={toggleDropdown}
            className={`h-fit w-fit p-1 rounded-[24px] flex items-center gap-2 transition-all duration-300 ease-in-out ${
              isOpen ? "bg-[#496A1B]" : "bg-[#344C3F]"
            }`}>
            <div className="rounded-full sm:w-6 sm:h-6 size-[22px] flex items-center justify-center bg-[#077D8A] text-white uppercase satoshi text-[8px] sm:text-[10px] font-[700] leading-[18px]">
              {user?.firstName?.charAt(0)}
              {user?.lastName?.charAt(0)}
            </div>
            <img
              src="/arrow-down.svg"
              alt="Arrow Down"
              className={`w-3 h-3 transition-all duration-300 ease-in-out ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Desktop Dropdown */}
          {isOpen && (
            <ul className="absolute right-0 mt-3 pb-2 px-4 bg-white rounded-[16px] shadow-lg w-[264px] satoshi z-20 hidden sm:block">
              {/* User Info */}
              <li className="py-4 grid items-center gap-4">
                <div className="bg-[#077D8A] text-white flex items-center justify-center h-12 w-12 rounded-full uppercase satoshi text-[16px] font-[500]">
                  {user?.firstName?.charAt(0)}
                  {user?.lastName?.charAt(0)}
                </div>
                <div>
                  <h4 className="satoshi text-[12px] font-[500] leading-[18px] capitalize">
                    {user?.firstName} {user?.lastName}
                  </h4>
                  <div className="flex gap-2 text-[12px] satoshi font-[500]">
                    <span>
                      {totalEvents}{" "}
                      <span className="text-[#8A9191] text-[10px]">Hosted</span>
                    </span>
                    <span>
                      {totalAttendees}{" "}
                      <span className="text-[#8A9191]">Attended</span>
                    </span>
                  </div>
                </div>
              </li>
              {/* Dropdown Items */}
              {dropdownItems.map((item, index) => (
                <li
                  key={index}
                  className={`cursor-pointer flex w-full gap-1 py-2 capitalize satoshi text-[12px] font-[500] leading-[18px] items-center ${item.className}`}
                  onClick={item.onClick}>
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.text}
                      className="my-auto w-4 h-4"
                    />
                  )}
                  {item.text}
                </li>
              ))}
            </ul>
          )}

          {/* Mobile Dropdown */}
          {isOpen && (
            <div className="fixed inset-0 h-screen flex items-center justify-center z-30 bg-[#00000080]/50 backdrop-blur-[4px] sm:hidden">
              <ul className="ml-auto pb-2 px-4 bg-white rounded-l-[16px] shadow-lg w-[264px] satoshi z-20 h-screen">
                {/* User Info */}
                <li className="py-4 flex justify-between gap-4 items-start">
                  <div className="grid items-center gap-4">
                    <div className="bg-[#077D8A] text-white flex items-center justify-center h-12 w-12 rounded-full uppercase satoshi text-[16px] font-[500]">
                      {user?.firstName?.charAt(0)}
                      {user?.lastName?.charAt(0)}
                    </div>
                    <div>
                      <h4 className="satoshi text-[12px] font-[500] leading-[18px] capitalize">
                        {user?.firstName} {user?.lastName}
                      </h4>
                      <div className="flex gap-2 text-[12px] satoshi font-[500]">
                        <span>
                          {totalEvents}{" "}
                          <span className="text-[#8A9191] text-[10px]">
                            Hosted
                          </span>
                        </span>
                        <span>
                          {totalAttendees}{" "}
                          <span className="text-[#8A9191]">Attended</span>
                        </span>
                      </div>
                    </div>
                  </div>
                  <img
                    src="/close-circle.svg"
                    alt="Close Dropdown"
                    className="cursor-pointer"
                    onClick={toggleDropdown}
                  />
                </li>
                {/* Dropdown Items */}
                {dropdownItems.map((item, index) => (
                  <li
                    key={index}
                    className={`cursor-pointer py-2 flex w-full gap-1 capitalize satoshi text-[12px] font-[500] leading-[18px] items-center ${item.className}`}
                    onClick={item.onClick}>
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.text}
                        className="my-auto w-4 h-4"
                      />
                    )}
                    {item.text}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Create Event Button */}
        <SiteBtn
          name="Create Event"
          colorPadding="bg-[#AEFC40] py-[9px] px-[10px]"
          onclick={() => navigate("/create-event")}
        />
      </section>
    </header>
  );
};

export default Header;
