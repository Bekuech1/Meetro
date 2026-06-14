function GuestsTableSkeleton({ rows = 5 }) {
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full md:min-w-[640px] satoshi border-separate border-spacing-0 overflow-hidden table-fixed">
        {/* Table header */}
        <thead className="text-left whitespace-nowrap text-xs text-[#8A9191] hidden md:table-header-group font-bold">
          <tr>
            <th className="p-2 pr-4 bg-[#F0F0F0]/90 rounded-l-[8px] md:w-1/3">
              Guest Name
            </th>
            <th className="p-2 px-4 bg-[#F0F0F0]/90 text-center">Status</th>
            <th className="p-2 px-4 bg-[#F0F0F0]/90">Date</th>
            <th className="p-2 px-4 bg-[#F0F0F0]/90 text-right">Amount Paid</th>
            <th className="p-2 px-4 bg-[#F0F0F0]/90 rounded-r-[8px] text-right">
              Options
            </th>
          </tr>
        </thead>
        {/* Table body with skeleton rows */}
        <tbody>
          {Array.from({ length: rows }).map((_, index) => (
            <tr
              key={index}
              className="text-xs whitespace-nowrap font-medium text-[#001010]"
            >
              <td className="p-2 px-0 md:pl-2 md:pr-4">
                <div className="flex flex-col gap-0.5">
                  <div className="h-3.5 bg-gray-200 rounded animate-pulse w-32"></div>
                  <div className="h-3 bg-gray-200 rounded animate-pulse w-20 md:hidden"></div>
                </div>
              </td>
              <td className="p-2 px-0 md:px-4 text-right md:text-center">
                <div className="flex flex-col gap-0.5">
                  <div className="h-4.5 bg-gray-200 rounded-full animate-pulse w-14 ml-auto md:mx-auto"></div>
                  <div className="h-3 bg-gray-200 rounded animate-pulse w-16 ml-auto md:hidden"></div>
                </div>
              </td>
              <td className="p-2 px-4 hidden md:table-cell">
                <div className="h-3.5 bg-gray-200 rounded animate-pulse w-24"></div>
              </td>
              <td className="p-2 px-4 text-right hidden md:table-cell">
                <div className="h-3.5 bg-gray-200 rounded animate-pulse w-20 ml-auto"></div>
              </td>
              <td className="p-2 px-4 text-right hidden md:table-cell">
                <div className="flex justify-end">
                  <div className="size-[18px] bg-gray-200 rounded animate-pulse"></div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default GuestsTableSkeleton;
