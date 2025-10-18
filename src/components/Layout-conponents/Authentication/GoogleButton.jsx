import GoogleIcon from "@/assets/icons/GoogleIcon";
import TextButton from "../Buttons/TextButtons";

export default function GoogleButton() {
  return (
    <TextButton
      rightImg={<GoogleIcon />}
      variant="tertiary"
      text="Continue with Google"
    />
  );
}
