import PaystackIcon from "@/assets/icons/PaystackIcon";
import TextButton from "../Buttons/TextButtons";

export default function PaystackButton() {
  return (
    <TextButton
      text="Pay with"
      rightImg={<PaystackIcon />}
      iconSize="size-auto"
    />
  );
}
