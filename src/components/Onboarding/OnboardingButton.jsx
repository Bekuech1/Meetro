function OnboardingButton({ title, onclick, className, type }) {
  return (
    <button
      className={`paytone text-sm rounded-[60px] ${className}`}
      onClick={onclick}
      type={type}
    >
      {typeof title === "string" ? (
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
