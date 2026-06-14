import React from "react";
import TextButton from "./Buttons/TextButtons";

// Map of illustrations (change paths as needed)
const illustrations = {
  calendar: "/signout-img.png",
  money: "/images/money.png",
  checkCalendar: "/images/check-calendar.png",
  party: "/images/party.png",
  ticket: "/images/ticket.png",
  warning: "/images/warning.png",
};

const EmptyState = ({
  title,
  description,
  illustration,
  buttonText,
  onButtonClick,
  variant = "fullscreen",
  className = "",
}) => {
  const imageSrc = illustration ? illustrations[illustration] : null;

  return (
    <div
      className={`flex flex-col items-center justify-center text-center p-6 ${
        variant === "fullscreen" ? "h-screen" : "h-[300px]"
      } ${className}`}
    >
      {imageSrc && (
        <img src={imageSrc} alt={illustration} className="w-24 h-24 mb-4" />
      )}
      <h2 className="mb-2 paytone text-2xl">{title}</h2>
      {description && (
        <p className="text-gray-600 text-sm max-w-md mb-4">{description}</p>
      )}
      {buttonText && onButtonClick && (
        <button
          onClick={onButtonClick}
          className="mt-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full transition-all mb-10"
        >
          {buttonText}
        </button>
      )}
      <TextButton leftImg={"/info-circle.svg"} rightImg={"/info-circle.svg"} text={"Button"} className="py-2"/>
    </div>
  );
};

export default EmptyState;
