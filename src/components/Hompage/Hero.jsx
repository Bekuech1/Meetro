import Button from "../Layout-conponents/Button"
import Navbar from "./Navbar"

const Hero = () => {
  return (
    <div className="bg-[url('meetroHero.png')] bg-cover bg-center h-screen">

        <Navbar />

        <div className="h-fit grid justify-center items-center w-[91.4%] md:w-[687px] mx-auto mt-[49vh] md:mt-[40vh] gap-10"> 
           <div className="grid gap-[10px]">
                <div className="bg-white/10 backdrop-blur-[24px] flex paytone items-center justify-center gap-[10px] md:hidden fix px-3 py-[6px] w-fit mx-auto"> 
                    <img src='mobile.svg' alt="phone" className="inline-block" />
                    <p className="font-[400] text-[12px] text-white">Meetro App</p>
                    <button className=" bg-linear-to-tr from-[#97DC37] to-[#055962] rounded-[60px] py-[6px] px-[10px] font-[400] text-white text-[8px] h-fit">Coming Soon</button> 
                </div> 
                <div>
                  <h1 className="capitalize text-[48px] md:text-[60px] font-[400] text-white text-center leading-[48px] md:leading-[100%]">Never Miss an <span className="text-[#AFFC41] paytone">Event</span> Around You Again</h1>
                </div>
           </div>
           <div className="hidden md:flex gap-4 w-fit mx-auto">
                <Button name="Create Event" color="bg-white"/>
                <Button name="Discover Events" color="bg-[#AFFC41]"/>
            </div>
           <div className="md:hidden inline-flex gap-4 mx-auto">
                <Button name="Join Community" color="bg-white"/>
                <Button name="Discover" color="bg-[#AFFC41]"/>
            </div>
        </div>
    </div>    
    
  )
}

export default Hero
