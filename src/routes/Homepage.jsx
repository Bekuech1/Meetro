import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router";
import Hero from "../components/Hompage/Hero";
import JoinToday from "../components/Hompage/JoinToday";
import ComingSoon from "../components/Layout-conponents/ComingSoon";
import Footer from "../components/Layout-conponents/Footer";
import FutureFeatures from "../components/Hompage/FutureFeatures";
import Seamless from "../components/Hompage/Seamless";
import Navbar from "../components/Hompage/Navbar";
import Popup from "../components/Hompage/PopUp";

function Homepage() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorText, setErrorText] = useState("");

  const openPopup = useCallback(() => {
    setIsPopupOpen(true);
    setIsSuccess(false);
    setEmail("");
    setErrorText("");
  }, []);

  const closePopup = useCallback(() => {
    setIsPopupOpen(false);
    setEmail("");
    setIsSuccess(false);
    setErrorText("");
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

    const debounceScroll = () => setTimeout(handleScroll, 100);
    window.addEventListener("scroll", debounceScroll);

    return () => window.removeEventListener("scroll", debounceScroll);
  }, []);

  const validateEmail = (email) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email.toLowerCase());
  };

  useEffect(() => {
    if (email && !validateEmail(email)) {
      setErrorText("Invalid email format");
    } else {
      setErrorText("");
    }
  }, [email]);

  const handleSubmit = async () => {
    if (!email || !validateEmail(email)) {
      setErrorText("Please enter a valid email address");
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

  const navigate = useNavigate();

  return (
    <div className={`scroll-smooth relative ${isPopupOpen ? "shadow-lg" : ""}`}>
      <ComingSoon />
      <div className="top-0 sticky z-20 justify-center items-center flex">
        <Navbar
          onAuth={() => navigate("/authentication")}
          onclick={openPopup}
          absolute="absolute top-[17px]"
          typeS={
            isScrolled
              ? "bg-[#011F0F] shadow-md transition-all duration-300 ease-in-out"
              : "bg-white/10"
          }
        />
      </div>
      <Hero onclick={openPopup} />
      <Seamless onclick={openPopup} />
      <FutureFeatures onclick={openPopup} />
      <JoinToday onclick={openPopup} />
      <Footer onclick={openPopup} />

      {/* Popup */}
      <Popup
        isOpen={isPopupOpen}
        isSuccess={isSuccess}
        email={email}
        setEmail={setEmail}
        handleSubmit={handleSubmit}
        closePopup={closePopup}
        isSubmitting={isSubmitting}
        errorText={errorText}
      />
    </div>
  );
}

export default Homepage;
