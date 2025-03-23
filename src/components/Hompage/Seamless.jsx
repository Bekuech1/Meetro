import React from 'react'
import Button from '../Layout-conponents/Button'

const Seamless = () => {
  return (
    <div className='bg-[#E6F2F3] h-screen flex justify-center gap-[60px] items-center'>
        <div className='grid gap-12'>
            <div className='grid gap-6'>
                <h5 className='capitalize text-[60px] font-[400] leading-[100%] text-[#055962]'>seamless event planning</h5>
                <div className='grid gap-2'>
                    <div className='flex gap-2'>
                        <img src="tick-squareblue.svg" alt="" />
                        <h6 className='font-[700] text-[16px] leading-6 text-[#055962]'>Add to Calender: <span className='font-[500] text-[#8A9191]'>Save events to your personal calender.</span></h6>
                    </div>
                    <div className='flex gap-2'>
                        <img src="tick-squareblue.svg" alt="" />
                        <h6 className='font-[700] text-[16px] leading-6 text-[#055962]'>Get Event Reminders: <span className='font-[500] text-[#8A9191]'>Never forget forget an event with timely notifications.</span></h6>
                    </div>
                    <div className='flex gap-2'>
                        <img src="tick-squareblue.svg" alt="" />
                        <h6 className='font-[700] text-[16px] leading-6 text-[#055962]'>Location-Based Suggestions: <span className='font-[500] text-[#8A9191]'>Find events happening near you.</span></h6>
                    </div>
                </div>
            </div>
            <div className='flex gap-4 w-fit'>
                <Button name="Join Waitlist" color="bg-[#AFFC41]"/>
                <Button name="join community" color="bg-white"/>
            </div>
        </div>
        <div className="bg-[#D0EBF3] w-[660px] rounded-4xl h-[562px] relative overflow-hidden">
          <img
            src="seamlessPpl.png"
            alt=""
            className="w-[600px] h-[532px] rounded-3xl absolute top-[30px] left-[97px] z-10"
          />
          <div
            className="w-[538.9999927315937px] h-[552.8975145168421px] rounded-[48px] absolute top-[141px] left-[319.1px] transform -rotate-15 bg-[#59A8B1] z-0"
          ></div>
        </div>

        <EventSlip />


    </div>
  )
}

const EventSlip = () => {
  return (
    <div className='w-[360px] h-[70px] rounded-2xl border border-white flex gap-[10px] p-3'></div>
  )
}


export default Seamless