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
      onclick: () => navigate("/signup"),
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
        width={"w-[343px] sm:w-[450px]"}>
        <div className="flex gap-5">
          {buttons.map((btn, index) => (
            <OnboardingButton {...btn} key={index} />
          ))}
        </div>
      </Layout>
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
