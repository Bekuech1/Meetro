import { useNavigate } from "react-router";
import React from "react";

function Layout({ text, children, handleClick1, handleClick2, width }) {
  const navigate = useNavigate();
  return (
    <div className='relative bg-[url("/joinToday.png")] bg-no-repeat h-screen w-full bg-cover'>
      <div className="relative h-screen flex justify-center items-center flex-col mx-4">
        <div className="flex justify-between sm:w-[450px] w-full px-5 sm:px-0 mb-10">
          <img
            src="arrow-left.svg"
            alt="left arrow"
            onClick={() => navigate(handleClick1)}
            className="cursor-pointer"
          />
          <img
            src="close-circle.svg"
            alt="cancel"
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
