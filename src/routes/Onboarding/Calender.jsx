import { useNavigate } from "react-router";
import { useState } from "react";
import Layout from "../../components/Onboarding/Layout";
import OnboardingButton from "../../components/Onboarding/OnboardingButton";
import ShowOption from "@/components/Onboarding/ShowOption";

function Calender() {
  const navigate = useNavigate();
  const text = "Sync Your Calendar (Optional, but Super Handy!)";
  const img = <img src="Social.png" alt="google-mail" className="pl-2" />;
  const [showOptions, setShowOptions] = useState(false);
  const buttons = [
    {
      title: "Skip for Now",
      className: "bg-white px-6 sm:w-[148px] w-[163.5] h-[36px] text-[#095256]",
      onclick: () => navigate("/home"),
    },
    {
      title: {
        txt: "Sync Gmail",
        icon: img,
      },
      className:
        "bg-[#AFFC41] text-[#095256] px-6 sm:w-[168px] w-[163.5] h-[36px]",
    },
  ];
  return (
    <div>
      <div>
        <Layout
          text={text}
          width={"sm:w-[450px] w-[255px]"}
          handleClick1="/sign"
          handleClick2={() => setShowOptions(true)}>
          <div className="flex justify-between sm:gap-4">
            {buttons.map((btn, index) => (
              <OnboardingButton key={index} {...btn} />
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
    </div>
  );
}

export default Calender;
