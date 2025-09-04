import { useNavigate } from "react-router";
import { useState } from "react";
import Layout from "../../components/Onboarding/Layout";
import OnboardingButton from "../../components/Onboarding/OnboardingButton";
import ShowOption from "@/components/Onboarding/ShowOption";

function Authentication() {
  const navigate = useNavigate();
  const text = "Hey there! Ready to explore amazing events around you?";
  const [showOptions, setShowOptions] = useState(false);

  const buttons = [
    {
      title: "Log In",
      onclick: () => navigate("/login"),
      className:
        "sm:w-[91px] w-[163.5px] h-[34px] text-center rounded-[60px] bg-white text-[#095256] px-6",
    },
    {
      title: "Register",
      onclick: () => navigate("/register"),
      className:
        "sm:w-[107px] h-[34px] w-[163.5px] bg-[#011F0F] rounded-[60px] text-[#BEFD66] px-6",
    },
  ];

  return (
    <div className="relative">
      <Layout
        text={text}
        handleClick1="/"
        handleClick2={() => setShowOptions(true)}
        width={"w-[343px] sm:w-[450px]"}
      >
        <div className="flex gap-5">
          {buttons.map((btn, index) => (
            <OnboardingButton {...btn} key={index} />
          ))}
        </div>
      </Layout>

      <h6 className="absolute bottom-2 left-0 text-xs sm:text-sm text-center w-full font-normal tracking-wide satoshi">
        <span className="text-[#8A9191] ">
          By signing up, you agree to our{" "}
        </span>
        Terms & Conditions <span className="text-[#8A9191] ">and </span>
        Privacy Policy.
      </h6>
      
      {showOptions && (
        <ShowOption
          onclick1={() => {
            setShowOptions(false);
            navigate("/");
          }}
          onclick2={() => setShowOptions(false)}
        />
      )}
    </div>
  );
}

export default Authentication;
