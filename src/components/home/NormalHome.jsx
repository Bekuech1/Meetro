import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import EventsBtn from './EventsBtn';
import SiteBtn from '../Layout-conponents/SiteBtn';
import EventModal from './EventModal';

const NormalHome = () => {

    const navigate = useNavigate();


    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

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
                <section 
                    className='bg-[#FCFEF9]/50 backdrop-blur-[40px] h-fit w-full rounded-[16px] p-3 flex gap-[10px] border border-white cursor-pointer'
                    onClick={openModal}
                >

                    <img src="events-img.png" alt="" className='rounded-[8px] sm:w-[114px] sm:h-[104px] w-[70px] h-[64px]' />

                    <ul className='w-full h-fit grid sm:gap-1 gap-2'>

                        <li className='items-center flex justify-between satoshi text-black h-fit w-full sm:text-[16px] sm:font-[500] sm:leading-[100%] text-[14px] font-[700] leading-[20px]'>
                            <h4 className='w-full capitalize'>tech unwind</h4>
                            <h6 className='satoshi text-[#8A9191] h-fit sm:text-[12px] sm:font-[500] sm:leading-[14px] text-[10px] font-[500] leading-[14px] w-[40px] text-end sm:hidden grid'>12 h</h6>
                        </li>

                        <li className='flex gap-1 justify-center items-center'>
                            <h6 className='satoshi capitalize text-[#8A9191] h-fit w-fit sm:text-[12px] sm:font-[700] sm:leading-[18px] text-[10px] font-[700] leading-[10px]'>host</h6>
                            <img src="" alt="" className='w-4 h-4 rounded-2xl'/>
                            <h6 className='satoshi capitalize text-black h-fit w-full sm:text-[12px] sm:font-[500] sm:leading-[14px] text-[10px] font-[500] leading-[14px]'>chubby igboanugo</h6>
                        </li>

                        <li className='flex gap-1 justify-center items-center'>
                            <img src="" alt="" className='w-4 h-4 rounded-2xl'/>
                            <h6 className='satoshi capitalize text-[#8A9191] h-fit w-full sm:text-[12px] sm:font-[500] sm:leading-[14px] text-[10px] font-[700] leading-[14px]'>5 mabushi way, abuja</h6>
                        </li>

                        <li className='flex gap-1 justify-center items-center'>
                            <img src="" alt="" className='w-4 h-4 rounded-2xl'/>
                            <h6 className='satoshi capitalize text-[#8A9191] h-fit w-full sm:text-[12px] sm:font-[500] sm:leading-[14px] text-[10px] font-[700] leading-[14px]'>16:40 <span>pm</span></h6>
                        </li>

                        <li className='flex gap-1 justify-center items-center'>
                            <h6 className='satoshi capitalize text-[#8A9191] h-fit w-fit sm:text-[12px] sm:font-[700] sm:leading-[18px] text-[10px] font-[700] leading-[14px]'>going</h6>
                            <img src="" alt="" className='w-4 h-4 rounded-2xl'/>
                            <h6 className='satoshi capitalize text-black h-fit w-full sm:text-[12px] sm:font-[500] sm:leading-[14px] text-[10px] font-[500] leading-[14px]'>newman, victory,<span>+200 others</span></h6>
                        </li>

                        <li>
                            <SiteBtn 
                                name="manage"
                                colorPadding="bg-[#AEFC40] py-[4px] px-[16px] w-full sm:hidden "
                                onclick={() => navigate("/")}
                            />
                        </li>

                    </ul>
                    <section className='w-fit max-h-full h-[100px] justify-between sm:flex flex-col text-end hidden'>
                        <h6 className='satoshi text-[#8A9191] h-fit w-full sm:text-[12px] sm:font-[500] sm:leading-[14px] text-[20px] font-[400] leading-[30px]'>12 hours ago</h6>
                        <SiteBtn 
                            name="manage"
                            colorPadding="bg-[#AEFC40] py-[4px] px-[16px]"
                            onclick={() => navigate("/create-event")}
                        />
                    </section>
                </section>
            </section>
        </div>
        {isModalOpen && <EventModal closeModal={closeModal} />}
    </main>
  )
}

export default NormalHome