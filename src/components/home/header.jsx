import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SiteBtn from "../Layout-conponents/SiteBtn";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const dropdownItems = [
    {
      text: "my profile",
      image: "user.svg",
      className: "",
      onClick: () => navigate("/home"),
    },
    {
      text: "settings",
      image: "support.svg",
      className: "",
      onClick: () => navigate("/profile"),
    },
    {
      text: "contact us",
      image: "header-contact.svg",
      className: "border-b border-gray-300",
      onClick: () => navigate("/settings"),
    },
    {
      text: "Logout",
      image: "logout.svg",
      className: "text-[#DB2863]",
      onClick: () => console.log("Logout clicked"),
    },
  ];

  return (
    <header className="flex px-8 py-3 justify-between bg-[#011F0F] items-center z-20 sticky top-0 shadow-md w-full">
      {/* Logo and My Events */}
      <section className="flex items-center gap-6">
        <img src="Logo.svg" alt="Logo" />
        <div className="flex gap-1 py-1 px-2 h-fit w-fit">
          <img src="ticket-star.svg" alt="My Events Icon" />
          <h6 className="satoshi text-[12px] font-[500] leading-[18px] text-white capitalize my-auto">
            My Events
          </h6>
        </div>
      </section>

      {/* Location Section */}
      {/* <section className="w-[251px] h-8 flex items-center gap-2 pr-2 pl-1 bg-[#344C3F] rounded-full">
        <div className="w-fit h-fit rounded-full p-1 bg-[#55695E]">
          <img src="location-home.svg" alt="Location" />
        </div>
        <div className="satoshi text-[14px] font-[500] leading-[20px] text-white uppercase w-full">
          FCT
        </div>
        <img src="arrow-down.svg" alt="Arrow Down" />
      </section> */}

      {/* Actions Section */}
      <section className="flex items-center gap-4">
        {/* Notification */}
        <button className="h-fit w-fit p-1 rounded-[24px] bg-[#344C3F]">
          <img src="notification-bing.svg" alt="Notification" />
        </button>

        {/* User Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={toggleDropdown}
            className={`h-fit w-fit p-1 rounded-[24px] flex items-center gap-2 transition-all duration-300 ease-in-out ${
              isOpen ? "bg-[#496A1B]" : "bg-[#344C3F]"
            }`}
          >
            <div className="rounded-full w-6 h-6 flex items-center justify-center bg-[#077D8A] text-white uppercase satoshi text-[10px] font-[700] leading-[18px]">
              NO
            </div>
            <img src="arrow-down.svg" alt="Arrow Down" className={`w-3 h-3 transition-all duration-300 ease-in-out ${isOpen ? 'rotate-180' : ''}`} />
          </button>

          {isOpen && (
            <ul className="absolute right-0 mt-3 pb-2 px-4 bg-white rounded-[16px] shadow-lg w-[264px] transform transition-transform duration-300 ease-in-out satoshi z-20">
              {/* User Info */}
              <li className="py-4 grid items-center gap-4 ">
                <div className="bg-[#077D8A] text-white flex items-center justify-center h-12 w-12 rounded-full uppercase satoshi text-[16px] font-[500]">
                  NO
                </div>
                <div>
                  <h4 className="satoshi text-[12px] font-[500] leading-[18px] capitalize">
                    Newman Ogbo
                  </h4>
                  <div className="flex gap-2 text-[12px]">
                    <span>
                      2 <span className="text-[#8A9191]">Hosted</span>
                    </span>
                    <span>
                      2 <span className="text-[#8A9191]">Attended</span>
                    </span>
                  </div>
                </div>
              </li>
              {/* Dropdown Items */}
              {dropdownItems.map((item, index) => (
                <li
                  key={index}
                  className={`cursor-pointer flex w-full gap-1 py-2 capitalize satoshi text-[12px] font-[500] leading-[18px] items-center ${ item.className }`}
                  onClick={item.onClick}
                >
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
        </div>

        {/* Create Event Button */}
        <SiteBtn
          name="Create Event"
          colorPadding="bg-[#AEFC40] py-[6px] px-[10px]"
          onclick={() => navigate("/create-event")}
        />
      </section>
    </header>
  );
};

export default Header;
