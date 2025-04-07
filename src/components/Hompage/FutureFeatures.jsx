import React from 'react'
import Button from '../Layout-conponents/Button'
import SplineComponent from '../Layout-conponents/SplineComp'

const FutureFeatures = ({ onClick }) => {
  return (
    <div className='bg-[#F3F0FB] xl:h-screen h-fit flex flex-col-reverse justify-center gap-[60px] items-center py-12 xl:flex-row'>
        <div className='relative md:w-[666px] md:h-[562px] w-[90%] h-[300px] md:overflow-hidden overflow-visible flex justify-center items-center pointer-events-none mx-auto md:mx-0'>
                <iframe
                    src="https://my.spline.design/untitled-be2bbd8ec37ca2b1a1125ad742bd52aa/"
                    frameBorder="0"
                    width='125%'
                    height='125%'
                ></iframe>
        </div>
        {/* <SplineComponent /> */}
        <div className='grid gap-12 xl:w-fit w-[90%] mx-auto xl:mx-0'>
            <div className='grid gap-6'>
                <button className=" bg-linear-to-tr from-[#97DC37] to-[#055962] rounded-[60px] py-[12px] px-[24px] font-[400] text-white text-[14px] leading-5 h-fit w-fit">Coming Soon</button>
                <h5 className='capitalize text-[60px] font-[400] leading-[100%] text-[#4A3A74]'>future features</h5>
                <div className='grid gap-2'>
                    <div className='flex gap-2'>
                        <img src="tick-square.svg" alt=""/>
                        <h6 className='font-[700] text-[16px] leading-6 text-[#4A3A7A]'>Join Communities: <span className='font-[500] text-[#8A9191]'>Find and engage with like-minded people.</span></h6>
                    </div>
                    <div className='flex gap-2'>
                        <img src="tick-square.svg" alt="" />
                        <h6 className='font-[700] text-[16px] leading-6 text-[#4A3A7A]'>Match & Connect: <span className='font-[500] text-[#8A9191]'>Meet others attending the same events.</span></h6>
                    </div>
                </div>
            </div>
            <div className='grid gap-4'>
                <h6 className='font-[700] text-[16px] leading-6 text-black'>Stay tuned for more exciting updates!</h6>
                <div className='flex gap-4 w-fit'>
                    <Button name="Join Waitlist" color="bg-[#AFFC41]" onClick={onClick}/>
                    <Button name="join community" color="bg-white" />
                </div>
            </div>
        </div>
    </div>
  )
}

export default FutureFeatures