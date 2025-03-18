import React from 'react'

const ComingSoon = () => {
  return (
        <div className="p-[6px] hidden md:block bg-white">
            <div className="flex paytone items-center justify-center gap-[10px]"> 
                <img src='mobile.svg' alt="phone" className="inline-block" />
                <p className="font-[400] text-[12px] text-[#011F0F]">Meetro App</p>
                <button className=" bg-linear-to-tr from-[#97DC37] to-[#055962] rounded-[60px] py-[6px] px-[10px] font-[400] text-white text-[8px] h-fit">Coming Soon</button> 
            </div>
        </div>
  )
}

export default ComingSoon