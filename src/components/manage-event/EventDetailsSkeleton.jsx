function EventDetailsSkeleton() {
  return (
    <div className="sm:p-6 p-4 border border-white rounded-4xl bg-white/50 animate-pulse">
      <div className="flex gap-6 md:gap-8 flex-col-reverse md:flex-row mb-4">
        {/* Event image skeleton */}
        <div className="aspect-square md:w-80.25 rounded-3xl overflow-hidden border-4 border-white shadow-[0_20px_60px_rgba(0,0,0,0.12)] bg-gray-200"></div>
        {/* Event info skeleton */}
        <div className="flex-1">
          <div className="flex justify-between gap-4 items-center mb-6">
            <div className="h-9 w-28 bg-gray-200 rounded-full"></div>
            <div className="h-8 w-28 bg-gray-200 rounded-full"></div>
          </div>
          {/* Event title skeleton */}
          <div className="flex flex-col gap-3 sm:gap-2 sm:mb-8 mb-4">
            <div className="h-7 sm:h-9 bg-gray-200 rounded w-3/4"></div>
            {/* Event tags skeleton */}
            <div className="flex gap-2">
              <div className="h-5.5 sm:h-7.5 w-24 bg-gray-200 rounded-full"></div>
              <div className="h-5.5 sm:h-7.5 w-20 bg-gray-200 rounded-full"></div>
            </div>
          </div>
          {/* Event details skeleton */}
          <div className="flex flex-col gap-3">
            {/* Date/time */}
            <div className="flex gap-2 items-center">
              <div className="size-6 sm:size-11 bg-gray-200 rounded-full"></div>
              <div className="flex-1 flex flex-col gap-1">
                <div className="h-4 bg-gray-200 rounded w-48"></div>
                <div className="h-3.5 bg-gray-200 rounded w-24"></div>
              </div>
            </div>
            {/* Location */}
            <div className="flex gap-2 items-center">
              <div className="size-6 sm:size-11 bg-gray-200 rounded-full"></div>
              <div className="flex-1 flex flex-col gap-1">
                <div className="h-4 bg-gray-200 rounded w-40"></div>
                <div className="h-3.5 bg-gray-200 rounded w-32"></div>
              </div>
              <div className="h-8.5 w-28 bg-gray-200 rounded-full hidden sm:block"></div>
            </div>
            {/* Description */}
            <div className="flex gap-2 items-start">
              <div className="size-6 sm:size-11 bg-gray-200 rounded-full"></div>
              <div className="flex-1 flex flex-col gap-2">
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                <div className="h-4 bg-gray-200 rounded w-4/6"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row sm:items-end gap-y-6 justify-between">
        {/* Event hosts skeleton */}
        <div className="flex flex-col gap-4 flex-1">
          <div className="flex flex-col gap-2">
            <div className="h-4 bg-gray-200 rounded w-20"></div>
            <div className="flex items-center gap-2">
              <div className="size-8 bg-gray-200 rounded-full"></div>
              <div className="flex flex-col gap-1 flex-1">
                <div className="h-4 bg-gray-200 rounded w-40"></div>
                <div className="h-3 bg-gray-200 rounded w-16"></div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="h-4 bg-gray-200 rounded w-20"></div>
            <div className="flex gap-1 items-center">
              <div className="flex -space-x-2">
                <div className="size-8 bg-gray-200 rounded-full border-2 border-white"></div>
                <div className="size-8 bg-gray-200 rounded-full border-2 border-white"></div>
              </div>
              <div className="h-7 w-16 bg-gray-200 rounded-full"></div>
            </div>
          </div>
        </div>
        {/* Buttons skeleton */}
        <div className="flex-[1.6]">
          <div className="flex flex-col-reverse min-[350px]:flex-row min-[350px]:items-end gap-4 sm:gap-0 justify-between">
            <div className="h-10 bg-gray-200 rounded-full min-[350px]:flex-1 w-full min-[420px]:w-auto min-[420px]:flex-initial"></div>
            <div className="flex flex-1 min-[420px]:flex-initial min-[420px]:items-center gap-2 min-[420px]:gap-4 flex-col items-end min-[420px]:flex-row">
              <div className="h-4 w-16 bg-gray-200 rounded"></div>
              <div className="h-11 w-32 bg-gray-200 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventDetailsSkeleton;
