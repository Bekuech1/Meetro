const Button = ({ name, color, onclick }) => {
  return (
    <button
      className={` w-fit text-[14px] rounded-[60px] capitalize px-6 py-3 paytone leading-5 font-[400] ${color} hover:bg-[#011F0F] text-[#095256] hover:text-[#AEFC40] cursor-pointer transition-all duration-300 ease-in-out`}
      onClick={onclick}
    >
      {name}
    </button>
  );
};

export default Button;
