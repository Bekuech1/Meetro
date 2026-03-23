import TagButton from "../Buttons/TagButton";
import TextButton from "../Buttons/TextButtons";
import FormGroup from "../Inputs/FormGroup";
import InputField from "../Inputs/InputField";
import ListInput from "../Inputs/ListInput";
import Modal from "../Modal/Modal";
import { ArrowRight2, MoneyAdd } from "iconsax-reactjs";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { useModalContext } from "../Modal/ModalContext";

function EventChipInModal({ chipInData, onSave }) {
  // Modal context
  const {close} = useModalContext();
  // Initial data
  const initialData = {
    chipInType: chipInData?.chipInType || "fixed",
    amount: chipInData?.amount || "",
    bankDetails: {
      accountName: chipInData?.bankDetails?.accountName || "",
      accountNumber: chipInData?.bankDetails?.accountNumber || "",
      bankName: chipInData?.bankDetails?.bankName || "",
      bankCode: chipInData?.bankDetails?.bankCode || "",
      recipientCode: chipInData?.bankDetails?.recipientCode || "",
    },
  };


  // New chip in data state
  const [newChipInData, setNewChipInData] = useState(initialData);

  // Validation state
  const [validation, setValidation] = useState({
    chipInType: "",
    amount: "",
    bankDetails: "",
  });

  // Validate chip in data
  const validateChipInData = () => {
    const errors = {};
    if (!newChipInData.chipInType) {
      errors.chipInType = "Chip in type is required";
    }
    if (!newChipInData.amount) {
      errors.amount = "Amount is required";
    }
    if (!newChipInData.bankDetails.accountName  || !newChipInData.bankDetails.accountNumber || !newChipInData.bankDetails.bankName || !newChipInData.bankDetails.bankCode || !newChipInData.bankDetails.recipientCode) {
      errors.bankDetails = "Bank details are required";
    }
    setValidation(errors);
    return Object.keys(errors).length === 0;
  };  

  // Handle chip in type change
  const handleChipInTypeChange = chipInType => {
    setNewChipInData(prev => ({ ...prev, chipInType }));
    setValidation({
      chipInType: "",
      amount: "",
      bankDetails: "",
    });
  };

  // Handle reset data
  const resetData = () => {
    setNewChipInData(initialData);
    setValidation({
      chipInType: "",
      amount: "",
      bankDetails: "",
    });
  }

  // Handle save
  const handleSaveChipIn = () => {
    if (validateChipInData()) {
      onSave(newChipInData);
    }
  };

  // Handle amount change
  const handleAmountChange = e => {
    const value = e.target.value;
    if (!/^\d*\.?\d{0,2}$/.test(value)) return;
    setNewChipInData(prev => ({
      ...prev,
      amount: value,
    }));
  };

  return (
    <Modal.Window name="event-chip-in" title="Chip In" onClose={resetData}>
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
                  handleChipInTypeChange("fixed")
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
                  handleChipInTypeChange("target")
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
                  handleChipInTypeChange("donation")
                }
              />
            </div>
            {/* Chip in type description */}
            <p className="text-sm font-medium text-[#8A9191]">
              {newChipInData.chipInType === "fixed" &&
                "You choose a fixed amount each guest must contribute to attend. It’s like a mini ticket, but more casual."}
              {newChipInData.chipInType === "target" &&
                "You set a total amount you want to raise, and everyone can chip in to help reach it. "}
              {newChipInData.chipInType === "donation" &&
                "No pressure! Guests contribute whatever they feel like. "}
            </p>
            {/* Bank details input */}
            <ListInput
              title={
                newChipInData.bankDetails.bankName || "Add Bank Account Details"
              }
              error={validation.bankDetails}
              placeholder="Add your payment details"
              content={newChipInData.bankDetails.accountNumber || ""}
              leftIcon={<MoneyAdd variant="Bold" />}
              rightIcon={<ArrowRight2 variant="Outline" />}
            />
            {/* Chip in amount */}
            <FormGroup
            message={validation.amount ? {
              text: validation.amount,
              type: "error",
            }: null}
              label={
                newChipInData.chipInType === "fixed"
                  ? "Price"
                  : newChipInData.chipInType === "target"
                    ? "Target Goal"
                    : "Minimum Amount"
              }
            >
              <InputField
                type="text"
                placeholder="0.00"
                leftIcon={<span>₦</span>}
                inputMode="decimal" 
                value={newChipInData.amount}
                onChange={handleAmountChange}
              />
            </FormGroup>
          </div>
          <div className="flex items-center justify-center md:justify-start gap-x-4">
            <TextButton text="Cancel" variant="tertiary" onClick={() => {
              resetData();
              close();
            }} />
            <TextButton text="Save" onClick={handleSaveChipIn} />
          </div>
        </div>
      </div>
    </Modal.Window>
  );
}

export default EventChipInModal;
