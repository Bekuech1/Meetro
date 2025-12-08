import Modal from "../Modal/Modal";
import PaystackButton from "./PaystackButton";
import { formatCurrency } from "@/lib/utils";
import { Link } from "react-router";

export default function TargetChipInModal({
  targetAmount = 100000,
  raisedAmount = 50000,
}) {
  return (
    <Modal.Window name="target-chip-in">
      {/* Chip in content goes here */}
      <div className="satoshi font-bold text-sm">
        <h3 className="paytone text-[18px] mb-2 leading-[28px] font-normal">
          Let's reach the goal together.
        </h3>
        <p className="text-[#8A9191]">
          This event will only happen if we reach the target. Your chip in helps
          bring it to life.
        </p>
        <div className="flex flex-col mt-12 md:mt-8 gap-y-12 md:gap-y-8">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col">
              <p className="text-[#8A9191]">Raised</p>
              <h3 className="text-[#7A60BF] text-[48px] leading-[65px] tracking-[-2%]">
                {formatCurrency(raisedAmount)}
              </h3>
            </div>
            <div className="flex flex-col">
              <p className="text-[#8A9191]">Target Goal</p>
              <h3 className="text-[48px] leading-[65px] tracking-[-2%]">
                {formatCurrency(targetAmount)}
              </h3>
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
