import PaystackButton from "../ChipInModal/PaystackButton";
import Modal from "../Modal/Modal";
import TagButton from "../Buttons/TagButton";
import IconButton from "../Buttons/IconButton";
import { Link } from "react-router";
import { formatCurrency } from "@/lib/utils";
import { Heart, InfoCircle, Star1 } from "iconsax-reactjs";
import { useMutation } from "@tanstack/react-query";
import { useModalContext } from "../Modal/ModalContext";
import { paymentApi } from "@/services/paymentApi";

function PayChipInModal({ event }) {
  const chipInDetails = event?.chipInDetails;

  const { close } = useModalContext();

  const { mutate: chipIn, isPending } = useMutation({
    mutationFn: () => paymentApi.chipIn(event._id, event.chipInDetails.amount),
    onSuccess: data => {
      // Close modal
      close();

      // Navigate to paystack url
      window.location.href = data.paymentLink;
    },
  });

  return (
    <Modal.Window name="pay-chip-in">
      <div className="satoshi font-bold text-sm">
        <IconButton
          className="pointer-events-none size-11! mb-6"
          variant="tertiary"
          icon={<InfoCircle color="#077D8A" size={24} variant="Bold" />}
        />
        <h3 className="paytone text-[18px] mb-2 leading-[28px] font-normal">
          {chipInDetails.chipInType === "fixed" &&
            "This event has a set entry amount."}
          {chipInDetails.chipInType === "target" &&
            "Let's reach the goal together."}
          {chipInDetails.chipInType === "flexible" && "Your vibe, your price."}
        </h3>
        <p className="text-[#8A9191]">
          {chipInDetails.chipInType === "fixed" &&
            "Your chip in covers the cost of entry no surprises, just good vibes."}
          {chipInDetails.chipInType === "target" &&
            "This event will only happen if we reach the target. Your chip in helps bring it to life."}
          {chipInDetails.chipInType === "flexible" &&
            "Support the host however you can. every chip in counts."}
        </p>
        <div className="flex flex-col mt-12 md:mt-8 gap-y-12 md:gap-y-8">
          <div className="flex flex-col">
            {chipInDetails.chipInType === "fixed" && (
              <TagButton
                variant="light-purple"
                size="md"
                leftImg={<Star1 variant="Bold" />}
                text="Required to join the fun"
                className="pointer-events-none"
              />
            )}
            {chipInDetails.chipInType === "target" && (
              <div className="flex flex-col gap-4">
                <div className="flex flex-col">
                  <p className="text-[#8A9191]">Raised</p>
                  <h3 className="text-[#7A60BF] text-[48px] leading-[65px] tracking-[-2%]">
                    {formatCurrency(event.totalDonations)}
                  </h3>
                </div>
                <div className="flex flex-col">
                  <p className="text-[#8A9191]">Target Goal</p>
                  <h3 className="text-[48px] leading-[65px] tracking-[-2%]">
                    {formatCurrency(chipInDetails.amount)}
                  </h3>
                </div>
              </div>
            )}
            {chipInDetails.chipInType === "flexible" && (
              <TagButton
                variant="light-purple"
                size="md"
                leftImg={<Heart variant="Bold" />}
                text="Give what feels right"
                className="pointer-events-none"
              />
            )}
            {chipInDetails.chipInType !== "target" && (
              <div className="flex gap-x-2 items-center">
                <h2 className="text-[72px] leading-[97px] tracking-[-2%]">
                  {formatCurrency(chipInDetails.amount)}
                </h2>

                {chipInDetails.chipInType === "flexible" && (
                  <span className="text-[30px] leading-[38px] text-[#8A9191]">
                    Min
                  </span>
                )}
              </div>
            )}
          </div>
          <div className="flex flex-col gap-y-4">
            <PaystackButton
              onClick={chipIn}
              state={isPending ? "loading" : "default"}
              disabled={isPending}
            />
            <p>
              {"By continuing, you agree to our "}
              <Link to="/terms" target="_blank" className="text-[#7A60BF]">
                Terms of Service
              </Link>
              {" and "}
              <Link to="/privacy" target="_blank" className="text-[#7A60BF]">
                Privacy Policy.
              </Link>
            </p>
          </div>
        </div>
      </div>
    </Modal.Window>
  );
}

export default PayChipInModal;
