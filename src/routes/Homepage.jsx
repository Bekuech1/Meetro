import Hero from "../components/Hompage/Hero"
import JoinToday from "../components/Hompage/JoinToday"
import ComingSoon from "../components/Layout-conponents/ComingSoon"
import Footer from "../components/Layout-conponents/Footer"
import FutureFeatures from "../components/Hompage/FutureFeatures"
import Seamless from "../components/Hompage/Seamless"
import React, { useState } from "react";

function Homepage() {

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // Function to open the popup
  const openPopup = () => {
    setIsPopupOpen(true);
  };

  // Function to close the popup
  const closePopup = () => {
    setIsPopupOpen(false);
  };


  return (
    <div>
        <ComingSoon />
        <Hero />
        <Seamless onClick={openPopup} />
        <FutureFeatures />
        <JoinToday />
        <Footer />
        {isPopupOpen && (
        
            <div className="fixed inset-0 h-screen flex items-center justify-center z-10">
              <div className="w-[714px] h-[466px] p-12 rounded-3xl flex flex-col justify-between bg-gray-50 backdrop-blur-[32px] text-center fix relative m-auto">
                  <div className="grid gap-8">
                      <h1 className="text-[#001010] leading-[100%] text-[48px] font-[400]">🚀 Be the First to Experience Meetro!</h1>
                      <p className="text-[#011F0F] leading-[24px] text-[16px] font-[500]">Tired of missing out on the best events? Meetro is your all-access pass to discovering and creating amazing experiences around you! 🎉</p>
                      <div className="flex flex-col items-start gap-1">
                        <label htmlFor="email" className="text-[#001010] text-[10px] leading-[14px] font-[700]">
                          Email Address
                        </label>
                        <div className="relative w-full flex gap-2">
                          <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                            <img src="smss.svg" alt="" />
                          </span>
                          <input
                            id="email"
                            type="email"
                            placeholder="e.g. newman@gmail.com"
                            className="w-full pl-10 p-[6px] border rounded-lg border-white bg-gray-100 placeholder:text-[#B0B5B5] placeholder:text-sm placeholder:font-medium placeholder:leading-5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      </div>
                  </div>
                  <button className= 'w-full text-[14px] rounded-[60px] capitalize px-6 py-3 paytone leading-5 font-[400] bg-[#011F0F] text-[#AEFC40] cursor-pointer'>submit</button>
                  <img src="closePopup.svg" alt="" className="h-12 w-12 absolute -top-14 left-full cursor-pointer" onClick={closePopup}/>
              </div>
            </div>
        )}
    </div>
  )
}

export default Homepage
