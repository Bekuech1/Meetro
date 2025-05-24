import React, { useState } from "react";
import InputModals from "../InputModals";
import TextOnlyInput from "./Popup components/TextOnlyInput"; // Custom Text Input Component
import PopUpInput from "./Popup components/PopUpInput";

const statesAndCapitals = [
  { state: "Abia", capital: "Umuahia" },
  { state: "Adamawa", capital: "Yola" },
  { state: "Akwa Ibom", capital: "Uyo" },
  { state: "Anambra", capital: "Awka" },
  { state: "Bauchi", capital: "Bauchi" },
  { state: "Bayelsa", capital: "Yenagoa" },
  { state: "Benue", capital: "Makurdi" },
  { state: "Borno", capital: "Maiduguri" },
  { state: "Cross River", capital: "Calabar" },
  { state: "Delta", capital: "Asaba" },
  { state: "Ebonyi", capital: "Abakaliki" },
  { state: "Edo", capital: "Benin City" },
  { state: "Ekiti", capital: "Ado-Ekiti" },
  { state: "Enugu", capital: "Enugu" },
  { state: "Gombe", capital: "Gombe" },
  { state: "Imo", capital: "Owerri" },
  { state: "Jigawa", capital: "Dutse" },
  { state: "Kaduna", capital: "Kaduna" },
  { state: "Kano", capital: "Kano" },
  { state: "Katsina", capital: "Katsina" },
  { state: "Kebbi", capital: "Birnin Kebbi" },
  { state: "Kogi", capital: "Lokoja" },
  { state: "Kwara", capital: "Ilorin" },
  { state: "Lagos", capital: "Ikeja" },
  { state: "Nasarawa", capital: "Lafia" },
  { state: "Niger", capital: "Minna" },
  { state: "Ogun", capital: "Abeokuta" },
  { state: "Ondo", capital: "Akure" },
  { state: "Osun", capital: "Osogbo" },
  { state: "Oyo", capital: "Ibadan" },
  { state: "Plateau", capital: "Jos" },
  { state: "Rivers", capital: "Port Harcourt" },
  { state: "Sokoto", capital: "Sokoto" },
  { state: "Taraba", capital: "Jalingo" },
  { state: "Yobe", capital: "Damaturu" },
  { state: "Zamfara", capital: "Gusau" },
  { state: "FCT, Abuja", capital: "Abuja" },
];

const Where = ({ isVisible, onClose, onSave }) => {
  const [offlineLocation, setOfflineLocation] = useState("");
  const [onlineLocation, setOnlineLocation] = useState("");
  const [stateLocation, setStateLocation] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleOfflineLocationChange = (value) => setOfflineLocation(value);
  const handleOnlineLocationChange = (value) => setOnlineLocation(value);
  const handleStateLocationChange = (state) => {
    setStateLocation(state);
    setIsOpen(false);
  };

  const handleSave = () => {
    if (onSave) {
      console.log("Save Result:", {
        offlineLocation,
        onlineLocation,
        stateLocation,
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
    >
      {[
        // Offline Event Input
        <div className="flex gap-[2px] items-end w-full" key="1">
          <TextOnlyInput
            value={offlineLocation}
            onChange={handleOfflineLocationChange}
            label="Offline Location"
            placeholder="Type in offline location"
            leftIcon="location.svg"
            showRightIcon={false}
          />
            <PopUpInput
              value={stateLocation} // Display the selected state
              onClick={() => setIsOpen(!isOpen)}
              isOpen={isOpen}
              leftIcon="calendar.svg"
              rightIcon="arrow-down-gray.svg"
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
            value={onlineLocation}
            onChange={handleOnlineLocationChange}
            label="Online Location"
            placeholder="virtual event link like Zoom, Google Meet, etc."
            leftIcon="video.svg"
            showRightIcon={false}
            rounded="rounded-[12px]"
          />
        </div>,
      ]}
    </InputModals>
  );
};

export default Where;
