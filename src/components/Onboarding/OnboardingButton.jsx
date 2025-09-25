import LoadingSpinner from "../Layout-conponents/LoadingSpinner";

function OnboardingButton({ title, onclick, className, type, isLoading }) {
  return (
    <button
      className={`paytone text-sm rounded-[60px] ${className} hover:bg-[#BEFD66] hover:text-[#095256]`}
      onClick={onclick}
      type={type}
      disabled={isLoading}
    >
      {isLoading ? (
        <LoadingSpinner color="border-[#BEFD66]" />
      ) : typeof title === "string" ? (
        title
      ) : (
        <span className="flex justify-center gap-3 text-center items-center">
          {title?.txt}
          {title?.icon}
        </span>
      )}
    </button>
  );
}

export default OnboardingButton;
