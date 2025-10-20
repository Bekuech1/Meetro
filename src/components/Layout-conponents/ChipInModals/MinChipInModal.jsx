import { formatCurrency } from "@/lib/utils";
import { Heart } from "iconsax-reactjs";
import { Link } from "react-router";
import TagButton from "../Buttons/TagButton";
import Modal from "../Modal/Modal";
import PaystackButton from "./PaystackButton";

export default function MinChipInModal({ amount = 100 }) {
  return (
    <Modal.Window name="min-chip-in">
      {/* Chip in content goes here */}
      <div className="satoshi font-bold text-sm">
        <h3 className="paytone text-[18px] mb-2 leading-[28px] font-normal">
          Your vibe, your price.
        </h3>
        <p className="text-[#8A9191]">
          Support the host however you can. every chip in counts.
        </p>
        <div className="flex flex-col mt-12 md:mt-8 gap-y-12 md:gap-y-8">
          <div className="flex flex-col">
            <TagButton
              variant="light-purple"
              size="md"
              leftImg={<Heart variant="Bold" />}
              text="Give what feels right"
              className="pointer-events-none"
            />
            <div className="flex gap-x-2 items-center">
              <h2 className="text-[72px] leading-[97px] tracking-[-2%]">
                {formatCurrency(amount)}
              </h2>
              <span className="text-[30px] leading-[38px] text-[#8A9191]">
                Min
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-y-4">
            <PaystackButton />
            <p>
              {"By continuing, you agree to out "}
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
