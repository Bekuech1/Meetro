import React from "react";

function EventItemsLoader() {
  const dateGroups = [3, 2]; // First group: 3 events, Second group: 2 events

  return (
    <React.Fragment>
      {dateGroups.map((eventsCount, groupIndex) => (
        <div key={groupIndex} className="flex flex-col items-center">
          {/* Event date placeholder */}
          <div
            className={`inline-flex items-center mb-4 satoshi text-xs text-[#001010] font-bold rounded-full bg-white p-1.5 ${groupIndex !== 0 ? "mt-4" : ""}`}
          >
            <div className="h-3 w-28 bg-gray-200 rounded-full animate-pulse" />
          </div>

          {/* Events container */}
          <div className="flex flex-col w-full gap-2">
            {Array.from({ length: eventsCount }).map((_, index) => (
              <div
                key={index}
                className="border flex border-white p-2 min-[500px]:p-3 bg-gradient-to-r from-[#FCFEF9]/50 to-white backdrop-blur-2xl rounded-2xl gap-2 animate-pulse"
              >
                {/* Image skeleton */}
                <div className="w-16 h-14 min-[500px]:w-[114px] min-[500px]:h-[106px] bg-gray-200 rounded-[6px] min-[500px]:rounded-xl" />

                {/* Content skeleton */}
                <div className="flex-1 flex flex-col justify-between">
                  {/* Top */}
                  <div className="space-y-2">
                    {/* Time details */}
                    <div className="flex items-center justify-between gap-3">
                      <div className="h-3 w-16 bg-gray-200 rounded" />
                      <div className="h-3 w-20 bg-gray-200 rounded" />
                    </div>

                    {/* Title and tags */}
                    <div className="space-y-1.5">
                      <div className="h-4 w-3/4 bg-gray-200 rounded" />
                      <div className="flex gap-1">
                        <div className="h-5 w-16 bg-gray-200 rounded-full" />
                        <div className="h-5 w-20 bg-gray-200 rounded-full" />
                      </div>
                    </div>
                  </div>

                  {/* Bottom */}
                  <div className="flex gap-1 mt-2">
                    <div className="h-6 w-20 bg-gray-200 rounded-full" />
                    <div className="h-6 w-24 bg-gray-200 rounded-full" />
                    <div className="h-6 w-16 bg-gray-200 rounded-full" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </React.Fragment>
  );
}

export default EventItemsLoader;
