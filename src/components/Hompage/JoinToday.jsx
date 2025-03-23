import React from 'react'
import Button from '../Layout-conponents/Button'

const JoinToday = () => {
  return (
    <div  className="bg-[url('joinToday.png')] bg-cover bg-center h-screen flex justify-center">
            <div className='grid gap-12 w-fit h-fit m-auto'>
                <div className='grid gap-6 justify-center text-center w-fit h-fit'>
                    <h4 className='capitalize text-[#4A3A74] text-[36px] md:text-[60px] leading-[100%] font-[400]'>join metro today!</h4>
                    <p className='text-[14px] md:text-[16px] font-[700] leading-5 md:leading-[24px] text-[#B0B5B5]'>Start discovering exciting events in your area and never miss out.</p>
                </div>
                <div className='flex gap-4 mx-auto w-fit'>
                    <Button name="Register" color="bg-[#AFFC41]"/>
                    <Button name="Join community" color="bg-white"/>
                </div>
            </div>
    </div>
  )
}

export default JoinToday