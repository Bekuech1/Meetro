import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";
import Hero from "../components/Hompage/Hero";
import JoinToday from "../components/Hompage/JoinToday";
import Footer from "../components/Layout-conponents/Footer";
import FutureFeatures from "../components/Hompage/FutureFeatures";
import Seamless from "../components/Hompage/Seamless";
import Navbar from "../components/Hompage/Navbar";
import Popup from "../components/Hompage/PopUp";

function Homepage() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [firstName, setFirstName] = useState(""); // First name state
  const [lastName, setLastName] = useState(""); // Last name state
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorText, setErrorText] = useState("");

  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location.hash]);

  const openPopup = useCallback(() => {
    setIsPopupOpen(true);
    setIsSuccess(false);
    setFirstName("");
    setLastName("");
    setEmail("");
    setErrorText("");
  }, []);

  const closePopup = useCallback(() => {
    setIsPopupOpen(false);
    setFirstName("");
    setLastName("");
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

  const handleSubmit = async () => {
    if (
      !firstName.trim() || 
      !lastName.trim() || 
      !email.trim() || 
      !validateEmail(email)
    ) {
      setErrorText("Please fill in all fields with valid information.");
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("firstName", firstName.trim());
      formData.append("lastName", lastName.trim());
      formData.append("email", email.trim());

      await fetch(
        "https://script.google.com/macros/s/AKfycby_CaXmx7uMsRCct59wYaPAtoiYkyq2Y_N9fDN3C6h1hFOfwEA2eFBJUwSw4nVZ79W0/exec",
        {
          method: "POST",
          body: formData,
        }
      );
      

      setIsSuccess(true);
      setFirstName("");
      setLastName("");
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
      <Footer onclick={openPopup}/>

      {/* Popup */}
      <Popup
        isOpen={isPopupOpen}
        isSuccess={isSuccess}
        email={email}
        setEmail={setEmail}
        firstName={firstName}
        setFirstName={setFirstName}
        lastName={lastName}
        setLastName={setLastName}
        handleSubmit={handleSubmit}
        closePopup={closePopup}
        isSubmitting={isSubmitting}
        errorText={errorText}
      />
    </div>
  );
}

export default Homepage;
