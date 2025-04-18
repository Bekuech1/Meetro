import React from 'react'
import EventsBtn from './EventsBtn';

const EmptyHome = () => {

  const homeBtn = [
    {
      text: "all events",
      image: "home-arrow-down.svg",
      onClick: () => navigate("/home"),
    },
    {
      text: "march, 2025",
      image: "home-arrow-down.svg",
      onClick: () => navigate("/home"),
    },
  ];

  return (
    <main className='bg-gradient-to-r from-[#FFF5FA] to-[#F8E8F0] flex flex-col px-20 py-10 gap-[43px] h-[90vh] max-h-[760px]'>
      <div className='flex gap-4 justify-center w-full h-fit'> 
      {homeBtn.map((item, index) => (
        <EventsBtn 
          key={index}
          onClick={item.onClick} 
          image={item.image}
          text={item.text}
        />
      ))}
      </div>
      <div className='h-full w-full flex justify-center items-center text-center'>
        <h1 className='paytone text-[#4A3A74] h-fit sm:text-[36px] sm:font-[400] sm:leading-[100%] text-[24px] font-[400] leading-[32px]'>
          Looks like there’s nothing happening<br/> right now. Why not be the first to<br/> create an event?
        </h1>
      </div>
    </main>
  )
}

export default EmptyHome