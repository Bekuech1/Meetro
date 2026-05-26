import Modal from "../Modal/Modal";
import TextButton from "../Buttons/TextButtons";
import { CloseCircle, TickCircle } from "iconsax-reactjs";
import { formatCurrency } from "@/lib/utils";
import { format } from "date-fns";

export default function PaymentDetailModal({ transaction }) {
  return (
    <Modal.Window name="payment-detail" title="Payment Detail">
      {/* Chip in content goes here */}
      <div className="satoshi font-bold text-sm text-[#010E1F]">
        <div className="flex flex-col gap-y-12">
          <div className="bg-white rounded-[32px] shadow-[0_4px_24px_0_rgba(2,142,75,0.1)] overflow-hidden">
            <div className="flex flex-col justify-center gap-y-3 p-6 items-center border border-[#f0f0f0]">
              {transaction.status === "success" ? (
                <TickCircle color="#61B42D" size={48} variant="Bold" />
              ) : (
                <CloseCircle size={48} variant="Bold" color="#C7245A" />
              )}
              <h3 className="text-base">Transaction Status</h3>
            </div>
            <div className="p-6 flex flex-col gap-y-1 items-center border border-[#f0f0f0]">
              <h3 className="paytone text-[20px] leading-[30px] font-normal">
                {transaction.event.title}
              </h3>
              <div className="text-[#8A9191] font-medium">
                <p>{format(transaction.event.date, "EEE, d MMMM, h:mm a")}</p>
                <p>{transaction.event.location}.</p>
              </div>
            </div>
            <div className="p-6 flex flex-col gap-4">
              <div className="flex items-center justify-between gap-4">
                <span className="text-[#8A96A3]">Guest</span>
                <p>{transaction.event.guest}</p>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="text-[#8A96A3]">Status</span>
                <p className="capitalize">{transaction.event.guestStatus}</p>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="text-[#8A96A3]">Amount</span>
                <p>{formatCurrency(transaction.amount)}</p>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center md:justify-start gap-x-4">
            <TextButton text="Back to home" />
          </div>
        </div>
      </div>
    </Modal.Window>
  );
}
