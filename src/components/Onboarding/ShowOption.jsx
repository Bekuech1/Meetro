import OnboardingButton from "./OnboardingButton";

function ShowOption({ onclick1, onclick2 }) {
  const mybtn = [
    {
      title: "Cancel onboarding",
      className:
        "bg-[#FFFFFE] px-2 text-sm w-[295px] sm:w-[200.5px] rounded-[60px] h-[36px] text-[#095256]",
      onclick: onclick1,
    },
    {
      title: "Continue onboarding",
      className:
        "bg-[#011F0F] text-[#BEFD66] px-2 text-sm w-[295px] sm:w-[200.5px] rounded-[60px] h-[36px]",
      onclick: onclick2,
    },
  ];
  return (
    <div className="fixed inset-0 h-screen flex items-center justify-center z-30 bg-[#00000080]/50 backdrop-blur-[4px]">
      <div className="bg-white/90 z-30 p-6 sm:p-12 h-[217px] sm:h-[253px] rounded-3xl w-[343px] sm:w-[546px] mx-4 relative">
        <div>
          <h2 className="text-[#4A3A74] text-[22px] leading-8 sm:text-4xl text-center paytone mb-2 sm:mb-6">
            Cancel Onboarding?
          </h2>
          <p className="text-[#4A3A74] text-sm sm:text-[16px] leading-6 text-center satoshi font-bold">
            You will lose all your progress
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 mt-6 sm:mt-12 justify-center items-center">
          {mybtn &&
            mybtn?.map((btn, ind) => <OnboardingButton {...btn} key={ind} />)}
        </div>
        <img
          src="/Vector.svg"
          alt="cancel"
          className="absolute bg-[#fffffe8b] sm:-top-7 -top-12 sm:-right-9 -right-3 block
                      size-10 p-2 rounded-3xl opacity-80 cursor-pointer"
          onClick={onclick2}
        />
      </div>
    </div>
  );
}

export default ShowOption;
