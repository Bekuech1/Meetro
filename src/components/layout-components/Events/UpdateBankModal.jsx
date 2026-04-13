import { paymentApi } from "@/services/paymentApi";
import { banks } from "@/utils/banksData";
import { useMutation } from "@tanstack/react-query";
import { CloseCircle, TickCircle } from "iconsax-reactjs";
import { useEffect, useState } from "react";
import { useModalContext } from "../Modal/ModalContext";
import TextButton from "../Buttons/TextButtons";
import FormGroup from "../Inputs/FormGroup";
import InputField from "../Inputs/InputField";
import SelectInput from "../Inputs/SelectInput";
import LoadingSpinner from "../LoadingSpinner";
import Modal from "../Modal/Modal";

// Add ids to banks
const banksWithIds = banks.map((bank, index) => ({
  ...bank,
  id: index + 1,
}));

function UpdateBankModal({ bankDetails, onSave }) {
  // Modal context
  const { close } = useModalContext();
  // Initial data
  const initialData = {
    accountName: bankDetails?.accountName || "",
    accountNumber: bankDetails?.accountNumber || "",
    bankName: bankDetails?.bankName || "",
    bankCode: bankDetails?.bankCode || "",
  };

  // Reset data when bankDetails changes
  useEffect(() => {
    if (bankDetails) {
      setNewBankDetails(bankDetails);
    }
  }, [bankDetails]);

  // Verify bank details
  const {
    mutate: verifyBank,
    isPending: isLoading,
    error,
    reset,
  } = useMutation({
    mutationFn: () =>
      paymentApi.verifyBank(
        newBankDetails.bankCode,
        newBankDetails.accountNumber
      ),
    onSuccess: data => {
      if (data.status === "success") {
        const accountName = data.data.accountName;
        setNewBankDetails(prev => ({
          ...prev,
          accountName,
        }));
      }
    },
  });

  // New bank details
  const [newBankDetails, setNewBankDetails] = useState(initialData);

  // Bank validation state
  const [bankValidation, setBankValidation] = useState({
    accountNumber: "",
    bankName: "",
  });

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

  // Handle reset bank details
  const resetBankDetails = () => {
    setNewBankDetails(initialData);
    reset();
    setBankValidation({
      accountNumber: "",
      bankName: "",
    });
    close();
  };

  // Handle save bank
  const handleSaveBank = () => {
    if (validateBankDetails()) {
      onSave(newBankDetails);
      close();
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
  };

  return (
    <Modal.Window
      name="update-bank"
      title="Add Bank"
      onClose={resetBankDetails}
    >
      {/* Content goes here */}
      <div className="satoshi font-bold text-sm text-[#010E1F]">
        <div className="flex flex-col gap-y-12">
          <div>
            <div className="flex flex-col gap-4">
              {/* Account Number */}
              <FormGroup
                label="Account Number"
                message={
                  bankValidation.accountNumber
                    ? {
                        text: bankValidation.accountNumber,
                        type: "error",
                      }
                    : null
                }
              >
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
                    if (val.length === 10 && newBankDetails.bankCode)
                      handleVerifyBank();
                  }}
                />
              </FormGroup>
              {/* Bank Select */}
              <FormGroup
                label="Bank"
                message={
                  bankValidation.bankName
                    ? {
                        text: bankValidation.bankName,
                        type: "error",
                      }
                    : null
                }
              >
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
                      if (newBankDetails.accountNumber.length === 10)
                        handleVerifyBank();
                    }
                  }}
                  options={banksWithIds}
                  placeholder="Choose Bank"
                />
              </FormGroup>
            </div>
            {/* Account name */}
            <div className="text-sm font-medium">
              {isLoading ? (
                <div className="flex items-center justify-between mt-4">
                  <p className="text-[#8A9191]">Verifying</p>
                  <LoadingSpinner borderColor="border-[#7A60BF]" />
                </div>
              ) : newBankDetails.accountName ? (
                <div className="flex items-center justify-between mt-4">
                  <p className="text-[#001010] capitalize">
                    {newBankDetails.accountName}
                  </p>
                  <TickCircle variant="Bold" color="#61B42D" size={16} />
                </div>
              ) : error ? (
                <div className="flex items-center justify-between mt-4">
                  <p className="text-[#001010]">Account not found</p>
                  <CloseCircle variant="Bold" color="#DB2863" size={16} />
                </div>
              ) : null}
            </div>
          </div>
          <div className="flex items-center justify-center md:justify-start gap-x-4">
            <TextButton
              text="Cancel"
              variant="tertiary"
              onClick={resetBankDetails}
            />
            <TextButton text="Save" onClick={handleSaveBank} />
          </div>
        </div>
      </div>
    </Modal.Window>
  );
}

export default UpdateBankModal;
