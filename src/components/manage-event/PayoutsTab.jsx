import IconButton from "../layout-components/Buttons/IconButton";
import PayoutsOverview from "./PayoutsOverview";
import TableSearch from "./TableSearch";
import TableSort from "./TableSort";
import TagButton from "../layout-components/Buttons/TagButton";
import TextButton from "../layout-components/Buttons/TextButtons";
import NoTransactions from "./NoTransactions";
import PayoutOverviewSkeleton from "./PayoutOverviewSkeleton";
import { ReceiveSquare2, TransmitSqaure2 } from "iconsax-reactjs";
import { useState } from "react";
import { formatDate, formatNaira } from "@/lib/utils";
import { useEventStore } from "@/stores/useEventStore";

// Sort options for dropdown
const sortOptions = [
  { value: "date", label: "By Date" },
  { value: "status", label: "By Status" },
  { value: "amount", label: "By Amount" },
];

const transactions = [
  {
    sender: "John Doe",
    amount: 1000,
    date: "2026-12-30T09:00:00.000Z",
    type: "credit",
    paymentFor: "chip-in",
    status: "successful",
  },
  {
    sender: "Alice Johnson",
    amount: 500,
    date: "2027-01-01T11:00:00.000Z",
    type: "credit",
    paymentFor: "chip-in",
    status: "successful",
  },
  {
    sender: "Newman Ogbo",
    amount: 500,
    date: "2027-01-02T12:00:00.000Z",
    type: "credit",
    paymentFor: "chip-in",
    status: "successful",
  },
  {
    sender: "Newman Ogbo",
    amount: 1200,
    date: "2027-01-02T12:00:00.000Z",
    type: "credit",
    paymentFor: "chip-in",
    status: "successful",
  },
  {
    bank: "Opay",
    accountNumber: "xxxxxx7890",
    amount: 500,
    date: "2026-12-31T10:00:00.000Z",
    type: "withdrawal",
    status: "successful",
  },
];

function PayoutsTab() {
  const [sortValue, setSortValue] = useState(sortOptions[0].value);
  const { activeEvent: event, isLoading: loading } = useEventStore();
  return (
    <div className="p-6 border w-full flex flex-col gap-y-8 border-white rounded-4xl bg-white/50">
      {/* Payouts overview */}
      {loading ? (
        <PayoutOverviewSkeleton />
      ) : (
        <PayoutsOverview
          availablePayout={event.balance}
          totalReceived={event.totalDonations}
        />
      )}
      {/* Payouts history */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between gap-2 flex-wrap satoshi text-base">
          <h3 className="font-bold text-[#001010]">History</h3>
          <div className="flex items-center gap-4">
            {/* Search */}
            <TableSearch />
            {/* Sort options */}
            <TableSort
              options={sortOptions}
              value={sortValue}
              onChange={setSortValue}
            />
          </div>
        </div>
        {transactions.length > 0 ? (
          <div className="flex flex-col gap-1 sm:gap-2 w-full satoshi font-medium">
            {/* Transactions box */}
            {transactions.map((transaction, index) => (
              <div
                key={index}
                className="sm:bg-[#FFFFFE]/50 sm:border sm:border-white gap-4 flex justify-between items-center sm:rounded-[12px] py-3 sm:px-2"
              >
                {/* Transaction details */}
                <div className="flex items-center gap-2">
                  <IconButton
                    variant="tertiary"
                    className="pointer-events-none sm:size-6 size-6"
                    icon={
                      transaction.type === "credit" ? (
                        <ReceiveSquare2
                          size={16}
                          variant="Bold"
                          className="text-[#61B42D]"
                        />
                      ) : (
                        <TransmitSqaure2
                          size={16}
                          variant="Bold"
                          className="text-[#DB2863]"
                        />
                      )
                    }
                  />
                  <div className="flex flex-col">
                    <p className="text-[#8A9191] text-xs sm:text-sm whitespace-nowrap max-[400px]:overflow-hidden max-[400px]:overflow-ellipsis max-[400px]:max-w-[130px]">
                      {/* Payment description */}
                      {transaction.type === "credit" &&
                        transaction.paymentFor === "chip-in" && (
                          <span>
                            <span>Chip In from </span>
                            <span className="capitalize text-[#001010]">
                              {transaction.sender}
                            </span>
                          </span>
                        )}
                      {transaction.type === "withdrawal" && (
                        <span>
                          Withdraw to{" "}
                          <span className="capitalize text-[#001010]">
                            {" "}
                            {transaction.bank}
                          </span>
                          <span className="text-[#001010]">
                            {" "}
                            {transaction.accountNumber}
                          </span>
                        </span>
                      )}
                    </p>
                    {/* Payment date */}
                    <span className="text-[#8A9191] text-[10px] leading-3.5 sm:text-xs">
                      {formatDate(transaction.date, "MMM d, yyyy 'at' h:mm a")}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col items-end sm:items-center sm:flex-row-reverse gap-0.5 sm:gap-2.5">
                  <TagButton
                    variant={
                      transaction.status === "successful"
                        ? "green"
                        : transaction.status === "pending"
                          ? "purple"
                          : "red"
                    }
                    className="pointer-events-none satoshi min-w-0 px-1.5"
                    text={transaction.status}
                    size="xs"
                  />
                  <span className="text-[#001010] leading-3.5 text-[10px] sm:text-xs">
                    {formatNaira(transaction.amount, 2)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <NoTransactions>
            <TextButton text="Invite Guests" variant="tertiary" />
          </NoTransactions>
        )}
      </div>
    </div>
  );
}

export default PayoutsTab;
