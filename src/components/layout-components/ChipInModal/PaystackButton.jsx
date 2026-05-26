import PaystackIcon from "@/assets/icons/PaystackIcon";
import TextButton from "../Buttons/TextButtons";

export default function PaystackButton({ onClick, state, disabled }) {
  return (
    <TextButton
      text="Pay with"
      rightImg={<PaystackIcon />}
      iconSize="size-auto"
      className="min-w-[198px]"
      onClick={onClick}
      state={state}
      disabled={disabled}
    />
  );
}
