import ToggleBalance from "./ToggleBalance";
import Tooltip from "../layout-components/Tooltip";
import IconButton from "../layout-components/Buttons/IconButton";
import TagButton from "../layout-components/Buttons/TagButton";
import TextButton from "../layout-components/Buttons/TextButtons";
import { useState } from "react";
import { Bank, InfoCircle, RefreshCircle } from "iconsax-reactjs";
import { useEventStore } from "@/stores/useEventStore";

function WithdrawalTab() {
  const { activeEvent: event, isLoading: loading } = useEventStore();
  const [withdrawalAmount, setWithdrawalAmount] = useState(0);

  const handlePercentageClick = percentage => {
    const amount = Math.floor((percentage / 100) * event.balance);
    setWithdrawalAmount(amount);
  };

  const handleMaxClick = () => {
    setWithdrawalAmount(event.balance);
  };

  const handleAmountChange = e => {
    let value = e.target.value.replace(/[^\d]/g, "");
    // Remove leading zeros but keep at least one "0"
    value = value.replace(/^0+/, "") || "0";
    setWithdrawalAmount(value);
  };

  const handleContinue = () => {
    if (withdrawalAmount > 0 && withdrawalAmount <= event.balance) {
      console.log(`Processing withdrawal of ₦${withdrawalAmount}`);
      // Add withdrawal logic here
    }
  };
  return (
    <div className="flex flex-col gap-2 w-full">
      <h3 className="font-bold satoshi text-[#001010]">Withdraw</h3>
      <div className="p-6 border w-full flex flex-col border-white rounded-4xl bg-white/50">
        {/* Available balance */}
        <div className="flex sm:flex-1 flex-col mb-2">
          <div className="flex items-center gap-1">
            <Tooltip
              content="Your funds are safe. Payments are released 2 days after they’re received due to standard settlement by our payment partner."
              placement="right"
              defaultPlacement="right"
            >
              <InfoCircle variant="Bold" className="text-[#8A9191]" size={16} />
            </Tooltip>
            <h3 className="satoshi font-bold text-[#8A96A3] text-xs sm:text-sm">
              Available Payout
            </h3>
          </div>
          <ToggleBalance balance={event.balance} />
        </div>
        {/* Withdrawal bank */}
        <div className="satoshi mb-6 sm:mb-8">
          <div className="flex justify-between items-center gap-4 mb-1 sm:mb-0">
            <p className="text-xs sm:text-sm text-[#8A96A3] font-bold">
              Withdrawing to
            </p>
            <TagButton
              leftImg={<RefreshCircle size={12} />}
              text="Change Account"
              className="satoshi min-w-0 px-1 sm:hidden"
              size="sm"
              variant="light-purple"
            />
          </div>
          <div className="px-2 py-3 border border-white rounded-[12px] flex items-center justify-between bg-[#F0F0F0]/90">
            <div className="flex items-center gap-2">
              {/* Bank icon */}
              <IconButton
                variant="tertiary"
                className="pointer-events-none size-6 sm:size-9"
                icon={
                  <Bank
                    variant="Bold"
                    color="#292D32"
                    className="sm:size-6 size-4"
                  />
                }
              />
              {/* Bank details */}
              <div className="font-medium">
                <p className="text-[#001010] text-sm">Opay</p>
                <p className="text-[#8A9191] leading-3.5 text-[10px] sm:text-xs">
                  Newman Ogbo | 90238202028
                </p>
              </div>
            </div>
            {/* Change account button for larger screens */}
            <TagButton
              leftImg={<RefreshCircle size={16} />}
              text="Change Account"
              className="satoshi min-w-0 px-2 hidden sm:inline-flex"
              size="lg"
              variant="light-purple"
            />
          </div>
        </div>
        {/* Withdrawal amount */}
        <div className="satoshi font-bold text-[#001010]">
          <p className="text-sm text-[#8A96A3] ">Enter Amount</p>
          <div className="flex mb-4 gap-2 sm:gap-4 items-center text-[48px] sm:text-[72px] sm:leading-24.5 leading-16.5">
            <span>₦</span>
            <input
              type="number"
              value={withdrawalAmount}
              onChange={handleAmountChange}
              min={0}
              max={event.balance}
              className="min-w-0 outline-0 border-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-moz-number-spin-box]:hidden"
            />
          </div>
          <div className="flex flex-col sm:justify-between  sm:items-center sm:flex-row gap-x-4 gap-y-6">
            {/* Amount buttons */}
            <ul className="flex items-center gap-x-4 gap-y-2 flex-wrap">
              <TagButton
                text="10%"
                variant="tertiary"
                className="px-2 min-w-0 satoshi"
                size="lg"
                onClick={() => handlePercentageClick(10)}
              />
              <TagButton
                text="25%"
                variant="tertiary"
                className="px-2 min-w-0 satoshi"
                size="lg"
                onClick={() => handlePercentageClick(25)}
              />
              <TagButton
                text="50%"
                variant="tertiary"
                className="px-2 min-w-0 satoshi"
                size="lg"
                onClick={() => handlePercentageClick(50)}
              />
              <TagButton
                text="75%"
                variant="tertiary"
                className="px-2 min-w-0 satoshi"
                size="lg"
                onClick={() => handlePercentageClick(75)}
              />
              <TagButton
                text="MAX"
                variant="tertiary"
                className="px-2 min-w-0 satoshi"
                size="lg"
                onClick={handleMaxClick}
              />
            </ul>
            {/* Withdraw button */}
            <TextButton
              text="Continue"
              className="w-full sm:w-auto"
              onClick={handleContinue}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default WithdrawalTab;
