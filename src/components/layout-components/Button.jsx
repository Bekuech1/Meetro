import { twMerge } from "tailwind-merge";

const Button = ({ name, color, onClick, className }) => {
  return (
    <button
      className={twMerge(
        `w-fit text-[14px] rounded-[60px] capitalize sm:px-6 px-[10px] py-3 paytone leading-5 font-[400] ${color} hover:bg-[#011F0F] text-[#011F0F] hover:text-[#AEFC40] cursor-pointer transition-all duration-300 ease-in-out z-5`,
        className && className
      )}
      onClick={onClick}
    >
      {name}
    </button>
  );
};

export default Button;
