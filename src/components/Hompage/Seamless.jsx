import React from 'react'
import Button from '../Layout-conponents/Button'
import SeamlessAni from '../Layout-conponents/SeamlessAni'

const Seamless = ( {onClick} ) => {
  return (
    <div className='bg-[#E6F2F3] xl:h-screen h-fit xl:flex grid justify-center gap-[60px] items-center py-12'>
        <div className='grid gap-12 xl:w-[45%] w-[90%] mx-auto xl:mx-0 max-w-[500px]'>
            <div className='grid gap-6'>
                <h5 className='capitalize text-[36px] md:text-[60px] font-[400] leading-[100%] text-[#055962]  w-fit lg:w-[560px]'>seamless event planning</h5>
                <div className='grid gap-2 w-fit'>
                    <div className='flex gap-2 w-fit'>
                        <img src="tick-squareblue.svg" />
                        <h6 className='font-[700] text-[14px] md:text-[16px] leading-6 text-[#055962]'>Add to Calender: <span className='font-[500] text-[#8A9191]'>Save events to your personal calender.</span></h6>
                    </div>
                    <div className='flex gap-2 w-fit'>
                        <img src="tick-squareblue.svg"/>
                        <h6 className='font-[700] text-[14px] md:text-[16px] leading-6 text-[#055962]'>Get Event Reminders: <span className='font-[500] text-[#8A9191]'>Never forget an event with timely notifications.</span></h6>
                    </div>
                    <div className='flex gap-2 w-fit'>
                        <img src="tick-squareblue.svg" alt="" />
                        <h6 className='font-[700] text-[14px] md:text-[16px] leading-6 text-[#055962]'>Location-Based Suggestions: <span className='font-[500] text-[#8A9191]'>Find events happening near you.</span></h6>
                    </div>
                </div>
            </div>
            <div className='flex gap-4 w-fit'>
                <Button name="Join Waitlist" color="bg-[#AFFC41]" onClick={onClick}/>
                <Button name="join community" color="bg-white"/>
            </div>
        </div>
        <div>
            <SeamlessAni />
        </div>
        


    </div>
  )
}


export default Seamless