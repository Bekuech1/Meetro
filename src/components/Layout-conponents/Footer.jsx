import React from 'react'
import Button from './Button'

const Footer = () => {
  return (
    <div className='bg-[#01160B] md:px-[60px] px-4 py-[64px]'>
        <div className='grid md:flex border-b border-white/10 pb-10 gap-[40px] md:justify-between'>
            <div className='grid gap-6 h-fit w-fit mx-auto md:mx-0'>
                <img src="meetroLogo.svg" alt="" className='mx-auto md:mx-0' />
                <a 
                    href="http://" 
                    className='font-[500] md:text-[18px] md:leading-[28px] text-[14px] leading-5 text-[#B0B5B5]'
                >
                    support@Meetro.com</a>
            </div>
            <div className='w-fit h-fit flex gap-4 mx-auto md:mx-0'>
                <Button name="Discover" color="bg-[#AFFC41]"/>
                <Button name="Join waitlist" color="bg-white"/>
            </div>
        </div>
        <div className='grid md:flex md:justify-between py-10 gap-6'>
            <p className='md:text-[14px] font-[500] md:leading-[20px] text-[10px] leading-[14px] text-[#B0B5B5] mx-auto md:mx-0'>© 2024 Meetro All rights reserved</p>
            <div className='flex md:gap-6 gap-2 mx-auto md:mx-0'>
                <p className='md:text-[14px] font-[500] md:leading-[20px] text-[10px] leading-[14px] text-[#B0B5B5] capitalize'>Terms of service</p>
                <p className='md:text-[14px] font-[500] md:leading-[20px] text-[10px] leading-[14px] text-[#B0B5B5] capitalize'>privacy policy</p>
                <p className='md:text-[14px] font-[500] md:leading-[20px] text-[10px] leading-[14px] text-[#B0B5B5] capitalize'>data policy</p>
                <p className='md:text-[14px] font-[500] md:leading-[20px] text-[10px] leading-[14px] text-[#B0B5B5] capitalize'>cookies</p>
            </div>
        </div>
        <img src="meetroFooter.svg" alt="" className='w-full' />
    </div>
  )
}

export default Footer