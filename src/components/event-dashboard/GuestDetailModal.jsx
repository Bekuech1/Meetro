import { formatDate, formatNaira, responseColors } from "@/lib/utils";
import { TickCircle } from "iconsax-reactjs";
import Avatar from "../layout-components/Avatar";
import TagButton from "../layout-components/Buttons/TagButton";
import Modal from "../layout-components/Modal/Modal";

export default function GuestDetailModal({ guestDetail, onClose }) {
  return (
    <Modal.Window name="guest-detail" title="Guest Detail" onClose={onClose}>
      {/* Content goes here */}
      <div className="satoshi font-bold text-sm text-[#001010]">
        <div className="flex flex-col gap-y-12">
          <div className="bg-white border gap-y-4 border-[#E5E7E3] p-4 rounded-[16px] flex flex-col">
            <div className="flex justify-center">
              <Avatar size="xl" src={guestDetail.photo} />
            </div>
            <div className="flex items-center justify-between gap-4">
              <span className="text-[#8A9191]">Name</span>
              <p>{guestDetail.name}</p>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span className="text-[#8A9191]">Email</span>
              <p>{guestDetail.email}</p>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span className="text-[#8A9191]">Status</span>
              <TagButton
                text={guestDetail.status}
                variant={responseColors[guestDetail.status]}
                className="!min-w-0 capitalize pointer-events-none satoshi"
                leftImg={<TickCircle variant="Bold" size={16} />}
              />
            </div>
            <div className="flex items-center justify-between gap-4">
              <span className="text-[#8A9191]">Chip In</span>
              <p> {formatNaira(guestDetail.amountPaid)}</p>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span className="text-[#8A9191]">Date</span>
              <p> {formatDate(guestDetail.date)}</p>
            </div>
          </div>
        </div>
      </div>
    </Modal.Window>
  );
}
