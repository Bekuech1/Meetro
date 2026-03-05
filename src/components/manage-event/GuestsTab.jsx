import { eventsApi } from "@/services/eventsApi";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight2, Send2, Sms } from "iconsax-reactjs";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import IconButton from "../layout-components/Buttons/IconButton";
import TagButton from "../layout-components/Buttons/TagButton";
import TextButton from "../layout-components/Buttons/TextButtons";
import GuestsTable from "./GuestsTable";
import GuestsTableSkeleton from "./GuestsTableSkeleton";
import NoGuests from "./NoGuests";
import TableSearch from "./TableSearch";
import Modal from "../layout-components/Modal/Modal";

function GuestsTab() {
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const { slug: eventId } = useParams();

  const { data, isLoading: loading } = useQuery({
    queryKey: ["guests", eventId, page, search],
    queryFn: () => eventsApi.getEventGuests(eventId, page, search),
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
  const prevPage = () => {
    setPage(prev => Math.max(prev - 1, 1));
    // Scroll to top of table on page change
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  };

  const hasSearch = search !== "";

  const guests = data?.data || [];

  return (
    <div className="w-full flex flex-col gap-2">
      <div className="flex items-center justify-between satoshi text-base">
        {/* Header */}
        <h3 className="font-bold text-[#001010]">Guests</h3>
        <div className="flex items-center gap-4">
          <Modal.Open opens="share-event">
            <TagButton
              text="Invite Guests"
              className="sm:px-2 h-7 sm:h-8 sm:text-xs text-[10px] leading-3.5"
              rightImg={<Send2 variant="Bold" />}
            />
          </Modal.Open>

          <TagButton
            text="Share Blast"
            className="sm:px-2 h-7 sm:h-8 sm:text-xs text-[10px] leading-3.5"
            rightImg={<Sms variant="Bold" />}
          />
        </div>
      </div>
      {/* Guests table */}
      <div className="p-6 border flex flex-col gap-4 border-white rounded-4xl bg-white/50 overflow-visible">
        {(guests.length > 0 || hasSearch || loading) && (
          <div className="flex justify-between items-center gap-4">
            {/* Search bar */}
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
        )}
        {loading ? (
          <GuestsTableSkeleton rows={10} />
        ) : guests.length > 0 ? (
          <React.Fragment>
            <GuestsTable guests={guests} />
            <div className="w-full flex justify-between items-center">
              <div className="flex items-center gap-2.5 satoshi text-xs text-[#001010] font-medium">
                {/* Going count */}
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-[#7CB32D] border border-[#AEFC40] inline-block"></span>
                  <span className="">
                    {data?.goingCount || 0}{" "}
                    <span className="text-[#8A9191]">Going</span>
                  </span>
                </span>
                {/* Maybe count */}
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-[#7A60BF] border border-[#9E88DB] inline-block"></span>
                  <span className="">
                    {data?.maybeCount || 0}{" "}
                    <span className="text-[#8A9191]">Maybe</span>
                  </span>
                </span>
              </div>
              {/* Pagination */}
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
              <NoGuests>
                <Modal.Open opens="share-event">
                  <TextButton text="Invite Guests" variant="tertiary" />
                </Modal.Open>
              </NoGuests>
            ) : (
              <NoGuests
                title="No guests found"
                description="We couldn't find any guests matching your search. Try different keywords."
              >
                <TextButton
                  text="Clear Search"
                  variant="tertiary"
                  onClick={handleClearSearch}
                />
              </NoGuests>
            )}
          </React.Fragment>
        )}
      </div>
    </div>
  );
}

export default GuestsTab;
