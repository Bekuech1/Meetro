import TagButton from "../Buttons/TagButton";
import TextButton from "../Buttons/TextButtons";
import ListInput from "../Inputs/ListInput";
import Modal from "../Modal/Modal";
import { ArrowRight2, MoneyAdd } from "iconsax-reactjs";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

function EventChipInModal({ chipInData, onSave }) {
  const [newChipInData, setNewChipInData] = useState({
    chipInType: chipInData?.chipInType || "fixed",
    fixedAmount: chipInData?.fixedAmount || null,
    targetAmount: chipInData?.targetAmount || null,
    minAmount: chipInData?.minAmount || null,
    bankDetails: {
      accountName: chipInData?.bankDetails?.accountName || "",
      accountNumber: chipInData?.bankDetails?.accountNumber || "",
      bankName: chipInData?.bankDetails?.bankName || "",
      bankCode: chipInData?.bankDetails?.bankCode || "",
      recipientCode: chipInData?.bankDetails?.recipientCode || "",
    },
  });

  return (
    <Modal.Window name="event-chip-in" title="Chip In">
      {/* Content goes here */}
      <div className="satoshi font-bold text-sm text-[#010E1F]">
        <div className="flex flex-col gap-y-12">
          <div className="flex flex-col gap-4">
            {/* Chip in type toggle */}
            <div className="border self-start border-[#F9F9F9] p-[2px] bg-[#E5E7E3] rounded-full inline-flex items-center">
              <TagButton
                text="Fixed"
                className={twMerge(
                  "satoshi min-w-auto h-7.5 px-3 hover:bg-transparent bg-transparent text-[#B0B5B5] border-transparent",
                  newChipInData.chipInType === "fixed" &&
                    "bg-white text-[#011F0F] hover:bg-white"
                )}
                onClick={() =>
                  setNewChipInData(prev => ({ ...prev, chipInType: "fixed" }))
                }
              />
              <TagButton
                text="Target Goal"
                className={twMerge(
                  "satoshi min-w-auto h-7.5 px-3 bg-transparent hover:bg-transparent text-[#B0B5B5] border-transparent",
                  newChipInData.chipInType === "target" &&
                    "bg-white text-[#011F0F] hover:bg-white"
                )}
                onClick={() =>
                  setNewChipInData(prev => ({ ...prev, chipInType: "target" }))
                }
              />
              <TagButton
                text="As the spirit leads"
                className={twMerge(
                  "satoshi min-w-auto h-7.5 px-3 bg-transparent hover:bg-transparent text-[#B0B5B5] border-transparent",
                  newChipInData.chipInType === "donation" &&
                    "bg-white text-[#011F0F] hover:bg-white"
                )}
                onClick={() =>
                  setNewChipInData(prev => ({
                    ...prev,
                    chipInType: "donation",
                  }))
                }
              />
            </div>
            {/* Chip in type description */}
            <p className="text-sm font-medium text-[#8A9191]">
              {newChipInData.chipInType === "fixed" &&
                "You choose a fixed amount each guest must contribute to attend. It’s like a mini ticket, but more casual."}
              {newChipInData.chipInType === "target" &&
                "You set a total amount you want to raise, and everyone can chip in to help reach it. "}
              {newChipInData.chipInType === "flexible" &&
                "No pressure! Guests contribute whatever they feel like. "}
            </p>
            {/* Bank details input */}
            <ListInput
              title={
                newChipInData.bankDetails.bankName || "Add Bank Account Details"
              }
              placeholder="Add your payment details"
              content={newChipInData.bankDetails.accountNumber || ""}
              leftIcon={<MoneyAdd variant="Bold" />}
              rightIcon={<ArrowRight2 variant="Outline" />}
            />
          </div>
          <div className="flex items-center justify-center md:justify-start gap-x-4">
            <TextButton text="Cancel" variant="tertiary" />
            <TextButton text="Save" />
          </div>
        </div>
      </div>
    </Modal.Window>
  );
}

export default EventChipInModal;
