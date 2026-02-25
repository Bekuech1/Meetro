function PayoutOverviewSkeleton() {
  return (
    <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 animate-pulse">
      <div className="flex sm:flex-[1.2] flex-col gap-2">
        <div className="h-4 bg-gray-200 rounded w-40"></div>
        <div className="h-8 bg-gray-200 rounded w-32"></div>
      </div>
      <div className="flex sm:flex-1 flex-col gap-2">
        <div className="h-4 bg-gray-200 rounded w-32"></div>
        <div className="h-8 bg-gray-200 rounded w-28"></div>
      </div>
      <div className="h-11 w-full sm:w-28 bg-gray-200 rounded-full"></div>
    </div>
  );
}

export default PayoutOverviewSkeleton;
