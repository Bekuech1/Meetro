import React from "react";
import { motion } from "framer-motion";

const CtaButton = ({ name, onclick }) => {
  return (
    <motion.button
      className={`w-fit text-[14px] rounded-[60px] capitalize px-6 py-3 paytone leading-5 font-[400] hover:bg-[#AEFC40] bg-[#011F0F] hover:text-[#095256] text-[#AEFC40] z-10 cursor-pointer transition-all duration-300 ease-in-out`}
      onClick={onclick}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: [0, 0, 1], scale: [0.5, 1, 1] }}
      transition={{
        duration: 0.5,
        ease: "easeInOut",
        times: [0, 0.5, 1],
        delay: 0.4
      }}
      style={{ transformOrigin: "bottom" }}
    >
      {name}
    </motion.button>
  );
};

export default CtaButton;