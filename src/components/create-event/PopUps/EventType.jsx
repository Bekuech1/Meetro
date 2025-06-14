import React from "react";
import InputModals from "../InputModals";
import { useState } from "react";

const EventTypeBtn = ({ title, onclick, className }) => {
  return (
    <button className={`mr-2 mb-2 ${className}`} onClick={onclick}>
      {title}
    </button>
  );
};

const EventType = ({ isVisible, onClose, onSave }) => {
  const [selectedButton, setSelectedButton] = useState([]);

  const buttons = [
    {
      title: "Nightlife & Parties",
      className: `text-[#011F0F] border-[#011F0F]`,
    },
    {
      title: "Music & Concerts",
      className: `text-[#4A3A74] border-[#4A3A74]`,
    },
    {
      title: "Art & Exhibitions",
      className: `text-[#CF7E00] border-[#cf7e00]`,
    },
    {
      title: "Festivals & Cultural Events",
      className: `text-[#496A1B] border-[#496a1b]`,
    },
    {
      title: "Sports & Fitness",
      className: `text-[#5856D6] border-[#5856d6]`,
    },
    {
      title: "Food & Drink Events",
      className: `text-[#9B1C46] border-[#9b1c46]`,
    },
    {
      title: "Tech & Innovation",
      className: `text-[#001010] border-[#001010]`,
    },
    {
      title: "Community Meetups",
      className: `text-[#0A84FF] border-[#0a84ff]`,
    },
    {
      title: "Networking & Conferences",
      className: `text-[#077D8A] border-[#077d8a]`,
    },
    {
      title: "Outdoor & Adventure",
      className: `text-[#B25000] border-[#b25000]`,
    },
    {
      title: "Gaming & Esports",
      className: `text-[#269E44] border-[#269e44]`,
    },
    {
      title: "Charity & Fundraisers",
      className: `text-[#8125AF] border-[#8125af]`,
    },
  ];

  function handleSelectedButtons(title) {
    setSelectedButton((prev) =>
      prev.includes(title)
        ? prev.filter((btn) => btn !== title)
        : [...prev, title]
    );
  }

  // Function to get selected buttons with their data
  const getSelectedButtonsData = () => {
    return selectedButton.map((title) => {
      const buttonData = buttons.find((btn) => btn.title === title);
      return {
        title: title,
        className: buttonData?.className || "",
      };
    });
  };

  const handleSave = () => {
    if (onSave) {
      const selectedEventType = getSelectedButtonsData();
      console.log("Selected events:", selectedEventType);
      onSave({
        data: selectedEventType,
      });
    }
    onClose();
  };

  return (
    <InputModals
      isVisible={isVisible}
      onClose={onClose}
      title="event type"
      hidden="hidden"
      onSave={handleSave}
    >
      <div className="grid gap-4">
        <p className="text-[#8A9191] satoshi font-medium text-sm">
          Pick a vibe! Music, Tech, Networking, Food, Sports—you name it.
        </p>
        {/* Display selected buttons */}
        <div className="">
          {selectedButton.map((selected, index) => {
            return (
              <EventTypeBtn
                key={index}
                title={selected}
                className="bg-[#011F0F] text-[#AEFC40] border border-[#011F0F] text-[10px] font-medium satoshi w-fit h-fit px-2 py-1 rounded-2xl"
                onclick={() => handleSelectedButtons(selected)}
              />
            );
          })}

          {/* Button grid */}
          {buttons
            .filter((btn) => !selectedButton.includes(btn.title))
            .map((btn, index) => (
              <EventTypeBtn
                key={index}
                title={btn.title}
                onclick={() => handleSelectedButtons(btn.title)}
                className={`text-[10px] font-medium satoshi w-fit h-fit px-2 py-1 rounded-2xl border ${btn.className}`}
              />
            ))}
        </div>
      </div>
      <div></div>
    </InputModals>
  );
};

export default EventType;
