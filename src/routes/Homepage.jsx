import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router";
import Hero from "../components/Hompage/Hero";
import JoinToday from "../components/Hompage/JoinToday";
import ComingSoon from "../components/Layout-conponents/ComingSoon";
import Footer from "../components/Layout-conponents/Footer";
import FutureFeatures from "../components/Hompage/FutureFeatures";
import Seamless from "../components/Hompage/Seamless";
import Navbar from "../components/Hompage/Navbar";

function Homepage() {
  
  const navigate = useNavigate()

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const openPopup = useCallback(() => {
    setIsPopupOpen(true);
    setIsSuccess(false);
    setEmail("");
  }, []);

  const closePopup = useCallback(() => {
    setIsPopupOpen(false);
    setEmail("");
    setIsSuccess(false);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isPopupOpen ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [isPopupOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.getElementById("heroSection");
      if (!heroSection) return;

      const heroBottom = heroSection.getBoundingClientRect().bottom;
      setIsScrolled(heroBottom <= 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const validateEmail = (email) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email.toLowerCase());
  };

  const handleSubmit = async () => {
    if (!email || !validateEmail(email)) {
      alert("❌ Please enter a valid email address.");
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("email", email);

      await fetch(
        "https://script.google.com/macros/s/AKfycbyXi-wQGRppR3OYqB5tkYU8jXdHKCZ3TCW98FWgPeip4OKau8XAj955j1CAaLGBoUYu/exec",
        {
          method: "POST",
          body: formData,
        }
      );

      setIsSuccess(true);
      setEmail("");
    } catch (err) {
      console.error(err);
      alert("❌ Something went wrong. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`scroll-smooth relative ${isPopupOpen ? "shadow-lg" : ""}`}>
      <ComingSoon />
      <div className="top-0 sticky z-20 justify-center items-center flex">
        <Navbar
          onAuth={() => navigate('/authentication')}
          onclick={openPopup}
          absolute="absolute top-[17px]"
          typeS={isScrolled ? "bg-[#011F0F] shadow-md transition-all duration-300 ease-in-out" : "bg-white/10"}
        />
      </div>
      <Hero onclick={openPopup} />
      <Seamless onclick={openPopup} />
      <FutureFeatures onclick={openPopup} />
      <JoinToday onclick={openPopup} />
      <Footer onclick={openPopup} />

      {/* Popup */}
      {isPopupOpen && (
        <div className="fixed inset-0 h-screen flex items-center justify-center z-30 bg-[#00000080]/50 backdrop-blur-[4px]">
          <div className="md:w-[714px] w-[90%] h-[466px] p-12 rounded-3xl flex flex-col justify-between bg-gray-50 backdrop-blur-[32px] text-center relative m-auto">
            {!isSuccess ? (
              <div className="grid gap-8">
                <h1 className="paytone text-[#001010] leading-[100%] text-[32px] md:text-[48px] font-[400] Paytone">
                  🚀 Be the First to Experience Meetro!
                </h1>
                <p className="satoshi text-[#011F0F] md:leading-[24px] leading-5 text-[12px] md:text-[16px] font-[500]">
                  Tired of missing out on the best events? Meetro is your all-access pass to discovering and creating amazing experiences around you! 🎉
                </p>
                <div className="flex flex-col items-start gap-1">
                  <label htmlFor="email" className="satoshi text-[#001010] text-[10px] leading-[14px] font-[700]">
                    Email Address
                  </label>
                  <div className="relative w-full flex gap-2">
                    <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                      <img src="smss.svg" alt="email icon" />
                    </span>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. newman@gmail.com"
                      className="w-full pl-10 p-[6px] border rounded-lg border-white bg-gray-100 placeholder:text-[#B0B5B5] placeholder:text-sm placeholder:font-medium placeholder:leading-5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col justify-center items-center h-full gap-4 fix">
                <h2 className="paytone text-[#001010] leading-[100%] text-[32px] md:text-[48px] font-[400] Paytone">
                🚀 Email Submitted Successfully!
                </h2>
                <p className="satoshi text-[#011F0F] text-[14px] md:text-[16px] font-[500] max-w-[400px] Paytone">
                  Thank you for joining the waitlist. We'll keep you posted on the next big thing!
                </p>
              </div>
            )}

            {!isSuccess && (
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className={`paytone w-full md:text-[14px] text-[12px] rounded-[60px] capitalize px-6 py-3 paytone md:leading-5 leading-[16px] font-[400] ${
                  isSubmitting ? "bg-[#011F0F]/60 cursor-not-allowed" : "bg-[#011F0F] cursor-pointer"
                } text-[#AEFC40] flex items-center justify-center gap-2 transition-all`}
              >
                {isSubmitting && (
                  <svg
                    className="animate-spin h-5 w-5 text-[#AEFC40]"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    ></path>
                  </svg>
                )}
                {isSubmitting ? "" : "Submit"}
              </button>
            )}

            <img
              src="closePopup.svg"
              alt="close popup"
              className="h-12 w-12 absolute -top-14 md:left-full left-[90%] cursor-pointer"
              onClick={closePopup}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Homepage;


