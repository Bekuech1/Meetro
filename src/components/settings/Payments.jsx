import TagButton from "../layout-components/Buttons/TagButton";
import TextButton from "../layout-components/Buttons/TextButtons";
import IconButton from "../layout-components/Buttons/IconButton";
import Toggle from "../layout-components/Selectors/Toggle";
import { useState } from "react";
import { Bank, RefreshCircle } from "iconsax-reactjs";

function Payments() {
  const [feeSettings, setFeeSettings] = useState(false);
  const [bankAccount, setBankAccount] = useState({
    bankName: "Opay",
    accountNumber: "9023820208",
    accountName: "Newman Ogbo",
  });
  return (
    <div className="satoshi">
      <div className="mb-6">
        <h1 className="paytone text-2xl leading-8 font-normal">Payments</h1>
        <p className="text-[#8A9191] text-xs font-medium">
          Your payment details will appear here
        </p>
      </div>
      {/* Bank Account */}
      <div>
        <div className="flex items-center justify-between mb-1">
          <h3 className="font-medium text-sm">Bank Account</h3>
          <TagButton
            text="Change Account"
            variant="light-purple"
            className="satoshi"
            leftImg={<RefreshCircle variant="outline" />}
          />
        </div>
        <div className="p-2 border border-white rounded-[12px] flex items-center justify-between bg-white">
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
              <p className="text-[#001010] text-sm capitalize">
                {bankAccount.bankName}
              </p>
              <p className="text-[#8A9191] capitalize leading-3.5 text-[10px] sm:text-xs">
                {bankAccount.accountName} | {bankAccount.accountNumber}
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Fee settings */}
      <div className="mt-3 flex justify-between items-start mb-6">
        <div>
          <h3 className="font-medium text-sm mb-1">Fees settings</h3>
          <p className="text-[#8A9191] text-xs font-medium">
            Shift the responsibility onto customers.
          </p>
        </div>
        <Toggle
          checked={feeSettings}
          onChange={() => setFeeSettings(!feeSettings)}
        />
      </div>

      {/* Save Button */}
      <TextButton text="Save Changes" variant="primary" className="min-w-0" />
    </div>
  );
}

export default Payments;
