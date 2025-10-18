import { useState } from "react";
import { Eye, EyeSlash, Lock } from "iconsax-reactjs";
import InputField from "./InputField";
import InputIcon from "@/assets/icons/InputIcon";

export default function PasswordField({
  placeholder = "Make it a good one!",
  ...rest
}) {
  // Show password field
  const [show, setShow] = useState(false);

  // Toggle show password
  const toggleShow = () => setShow(!show);
  return (
    <InputField
      type={show ? "text" : "password"}
      placeholder={placeholder}
      leftIcon={
        <InputIcon>
          <Lock size={16} color="#001010" variant="Bold" />
        </InputIcon>
      }
      rightIcon={
        // Show/hide password button
        <button
          onClick={toggleShow}
          className="flex cursor-pointer [&_svg]:size-4!"
          type="button"
        >
          {show ? (
            <Eye variant="Bold" color="#001010" />
          ) : (
            <EyeSlash variant="Bold" color="#001010" />
          )}
        </button>
      }
      {...rest}
    />
  );
}
