import React, { useState } from "react";
import InputModals from "../InputModals";
import PopUpInput from "./Popup components/PopUpInput";
import CreateEventBtn from "@/components/Layout-conponents/CreateEventBtn";
import { banks, searchBanks } from "../../../utils/Banks"; // Import the banks data and search function

const ChipIn = ({ isVisible, onClose, onSave }) => {
  const [showBank, setShowBank] = useState(false);
  const [showBankList, setShowBankList] = useState(false);
  const [selectedBank, setSelectedBank] = useState("");
  const [selectedBankCode, setSelectedBankCode] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [activeTab, setActiveTab] = useState(0);
  const [accountNumber, setAccountNumber] = useState("");
  const [accountName, setAccountName] = useState("");
  const [amount, setAmount] = useState("0.00");

  // Function to set event type based on activeTab
  const setChipInType = (activeTab) => { 
    switch (activeTab) {
      case 0:
        return "FIXED";   
      case 1:
        return "TARGET GOAL";
      case 2:
        return "AS THE SPIRIT LEADS";
      default:
        return ""; // Default case
    }
  };

  // Handle tab change from InputModals
  const handleTabChange = (tabIndex) => {
    setActiveTab(tabIndex);
  };

  // Filter banks based on search input using the helper function
  const filteredBanks = searchBanks(searchInput);

  const handleBankSelect = (bank) => {
    setSelectedBank(bank.name);
    setSearchInput(bank.name);
    setSelectedBankCode(bank.code);
    setShowBankList(false);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);
    setSelectedBank("");
    setSelectedBankCode(""); // Clear bank code when searching
    setShowBankList(true);
  };

  const handleInputFocus = () => {
    setShowBankList(true);
  };

  // Handle saving bank details
  const handleSaveBankDetails = () => {
    if (selectedBank && accountNumber && accountName) {
      setShowBank(false);
      // You might want to show a success message or update the display
    } else {
      // Handle validation - show error message
      alert("Please fill in all bank details");
    }
  };

  const handleAmountChange = (e) => {
    let input = e.target.value.replace(/[^0-9]/g, ""); // Remove non-numeric characters
    if (input === "") {
      setAmount("0.00");
      return;
    }
    input = parseInt(input, 10); // Convert to number
    const formatted = (input / 100).toFixed(2); // Format as currency
    setAmount(formatted);
  };

  const handleSave = () => {
    if (onSave) {
      onSave({
        selectedBank,
        selectedBankCode,
        accountNumber,
        accountName,
        amount,
        chipInType: setChipInType(activeTab),
      });
    }
    onClose();
  };

  if (!isVisible) return null;

  if (showBank) {
    return (
      <div className="fixed inset-0 h-screen flex sm:items-center items-end justify-center z-30 bg-[#00000080]/50 backdrop-blur-[4px]">
        <div className="sm:w-[432px] w-full sm:h-fit h-[68vh] flex flex-col justify-center items-center relative rounded-4xl">
          <div className="bg-white px-6 py-3 text-left w-full h-fit rounded-t-4xl">
            <h1 className="satoshi font-[700] text-[20px] capitalize text-black">
              add bank details
            </h1>
          </div>
          <div className="w-full sm:h-fit h-full px-6 py-3 sm:rounded-b-4xl bg-gray-100">
            <div className="grid gap-4 h-fit mb-8 fix">
              {/* Account Number Input */}
              <div className="w-full h-fit satoshi grid gap-1 relative">
                <label className="text-[10px] font-bold text-[#8A9191] capitalize">
                  account number
                </label>
                <div className="w-full h-fit bg-[#FFFFFE]/50 flex pr-2 pl-4 py-3 rounded-[12px] border border-white cursor-pointer">
                  <input
                    type="text"
                    value={accountNumber}
                    maxLength={10}
                    onChange={(e) => {
                      const value = e.target.value;
                      // Allow only numeric input
                      if (/^\d*$/.test(value)) {
                        setAccountNumber(value);
                      }
                    }}
                    placeholder="Account Number"
                    className="w-full h-fit leading-tight text-sm font-medium satoshi capitalize text-black bg-transparent outline-none placeholder:text-[#8A9191]"
                  />
                </div>
              </div>

              {/* Account Name Input */}
              <div className="w-full h-fit satoshi grid gap-1 relative">
                <label className="text-[10px] font-bold text-[#8A9191] capitalize">
                  account name
                </label>
                <div className="w-full h-fit bg-[#FFFFFE]/50 flex pr-2 pl-4 py-3 rounded-[12px] border border-white cursor-pointer">
                  <input
                    type="text"
                    value={accountName}
                    onChange={(e) => setAccountName(e.target.value)}
                    placeholder="Account Name"
                    className="w-full h-fit leading-tight text-sm font-medium satoshi capitalize text-black bg-transparent outline-none placeholder:text-[#8A9191]"
                  />
                </div>
              </div>

              {/* Bank Selection */}
              <div className="w-full h-fit satoshi grid gap-1 relative">
                <label className="text-[10px] font-bold text-[#8A9191] capitalize">
                  bank name
                </label>
                <div
                  className="w-full h-fit bg-[#FFFFFE]/50 flex pr-2 pl-4 py-3 rounded-[12px] border border-white cursor-pointer"
                  onClick={() => setShowBankList((prev) => !prev)}
                >
                  <input
                    type="text"
                    value={searchInput}
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                    placeholder="select bank"
                    className="w-full h-fit leading-tight text-sm font-medium satoshi capitalize text-black bg-transparent outline-none placeholder:text-[#8A9191]"
                  />
                  <img src="arrow-down-gray.svg" alt="" />
                </div>
                {showBankList && (
                  <ul className="absolute bg-white border rounded-[12px] shadow-lg top-[68px] -right-0 w-full z-10 text-center max-h-[164px] h-fit py-1 overflow-y-auto scrollbar-hide scroll-smooth">
                    {filteredBanks.map((bank) => (
                      <li
                        key={bank.code}
                        className="flex items-center px-4 py-2 cursor-pointer hover:scale-105 transition-transform justify-between font-medium text-[14px]"
                        onClick={() => handleBankSelect(bank)}
                      >
                        <span
                          className={`cursor-pointer transition text-[14px] satoshi capitalize ${
                            bank.name === selectedBank
                              ? "text-black font-[600]"
                              : "text-[#8A9191] font-medium"
                          }`}
                        >
                          {bank.name}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            <div className="mb-4 w-full h-[1px] bg-[#E2E2E2] sm:block hidden"></div>
            <div className="flex justify-center sm:items-center gap-4 sm:h-fit h-full fix">
              <CreateEventBtn
                text="cancel"
                onClick={() => setShowBank(false)}
                textcolor="text-[#000000]"
                bgcolor="bg-[#FFFFFE]"
              />
              <CreateEventBtn
                text="save"
                onClick={handleSaveBankDetails}
                textcolor="text-[#AEFC40]"
                bgcolor="bg-[#011F0F]"
              />
            </div>
          </div>
        </div>
        <img
          src="closePopup.svg"
          alt="close popup"
          className="h-12 w-12 absolute md:-top-10 -top-14 md:left-[99%] left-[90%] cursor-pointer"
          onClick={onClose}
        />
      </div>
    );
  }

  return (
    <InputModals
      isVisible={isVisible}
      onClose={onClose}
      title="chip in"
      onSave={handleSave}
      text1="Fixed"
      text2="Target Goal"
      text3="As the Spirit leads"
      activeTab={activeTab}
      onTabChange={handleTabChange}
    >
      {[
        <div key="1">
          <Content
            label="price"
            header="You choose a fixed amount each guest must contribute to attend. It's like a mini ticket, but more casual."
            showBank={() => setShowBank(true)}
            bankName={selectedBank || "Select Bank"}
            accNo={accountNumber}
            onAmountChange={handleAmountChange}
            amountValue={amount}
          />
        </div>,
        <div key="2">
          <Content
            label="target goal"
            header="You set a total amount you want to raise, and everyone can chip in to help reach it. It's like a group gift!"
            showBank={() => setShowBank(true)}
            bankName={selectedBank || "Select Bank"}
            accNo={accountNumber}
            onAmountChange={handleAmountChange}
            amountValue={amount} // Use the same amountValue for simplicity
          />
        </div>,
        <div key="3">
          <Content
            label="minimum amount"
            header="No pressure! Guests contribute whatever they feel like. It's all about the spirit of giving."
            showBank={() => setShowBank(true)}
            bankName={selectedBank || "Select Bank"}
            accNo={accountNumber}
            onAmountChange={handleAmountChange}
            amountValue={amount}
          />
        </div>,
      ]}
    </InputModals>
  );
};

const Content = ({
  label,
  header,
  showBank,
  accNo,
  bankName,
  amountValue,
  onAmountChange,
}) => {
  return (
    <div className="gap-4 grid w-full h-fit">
      <p className="text-[#8A9191] satoshi font-medium text-sm">{header}</p>
      <PopUpInput
        leftIcon="bank.svg"
        rounded="rounded-[12px]"
        placeholder={bankName || "Select Bank"}
        rightIcon="arrow-right.svg"
        onClick={showBank}
        secondary={accNo}
      />
      <div className="w-full h-fit bg-[#FFFFFE]/50 flex p-2 items-center rounded-[12px] border border-white cursor-pointer">
        <span className="text-gray-500 size-fit mr-2">
          <div className="bg-white p-1 rounded-4xl size-fit">
            <img src="naira.svg" alt="Left Icon" className="size-4" />
          </div>
        </span>
        <input
          type="text"
          value={amountValue}
          onChange={onAmountChange}
          placeholder="0.00"
          className="w-full h-fit leading-tight text-sm font-medium satoshi capitalize bg-transparent outline-none placeholder:text-gray-500 text-black"
        />
      </div>

      <div className="grid text-center p-2 gap-2 rounded-[12px] border-[#D9D1F1] border bg-[#F3F0FB] text-[#7A60BF] satoshi items-center w-full cursor-pointer">
        <h5 className="text-base font-bold">✏️ Heads up, Creator!</h5>
        <p className="text-sm font-medium">
          You can only withdraw after the event to ensure refunding is possible
          if the event is cancelled.
        </p>
      </div>
    </div>
  );
};

export default ChipIn;