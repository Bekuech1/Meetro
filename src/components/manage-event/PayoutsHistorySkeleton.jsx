function PayoutsHistorySkeleton({ count = 5 }) {
  return (
    <div className="flex flex-col gap-1 sm:gap-2 w-full">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="sm:bg-[#FFFFFE]/50 sm:border sm:border-white gap-4 flex justify-between items-center sm:rounded-[12px] py-3 sm:px-2 animate-pulse"
        >
          {/* Left side: Icon and transaction details */}
          <div className="flex items-center gap-2">
            {/* Icon skeleton */}
            <div className="size-6 bg-gray-200 rounded-lg"></div>

            <div className="flex flex-col gap-1.5">
              {/* Transaction description skeleton */}
              <div className="h-3.5 bg-gray-200 rounded w-32 sm:w-40"></div>
              {/* Date skeleton */}
              <div className="h-3 bg-gray-200 rounded w-24 sm:w-32"></div>
            </div>
          </div>

          {/* Right side: Status and amount */}
          <div className="flex flex-col items-end sm:items-center sm:flex-row-reverse gap-0.5 sm:gap-2.5">
            {/* Status tag skeleton */}
            <div className="h-5 bg-gray-200 rounded-full w-20"></div>
            {/* Amount skeleton */}
            <div className="h-3 bg-gray-200 rounded w-16 sm:w-20"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PayoutsHistorySkeleton;
