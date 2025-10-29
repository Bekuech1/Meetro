import TextButton from "../Buttons/TextButtons";
import Modal from "../Modal/Modal";
import Avatar from "../Avatar";
import TagButton from "../Buttons/TagButton";
import { Copy, Send2, TickCircle } from "iconsax-reactjs";
import { formatCurrency } from "@/lib/utils";

export default function GuestDetailModal({ guestDetail, eventUrl }) {
  return (
    <Modal.Window name="guest-detail" title="Guest Detail">
      {/* Content goes here */}
      <div className="satoshi font-bold text-sm text-[#001010]">
        <div className="flex flex-col gap-y-12">
          <div className="bg-white border gap-y-4 border-[#E5E7E3] p-4 rounded-[16px] flex flex-col">
            <div className="flex justify-center">
              <Avatar size="xl" src={guestDetail.profileImg} />
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
              <span className="text-[#8A9191]">Chip In</span>
              <p>{formatCurrency(guestDetail.chipIn)}</p>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span className="text-[#8A9191]">Status</span>
              <TagButton
                text="Going"
                variant="green"
                className="!min-w-0 pointer-events-none satoshi"
                leftImg={<TickCircle variant="Bold" size={16} />}
              />
            </div>
          </div>
          <div className="flex items-center justify-center md:justify-start gap-x-4">
            <TextButton
              text="Share Event"
              variant="tertiary"
              rightImg={<Send2 size={16} variant="Bold" />}
            />
            <TextButton
              text="Copy Link"
              variant="tertiary"
              rightImg={<Copy size={16} variant="Bold" />}
            />
          </div>
        </div>
      </div>
    </Modal.Window>
  );
}
