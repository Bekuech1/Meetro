import TagButton from "../layout-components/Buttons/TagButton";
import { formatDate, formatNaira } from "@/lib/utils";
import { More } from "iconsax-reactjs";

// Event response colors
const responseColors = {
  maybe: "purple",
  going: "green",
};

function GuestsTable({ guests }) {
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
        {/* Table body */}
        <tbody>
          {guests.map((guest, index) => (
            <tr
              key={index}
              className="text-xs whitespace-nowrap font-medium text-[#001010]"
            >
              <td className="p-2 px-0 md:pl-2 md:pr-4">
                <div className="flex flex-col gap-0.5">
                  <span>{guest.name}</span>
                  <span className="text-[10px] leading-3.5 md:hidden text-[#8A9191]">
                    {formatDate(guest.date)}
                  </span>
                </div>
              </td>
              <td className="p-2 px-0 md:px-4 text-right md:text-center">
                <div className="flex flex-col gap-0.5">
                  <TagButton
                    className="capitalize ml-auto md:mx-auto pointer-events-none min-w-0 satoshi h-4.5 text-[10px] leading-3.5 font-medium"
                    text={guest.status}
                    variant={responseColors[guest.status]}
                  />
                  <span className="md:hidden text-[10px] leading-3.5">
                    {formatNaira(guest.amountPaid, 2)}
                  </span>
                </div>
              </td>

              <td className="p-2 px-4 hidden md:table-cell">
                {formatDate(guest.date)}
              </td>
              <td className="p-2 px-4 text-right hidden md:table-cell">
                {formatNaira(guest.amountPaid, 2)}
              </td>
              <td className="p-2 px-4 text-right hidden md:table-cell">
                <div className="flex justify-end">
                  <button className="bg-transparent cursor-pointer">
                    <More color="#8A9191" size={18} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default GuestsTable;
