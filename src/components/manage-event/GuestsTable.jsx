import { formatDate, formatNaira, responseColors } from "@/lib/utils";
import { More } from "iconsax-reactjs";
import { useEffect, useRef, useState } from "react";
import { useModalContext } from "../layout-components/Modal/ModalContext";
import GuestDetailModal from "../event-dashboard/GuestDetailModal";
import TagButton from "../layout-components/Buttons/TagButton";

function GuestsTable({ guests, isPaidEvent }) {
  const [openMenuId, setOpenMenuId] = useState(null);
  const [activeGuest, setActiveGuest] = useState(null);
  const [menuPosition, setMenuPosition] = useState({ top: 0, right: 0 });
  const { setActive } = useModalContext();
  const buttonRefs = useRef({});

  useEffect(() => {
    const handleClickOutside = event => {
      if (openMenuId !== null) {
        const currentButton = buttonRefs.current[openMenuId];
        // Close if clicking outside both button and menu
        if (currentButton && !event.target.closest(".options-menu-container")) {
          closeMenu();
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openMenuId]);

  const toggleMenu = guestId => {
    if (openMenuId === guestId) {
      setOpenMenuId(null);
    } else {
      const button = buttonRefs.current[guestId];
      if (button) {
        const rect = button.getBoundingClientRect();
        setMenuPosition({
          top: rect.bottom + 4,
          right: window.innerWidth - rect.right,
        });
      }
      setOpenMenuId(guestId);
    }
  };

  const closeMenu = () => {
    setOpenMenuId(null);
  };

  const handleAction = (action, guest) => {
    closeMenu();
    switch (action) {
      case "view":
        setActiveGuest(guest);
        setActive("guest-detail");
        break;
      default:
        break;
    }
  };

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full md:min-w-[640px] satoshi border-separate border-spacing-0 table-fixed">
        {/* Table header */}
        <thead className="text-left whitespace-nowrap text-xs text-[#8A9191] hidden md:table-header-group font-bold">
          <tr>
            <th className="p-2 pr-4 bg-[#F0F0F0]/90 rounded-l-[8px] md:w-1/3">
              Guest Name
            </th>
            <th className="p-2 px-4 bg-[#F0F0F0]/90 text-center">Status</th>
            <th className="p-2 px-4 bg-[#F0F0F0]/90">Date</th>
            {isPaidEvent && (
              <th className="p-2 px-4 bg-[#F0F0F0]/90 text-right">
                Amount Paid
              </th>
            )}
            <th className="p-2 px-4 bg-[#F0F0F0]/90 rounded-r-[8px] text-right">
              Options
            </th>
          </tr>
        </thead>
        {/* Table body */}
        <tbody>
          {guests.map((guest, index) => {
            const guestId = guest.id || index;
            return (
              <tr
                key={guestId}
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
                {isPaidEvent && (
                  <td className="p-2 px-4 text-right hidden md:table-cell">
                    {formatNaira(guest.amountPaid, 2)}
                  </td>
                )}
                <td className="p-2 px-4 text-right hidden md:table-cell">
                  <div className="flex justify-end relative options-menu-container">
                    <button
                      ref={el => (buttonRefs.current[guestId] = el)}
                      onClick={() => toggleMenu(guestId)}
                      className="bg-transparent cursor-pointer hover:bg-[#E5E7E3] rounded-lg p-1 transition-colors"
                    >
                      <More color="#8A9191" size={18} />
                    </button>

                    {/* Options Menu */}
                    {openMenuId === guestId && (
                      <div
                        className="fixed z-[100] rounded-[8px] p-1 bg-white satoshi shadow-[0px_10px_22px_0px_#2D4D6C26] min-w-[105px]"
                        style={{
                          top: `${menuPosition.top}px`,
                          right: `${menuPosition.right}px`,
                        }}
                        onMouseDown={e => e.stopPropagation()}
                      >
                        <button
                          onClick={() => handleAction("view", guest)}
                          className="px-2 py-1 leading-4.5 w-full text-left text-xs font-bold text-[#001010] hover:bg-[#E6FEC4] rounded-[4px] transition-colors"
                        >
                          <span>View</span>
                        </button>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {/* Guest Detail Modal */}
      {activeGuest && (
        <GuestDetailModal
          guestDetail={activeGuest}
          onClose={() => {
            setActive(null);
            setActiveGuest(null);
          }}
        />
      )}
    </div>
  );
}

export default GuestsTable;
