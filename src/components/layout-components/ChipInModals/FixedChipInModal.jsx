import { formatCurrency } from "@/lib/utils";
import { Star1 } from "iconsax-reactjs";
import { Link } from "react-router";
import TagButton from "../Buttons/TagButton";
import Modal from "../Modal/Modal";
import PaystackButton from "./PaystackButton";

export default function FixedChipInModal({ amount = 10000 }) {
  return (
    <Modal.Window name="fixed-chip-in">
      {/* Chip in content goes here */}
      <div className="satoshi font-bold text-sm">
        <h3 className="paytone text-[18px] mb-2 leading-[28px] font-normal">
          This event has a set entry amount.
        </h3>
        <p className="text-[#8A9191]">
          Your chip in covers the cost of entry no surprises, just good vibes.
        </p>
        <div className="flex flex-col mt-12 md:mt-8 gap-y-12 md:gap-y-8">
          <div className="flex flex-col">
            <TagButton
              variant="light-purple"
              size="md"
              leftImg={<Star1 variant="Bold" />}
              text="Required to join the fun"
              className="pointer-events-none"
            />
            <h2 className="text-[72px] leading-[97px] tracking-[-2%]">
              {formatCurrency(amount)}
            </h2>
          </div>
          <div className="flex flex-col gap-y-4">
            <PaystackButton />
            <p>
              {"By continuing, you agree to our "}
              <Link to="/" className="text-[#7A60BF]">
                Terms of Service
              </Link>
              {" and "}
              <Link to="/" className="text-[#7A60BF]">
                Privacy Policy.
              </Link>
            </p>
          </div>
        </div>
      </div>
    </Modal.Window>
  );
}
