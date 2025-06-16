import React, { useState } from "react";
import InputModals from "../InputModals";
import TextOnlyInput from "./Popup components/TextOnlyInput"; // Custom Text Input Component
import PopUpInput from "./Popup components/PopUpInput";
import { statesAndCapitals } from "@/constants/StateAndCapital";


const Where = ({ isVisible, onClose, onSave }) => {
  const [location, setLocation] = useState("");
  const [stateLocation, setStateLocation] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0); // Track the active tab

  const handleTabChange = (tabIndex) => {
    setActiveTab(tabIndex);
  };

  const setEventType = (activeTab) => {
    return activeTab === 1 ? "online" : "offline";
  };

  const handleLocationChange = (value) => setLocation(value);
  const handleStateLocationChange = (state) => {
    setStateLocation(state);
    setIsOpen(false);
  };

  const handleSave = () => {
    if (onSave) {
      onSave({
        venue: location,
        state: stateLocation,
        locationType: setEventType(activeTab),
      });
    }
    onClose();
  };

  return (
    <InputModals
      isVisible={isVisible}
      onClose={onClose}
      title="Where is your event?"
      onSave={handleSave}
      hidden3="hidden"
      text1="offline"
      text2="online"
      activeTab={0}
      onTabChange={handleTabChange}
    >
      {[
        // Offline Event Input
        <div className="flex gap-[2px] items-end w-full" key="1">
          <TextOnlyInput
            value={location}
            onChange={handleLocationChange}
            label="Offline Location"
            placeholder="Type in offline location"
            leftIcon="location.svg"
            showRightIcon={false}
          />
          <PopUpInput
            value={stateLocation} // Display the selected state
            onClick={() => setIsOpen(!isOpen)}
            isOpen={isOpen}
            leftIcon="/calendar.svg"
            rightIcon="/arrow-down-gray.svg"
            showLeftIcon={true}
            showRightIcon={true}
            rounded="rounded-r-[12px]"
            placeholder="State"
          />
          {isOpen && (
            <ul className="absolute bg-white border rounded-[12px] shadow-lg top-44 -right-0 w-[40%] z-10 text-center  h-[164px] overflow-y-auto scrollbar-hide scroll-smooth">
              {statesAndCapitals.map(({ state }) => (
                <li
                  key={state}
                  className="flex items-center px-4 py-2 cursor-pointer hover:scale-105 transition-transform justify-center font-medium text-[14px] capitalize"
                  onClick={() => handleStateLocationChange(state)}
                >
                  <span
                    className={`cursor-pointer rounded-md flex justify-center transition text-[16px] satoshi ${
                      state === stateLocation
                        ? "text-black font-[600]"
                        : "text-[#8A9191] font-medium"
                    }`}
                  >
                    {state}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>,

        // Online Event Input
        <div key="2" className="grid gap-4">
          <TextOnlyInput
            value={location}
            onChange={handleLocationChange}
            label="Online Location"
            placeholder="virtual event link like Zoom, Google Meet, etc."
            leftIcon="/video.svg"
            showRightIcon={false}
            rounded="rounded-[12px]"
          />
        </div>,
      ]}
    </InputModals>
  );
};

export default Where;
