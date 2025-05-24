import React from "react";
import InputModals from "../InputModals";
import { Divide } from "lucide-react";
import PopUpInput from "./Popup components/PopUpInput";
import TextOnlyInput from "./Popup components/TextOnlyInput";

const ChipIn = ({ isVisible, onClose, onSave }) => {
  const handleSave = () => {
    if (onSave) {
      onSave(hostName); // Pass the host name to the parent component
    }
    onClose(); // Close the modal after saving
  };

  return (
    <InputModals
      isVisible={isVisible}
      onClose={onClose}
      title="chip in"
      onSave={handleSave}
      text1="Fixed"
      text2="Target Goal"
      text3="As the Spirit leads"
    >
      {[
        <div key="1">
          <Content
            label="price"
            header="You choose a fixed amount each guest must contribute to attend. It’s like a mini ticket, but more casual."
          />
        </div>,
        <div key="2">
          <Content
            label="target goal"
            header="You set a total amount you want to raise, and everyone can chip in to help reach it. It’s like a group gift!"
          />
        </div>,
        <div key="3">
          <Content
            label="minimum amount"
            header="No pressure! Guests contribute whatever they feel like. It’s all about the spirit of giving."
          />
        </div>,
      ]}
    </InputModals>
  );
};

const Content = ({ label, header }) => {
  return (
    <div className="gap-4 grid w-full h-fit">
      <p className="text-[#8A9191] satoshi font-medium text-sm">{header}</p>
      <PopUpInput
        leftIcon="bank.svg"
        rounded="rounded-[12px]"
        placeholder="add bank account"
      />
      <TextOnlyInput
        leftIcon="naira.svg"
        showRightIcon={false}
        rounded="rounded-[12px]"
        placeholder="0.00"
        type="number"
        label={label}
      />
      <div className="grid text-center p-2 gap-2 rounded-[12px] border-[#D9D1F1] border bg-[#F3F0FB] text-[#7A60BF] satoshi items-center w-full cursor-pointer">
        <h5 className="text-base font-bold">✏️ Heads up, Creator!</h5>
        <p className="text-sm font-medium">
          You can only withdraw after the event to ensure refunding is possible
          if the event is canceled
        </p>
      </div>
    </div>
  );
};

export default ChipIn;
