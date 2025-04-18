import React from 'react'
import EventsBtn from './EventsBtn';
import SiteBtn from '../Layout-conponents/SiteBtn';

const NormalHome = () => {

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
          style: 'md:flex hidden',
        },
      ];
    
  return (
    <main className='bg-gradient-to-r from-[#FFF5FA] to-[#F8E8F0] min-h-[90vh] h-fit w-full grid gap-[43px] px-20 py-10'>
        <div className='grid md:w-[680px] w-full mx-auto gap-6 h-fit'>
            <section className='h-fit w-full justify-between flex items-center'>
                <h1 className='paytone capitalize text-[#055962] h-fit sm:text-[30px] sm:font-[400] sm:leading-[38px] text-[20px] font-[400] leading-[30px]'>
                    my events
                </h1>
                <div className='flex gap-4 justify-end w-fit h-fit'> 
                {homeBtn.map((item, index) => (
                  <EventsBtn 
                    key={index}
                    onClick={item.onClick} 
                    image={item.image}
                    text={item.text}
                    style={item.style}
                  />
                ))}
                </div>
            </section>
            <section className='grid gap-4 h-fit w-full'>
                <div className='w-full h-fit grid'>
                    <h5 className='satoshi capitalize text-black h-fit text-[16px] font-[900] leading-[24px]'>mar 1</h5>
                    <p className='satoshi capitalize text-[#8A9191] h-fit text-[14px] font-[700] leading-[20px]'>saturday</p>
                </div>
                <section className='bg-[#FCFEF9]/50 backdrop-blur-[40px] h-fit w-full rounded-[16px] p-3 flex gap-[10px] border border-white'>

                    <img src="events-img.png" alt="" className='rounded-[8px] w-[114px] h-[104px]' />

                    <ul className='w-full h-fit grid gap-1'>

                        <li className='satoshi capitalize text-black h-fit w-full sm:text-[16px] sm:font-[500] sm:leading-[100%] text-[20px] font-[400] leading-[30px]'>tech unwind</li>

                        <li className='flex gap-1 justify-center items-center'>
                            <h6 className='satoshi capitalize text-[#8A9191] h-fit w-fit sm:text-[12px] sm:font-[700] sm:leading-[18px] text-[20px] font-[400] leading-[30px]'>host</h6>
                            <img src="" alt="" className='w-4 h-4 rounded-2xl'/>
                            <h6 className='satoshi capitalize text-black h-fit w-full sm:text-[12px] sm:font-[500] sm:leading-[14px] text-[20px] font-[400] leading-[30px]'>chubby igboanugo</h6>
                        </li>

                        <li className='flex gap-1 justify-center items-center'>
                            <img src="" alt="" className='w-4 h-4 rounded-2xl'/>
                            <h6 className='satoshi capitalize text-[#8A9191] h-fit w-full sm:text-[12px] sm:font-[500] sm:leading-[14px] text-[20px] font-[400] leading-[30px]'>5 mabushi way, abuja</h6>
                        </li>

                        <li className='flex gap-1 justify-center items-center'>
                            <img src="" alt="" className='w-4 h-4 rounded-2xl'/>
                            <h6 className='satoshi capitalize text-[#8A9191] h-fit w-full sm:text-[12px] sm:font-[500] sm:leading-[14px] text-[20px] font-[400] leading-[30px]'>16:40 <span>pm</span></h6>
                        </li>

                        <li className='flex gap-1 justify-center items-center'>
                            <h6 className='satoshi capitalize text-[#8A9191] h-fit w-fit sm:text-[12px] sm:font-[700] sm:leading-[18px] text-[20px] font-[400] leading-[30px]'>going</h6>
                            <img src="" alt="" className='w-4 h-4 rounded-2xl'/>
                            <h6 className='satoshi capitalize text-black h-fit w-full sm:text-[12px] sm:font-[500] sm:leading-[14px] text-[20px] font-[400] leading-[30px]'>newman, victory,<span>+200 others</span></h6>
                        </li>

                    </ul>
                    <section className='w-fit max-h-full h-[100px] justify-between flex flex-col text-end'>
                        <h6 className='satoshi text-[#8A9191] h-fit w-full sm:text-[12px] sm:font-[500] sm:leading-[14px] text-[20px] font-[400] leading-[30px]'>12 hours ago</h6>
                        <SiteBtn 
                            name="manage"
                            colorPadding="bg-[#AEFC40] py-[10px] px-[16px]"
                            onclick={() => navigate("/create-event")}
                        />
                    </section>
                </section>
            </section>
        </div>
    </main>
  )
}

export default NormalHome