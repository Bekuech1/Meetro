import React from 'react'

const EventsBtn = ( { onClick, image, text, style } ) => {
  return (
        <div 
          className={`w-[144px] h-fit bg-white rounded-[32px] flex gap-[2px] py-[10px] px-4 justify-center items-center cursor-pointer ${style}`}
          onClick={onClick}
        >
          <h6 className='satoshi sm:font-[700] font-[500] sm:text-[14px] text-[10px] sm:leading-[20px] leading-[14px] text-[#866AD2] capitalize w-fit h-fit'>{text}</h6>
          <img src={image} alt="" />
        </div>
  )
}

export default EventsBtn