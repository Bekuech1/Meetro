import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { IoMail } from "react-icons/io5";
import { useNavigate } from "react-router";
import Layout from "../../components/Onboarding/Layout";
import Text from "../../components/Onboarding/Text";
import OnboardingButton from "../../components/Onboarding/OnboardingButton";
import ShowOption from "@/components/Onboarding/ShowOption";
import GoogleAuth from "@/components/Onboarding/GoogleAuth";

function Signup() {
  const navigate = useNavigate();
  const text = "Join the Meetro in seconds!";
  const [showOptions, setShowOptions] = useState(false);

  const buttons = [
    // {
    //   title: {
    //     txt: "Continue with Google",
    //     icon: <FcGoogle />,
    //   },
    //   className: "w-[343px] sm:w-[312px] h-[36px] bg-white text-[#095256] px-6",
    // },
    {
      title: {
        txt: "Continue with Email",
        icon: <IoMail />,
      },
      onclick: () => navigate("/sign"),
      className:
        "w-[343px] sm:w-[312px] h-[36px] bg-[#AFFC41] text-[#095256] px-6",
    },
  ];
  return (
    <div>
      <div>
        <Layout
          text={text}
          width={"w-[255px] sm:w-[450px]"}
          handleClick1="/authentication"
          handleClick2={() => setShowOptions(true)}>
          <div className="flex flex-col gap-4">
            <GoogleAuth />
            {buttons.map((btn, index) => (
              <OnboardingButton key={index} {...btn} />
            ))}
          </div>
          <Text path={"/login"} />
          <h6 className="absolute bottom-2 left-0 text-xs sm:text-sm text-center w-full font-normal tracking-wide ">
            <span className="text-[#8A9191] ">
              By signing up, you agree to our{" "}
            </span>
            Terms & Conditions <span className="text-[#8A9191] ">and </span>
            Privacy Policy.
          </h6>
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

export default Signup;
