import { ArrowDown2, Sms, User } from "iconsax-reactjs";
import { useState } from "react";
import { useModalContext } from "../Modal/ModalContext";
import InputIcon from "@/assets/icons/InputIcon";
import TextButton from "../Buttons/TextButtons";
import FormGroup from "../Inputs/FormGroup";
import InputField from "../Inputs/InputField";
import PasswordField from "../Inputs/PasswordField";
import Modal from "../Modal/Modal";
import GoogleButton from "./GoogleButton";

export default function SignUpModal() {
  // Open email form
  const [open, setOpen] = useState(false);
  // Modal context
  const { setActive } = useModalContext();
  return (
    <Modal.Window name="signup">
      {/* Signup form or content goes here */}
      <div className="satoshi font-bold text-sm">
        <h3 className="paytone text-[18px] mb-2 leading-[28px] font-normal">
          Create an Account
        </h3>
        <p className="text-[#8A9191]">Join the Meetro in seconds!</p>
        <div className="flex flex-col mt-4 gap-y-4">
          {/* Google Button */}
          <GoogleButton />
          {/* Email Button */}
          {!open ? (
            <TextButton
              variant="secondary"
              text="Sign up with Email"
              rightImg={
                <ArrowDown2 variant="Outline" size={16} color="#011F0F" />
              }
              onClick={() => setOpen(true)}
            />
          ) : (
            <form className="flex flex-col gap-y-3">
              <FormGroup label="What's your name?">
                <InputField
                  type="text"
                  placeholder="Full Name"
                  leftIcon={
                    <InputIcon>
                      <User size={16} color="#001010" variant="Bold" />
                    </InputIcon>
                  }
                />
              </FormGroup>
              <FormGroup label="Drop your email here">
                <InputField
                  type="email"
                  placeholder="e.g. newman@gmail.com"
                  leftIcon={
                    <InputIcon>
                      <Sms size={16} color="#001010" variant="Bold" />
                    </InputIcon>
                  }
                />
              </FormGroup>
              <FormGroup label="Create a password">
                <PasswordField />
              </FormGroup>
              {/* Alert message goes here */}
              <TextButton
                text="Let's gooo!"
                className="min-w-[123px] mt-3 mb-2"
              />
            </form>
          )}
          <p className="text-[#001010]">
            Already have an account?{" "}
            <button
              className="text-[#866AD2] cursor-pointer"
              type="button"
              onClick={() => setActive("login")}
            >
              Login here
            </button>
          </p>
        </div>
      </div>
    </Modal.Window>
  );
}
