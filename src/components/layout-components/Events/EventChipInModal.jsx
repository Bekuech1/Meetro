
import TagButton from "../Buttons/TagButton";
import TextButton from "../Buttons/TextButtons";
import FormGroup from "../Inputs/FormGroup";
import InputField from "../Inputs/InputField";
import ListInput from "../Inputs/ListInput";
import SelectInput from "../Inputs/SelectInput";
import Modal from "../Modal/Modal";
import React, { useEffect, useState } from "react";
import { useModalContext } from "../Modal/ModalContext";
import { paymentApi } from "@/services/paymentApi";
import { useMutation } from "@tanstack/react-query";
import { ArrowRight2, CloseCircle, MoneyAdd, TickCircle } from "iconsax-reactjs";
import { twMerge } from "tailwind-merge";
import { banks } from "@/utils/banks";
import LoadingSpinner from "../LoadingSpinner";

// Add ids to banks
const banksWithIds = banks.map((bank, index) => ({
  ...bank,
  id: index + 1,
}));

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
    },
  };

  // Reset data when chipInData changes
  useEffect(() => {
    if(chipInData){
      setNewChipInData(initialData);
      setNewBankDetails(initialData.bankDetails);
    }
  }, [chipInData])

  // Verify bank details
  const {mutate: verifyBank, isPending: isLoading, error, reset} = useMutation({
    mutationFn: () => paymentApi.verifyBank(newBankDetails.bankCode, newBankDetails.accountNumber),
    onSuccess: (data) => {
      if(data.status === "success"){
        const accountName = data.data.accountName;
             setNewBankDetails(prev => ({
        ...prev,
          accountName,
        
      }));
      }
 
    },
  });

  // New chip in data state
  const [newChipInData, setNewChipInData] = useState(initialData);

  // New bank details
  const [newBankDetails, setNewBankDetails] = useState({
    accountName: initialData.bankDetails.accountName,
    accountNumber: initialData.bankDetails.accountNumber,
    bankName: initialData.bankDetails.bankName,
    bankCode: initialData.bankDetails.bankCode,
  });

  // UI state for bank details screen
  const [showBankDetails, setShowBankDetails] = useState(false);

  // Validation state
  const [validation, setValidation] = useState({
    chipInType: "",
    amount: "",
    bankDetails: "",
  });

  // Bank validation state
  const [bankValidation, setBankValidation] = useState({
    accountNumber: "",
    bankName: "",
  })
 

  // Validate chip in data
  const validateChipInData = () => {
    const errors = {};
    if (!newChipInData.chipInType) {
      errors.chipInType = "Chip in type is required";
    }
    if (!newChipInData.amount) {
      errors.amount = "Amount is required";
    }
    if (!newChipInData.bankDetails.accountName  || !newChipInData.bankDetails.accountNumber || !newChipInData.bankDetails.bankName || !newChipInData.bankDetails.bankCode) {
      errors.bankDetails = "Bank details are required";
    }
    setValidation(errors);
    return Object.keys(errors).length === 0;
  };  

  // Validate bank details
  const validateBankDetails = () => {
    const errors = {};
    if (!newBankDetails.accountNumber) {
      errors.accountNumber = "Account number is required";
    }
    if (!newBankDetails.bankName) {
      errors.bankName = "Bank name is required";
    }
    if (!newBankDetails.accountName) {
      errors.accountName = "Account name is required";
    }
    setBankValidation(errors);
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

    resetBankDetails();
  }

  // Handle reset bank details
  const resetBankDetails = () => {
    setNewBankDetails(initialData.bankDetails)
    setBankValidation({
      accountNumber: "",
      bankName: "",
    })
    reset();
    setShowBankDetails(false);
  }


  // Handle save
  const handleSaveChipIn = () => {
    if (validateChipInData()) {
      onSave(newChipInData);
      close();  
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

  // Handle save bank
  const handleSaveBank = () => {
    if (validateBankDetails()) {
      setNewChipInData(prev => ({
        ...prev,
        bankDetails: newBankDetails,
      }));
      setValidation(prev => ({
        ...prev,
        bankDetails: "",
      }));
      setShowBankDetails(false);  
    }
  };

  // Handle verify bank
  const handleVerifyBank = () => {
    // Clear previous bank name
    setNewBankDetails(prev => ({
      ...prev,
      accountName: "",
    }));
    // Verify bank details
    verifyBank(newBankDetails.bankCode, newBankDetails.accountNumber);
  }


  return (
    <Modal.Window name="event-chip-in" title={!showBankDetails ? "Chip In" : "Add Bank"} onClose={resetData}>
      {/* Content goes here */}
      <div className="satoshi font-bold text-sm text-[#010E1F]">
        {!showBankDetails ? (
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
            <div onClick={() => setShowBankDetails(true)}>
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
            </div>
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
        ) : (
          <div className="flex flex-col gap-y-12">
            <div>
            <div className="flex flex-col gap-4">
              {/* Account Number */}
              <FormGroup label="Account Number" message={bankValidation.accountNumber ? {
                text: bankValidation.accountNumber,
                type: "error"
              } : null}>
                <InputField
                  type="text"
                  inputMode="numeric"
                  placeholder="Enter 10-digit account number"
                  value={newBankDetails.accountNumber}
                  onChange={e => {
                    const val = e.target.value.replace(/\D/g, "").slice(0, 10);
                    setNewBankDetails(prev => ({
                      ...prev,
                      accountNumber: val,
                    }));
                    // Verify bank details
                    if(val.length === 10 && newBankDetails.bankCode) handleVerifyBank();
                  }}
                />
              </FormGroup>
              {/* Bank Select */}
              <FormGroup label="Bank" message={bankValidation.bankName ? {
                text: bankValidation.bankName,
                type: "error"
              } : null}>
                <SelectInput
                  value={newBankDetails.bankName}
                  setValue={name => {
                    const selected = banks.find(b => b.name === name);
                    if (selected) {
                      // Set bank details
                      setNewBankDetails(prev => ({
                        ...prev,
                          bankName: selected.name,
                          bankCode: selected.code,
                        }));
                      // Verify bank details
                      if(newBankDetails.accountNumber.length === 10) handleVerifyBank();
                    }
                  }}
                  options={banksWithIds}
                  placeholder="Choose Bank"
                />
              </FormGroup>
            </div>
                        {/* Account name */}
              <div className="text-sm font-medium">
                {isLoading ? <div className="flex items-center justify-between mt-4">
                  <p className="text-[#8A9191]">Verifying</p>
                  <LoadingSpinner borderColor="border-[#7A60BF]" />
                </div> : newBankDetails.accountName ? <div className="flex items-center justify-between mt-4">
                  <p className="text-[#001010] capitalize">{newBankDetails.accountName}</p>
                  <TickCircle variant="Bold" color="#61B42D" size={16} />
                </div> : error ? <div className="flex items-center justify-between mt-4">
                  <p className="text-[#001010]">Account not found</p>
                  <CloseCircle variant="Bold" color="#DB2863" size={16} />
                </div> : null}
              </div>
              </div>
            <div className="flex items-center justify-center md:justify-start gap-x-4">
              <TextButton
                text="Back"
                variant="tertiary"
                onClick={resetBankDetails}
              />
              <TextButton
                text="Done"
                onClick={handleSaveBank}
              />
            </div>
          </div>
        )}
      </div>
    </Modal.Window>
  );
}

export default EventChipInModal;
