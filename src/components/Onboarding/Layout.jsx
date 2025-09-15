import { useNavigate } from "react-router";
import React from "react";

function Layout({ text, children, handleClick2, width }) {
  const navigate = useNavigate();

  return (
    <div className="relative h-screen w-full">
      <div
        className="absolute inset-0 bg-no-repeat bg-cover"
        style={{ backgroundImage: 'url("/joinToday.png")' }}
      />

      {/* Content */}
      <div className="relative h-screen flex flex-col justify-center items-center mx-4 z-10">
        <div className="flex justify-between sm:w-[450px] w-full px-5 sm:px-0 mb-10">
          <img
            src="/arrow-left.svg"
            alt="Back"
            onClick={() => navigate(-1)}
            className="cursor-pointer"
          />
          <img
            src="/close-circle.svg"
            alt="Close"
            onClick={handleClick2}
            className="cursor-pointer"
          />
        </div>

        <h2
          className={`text-[#4A3A74] paytone text-2xl sm:text-4xl leading-8 sm:leading-11 font-normal text-center mb-12 ${width}`}
        >
          {text}
        </h2>

        <div>{children}</div>
      </div>
    </div>
  );
}

export default Layout;
