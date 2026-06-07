import IconButton from "../layout-components/Buttons/IconButton";
import PayoutsOverview from "./PayoutsOverview";
import TableSearch from "./TableSearch";
import TagButton from "../layout-components/Buttons/TagButton";
import TextButton from "../layout-components/Buttons/TextButtons";
import NoTransactions from "./NoTransactions";
import PayoutOverviewSkeleton from "./PayoutOverviewSkeleton";
import Modal from "../layout-components/Modal/Modal";
import PayoutsHistorySkeleton from "./PayoutsHistorySkeleton";
import { ReceiveSquare2, TransmitSqaure2, ArrowRight2 } from "iconsax-reactjs";
import React, { useState, useEffect } from "react";
import { formatDate, formatNaira } from "@/lib/utils";
import { useManageEventContext } from "@/layouts/ManageEventLayout";
import { useQuery } from "@tanstack/react-query";
import { paymentApi } from "@/services/paymentApi";
import { useParams } from "react-router";

function PayoutsTab() {
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const { event, loading } = useManageEventContext();
  const { slug: eventId } = useParams();

  const { data, isLoading: loadingTransactions } = useQuery({
    queryKey: ["payouts", eventId, page, search],
    queryFn: () => paymentApi.getTransactions(eventId, page, search),
    staleTime: 15 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    gcTime: 30 * 60 * 1000,
  });

  // Reset page when search changes
  useEffect(() => {
    setPage(1);
  }, [search]);

  // Auto-clear search when input is manually cleared
  useEffect(() => {
    if (searchInput === "" && search !== "") {
      setSearch("");
    }
  }, [searchInput, search]);

  // Handle search action when user presses Enter or clicks search button
  const handleSearch = () => {
    if (searchInput.trim() !== "") {
      setSearch(searchInput);
    }
  };

  // Clear search input and search state
  const handleClearSearch = () => {
    setSearchInput("");
    setSearch("");
  };

  // Pagination handlers
  const nextPage = () => {
    if (data?.hasMore) {
      setPage(prev => prev + 1);
      // Scroll to top of table on page change
      window.scrollTo({
        top: 0,
        behavior: "instant",
      });
    }
  };

  const hasSearch = search.trim() !== "";

  const prevPage = () => {
    setPage(prev => Math.max(prev - 1, 1));
    // Scroll to top of table on page change
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  };

  const transactions = data?.data?.transactions ?? [];

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
        {(transactions.length > 0 || hasSearch || loadingTransactions) && (
          <div className="flex items-center justify-between gap-2 flex-wrap satoshi text-base">
            <h3 className="font-bold text-[#001010]">History</h3>
            <div className="flex items-center gap-4">
              {/* Search */}
              <TableSearch
                value={searchInput}
                onChange={e => setSearchInput(e.target.value)}
                handleSearch={handleSearch}
                onClear={handleClearSearch}
                onKeyDown={e => {
                  if (e.key === "Enter") {
                    handleSearch();
                  }
                }}
              />
            </div>
          </div>
        )}
        {loadingTransactions ? (
          <PayoutsHistorySkeleton />
        ) : transactions.length > 0 ? (
          <React.Fragment>
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
                                {transaction.user}
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
                        {formatDate(
                          transaction.date,
                          "MMM d, yyyy 'at' h:mm a"
                        )}
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
            {/* Pagination */}
            <div className="w-full flex justify-end items-center">
              <div className="flex items-center gap-2">
                <IconButton
                  variant="tertiary"
                  className="size-6 sm:size-6 disabled:bg-white disabled:border-[#E5E7E3]"
                  icon={<ArrowRight2 size={16} className="rotate-180" />}
                  disabled={page === 1}
                  onClick={prevPage}
                />
                <TagButton
                  text={`${page} of ${data?.totalPages || 1}`}
                  size="sm"
                  className="satoshi pointer-events-none h-6 min-w-0 text-[10px] normal-case leading-3.5 font-medium"
                />
                <IconButton
                  variant="tertiary"
                  className="size-6 sm:size-6 disabled:bg-white disabled:border-[#E5E7E3]"
                  icon={<ArrowRight2 size={16} />}
                  onClick={nextPage}
                  disabled={!data?.hasMore}
                />
              </div>
            </div>
          </React.Fragment>
        ) : (
          <React.Fragment>
            {!hasSearch ? (
              <NoTransactions>
                <Modal.Open opens="share-event">
                  <TextButton text="Invite Guests" variant="tertiary" />
                </Modal.Open>
              </NoTransactions>
            ) : (
              <NoTransactions
                title="No transactions found"
                description="We couldn't find any transactions matching your search. Try different keywords."
              >
                <TextButton
                  text="Clear Search"
                  variant="tertiary"
                  onClick={handleClearSearch}
                />
              </NoTransactions>
            )}
          </React.Fragment>
        )}
      </div>
    </div>
  );
}

export default PayoutsTab;
