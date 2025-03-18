import Button from "../Layout-conponents/Button"
import Navbar from "./Navbar"

const Hero = () => {
  return (
    <div className="bg-[url('meetroHero.png')] bg-cover bg-center h-screen">

        <Navbar />

        <div className="h-fit grid justify-center items-center w-[91.4%] md:w-[687px] mx-auto mt-[49vh] gap-10">
          <div className="md:hidden block bg-transparent small text-center paytone py-2"> 
            <span className="font-extrabold pr-2">Meetro App</span>
            <button className=" bg-linear-to-tr from-[#AFFC41] to-lime-900 rounded-lg py-0.5 px-3 font-semibold text-white ">Coming Soon</button> 
          </div>
          <div>
            <h1 className="capitalize text-[60px] font-[400] text-white text-center leading-[100%] md:leading-14">Never Miss an <span className="text-[#AFFC41] paytone">Event</span> Around You Again</h1>
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
