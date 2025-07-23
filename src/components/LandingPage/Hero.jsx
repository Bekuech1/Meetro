import React, { useState, useEffect } from "react";
import CtaButton from "../Layout-conponents/CtaButton";
import { motion, AnimatePresence, useMotionValue } from "framer-motion";

// Hook to get screen size
const useScreenSize = () => {
  const [screenSize, setScreenSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1024,
    height: typeof window !== 'undefined' ? window.innerHeight : 768,
  });

  useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return screenSize;
};

// Function to get responsive animation values
const getResponsiveAnimation = (screenWidth, animationType, cardIndex) => {
  const isMobile = screenWidth < 768;
  const isTablet = screenWidth >= 768 && screenWidth < 1024;
  const isDesktop = screenWidth >= 1024;

  const animations = {
    // Card 1 - Center card (Mad Love and Chill)
    card1: {
      mobile: {
        initial: { x: 0, y: 0, scale: 0.8 },
        animate: { x: 0, y: 0, scale: 1 },
        transition: { duration: 0.8, delay: 2, ease: [0.25, 0.46, 0.45, 0.94] }
      },
      tablet: {
        initial: { x: 0, y: 0, scale: 0.9 },
        animate: { x: 0, y: 0, scale: 1 },
        transition: { duration: 0.9, delay: 2, ease: [0.25, 0.46, 0.45, 0.94] }
      },
      desktop: {
        initial: { x: 0, y: 0 },
        animate: { x: 0, y: 0 },
        transition: { duration: 1, delay: 2, ease: [0.25, 0.46, 0.45, 0.94] }
      }
    },
    // Card 2 - Right side (Wedding ceremony)
    card2: {
      mobile: {
        initial: { x: 0, y: 0},
        animate: { x: -60, y: -10},
        transition: { duration: 1, delay: 2, ease: [0.25, 0.46, 0.45, 0.94] }
      },
      tablet: {
        initial: { x: 0, y: 0},
        animate: { x: -120, y: -15},
        transition: { duration: 1, delay: 2, ease: [0.25, 0.46, 0.45, 0.94] }
      },
      desktop: {
        initial: { x: 0, y: 0 },
        animate: { x: -180, y: -20 },
        transition: { duration: 1, delay: 2, ease: [0.25, 0.46, 0.45, 0.94] }
      }
    },
    // Card 3 - Far right (Tech convention)
    card3: {
      mobile: {
        initial: { x: 100, y: 0, rotate: -15, opacity: 0 },
        animate: { x: -150, y: -50, rotate: -30, opacity: 0 },
        transition: { duration: 0.8, delay: 2.4, ease: [0.25, 0.46, 0.45, 0.94] }
      },
      tablet: {
        initial: { x: 0, y: 0, rotate: -15 },
        animate: { x: -200, y: -70, rotate: -30 },
        transition: { duration: 0.9, delay: 2.2, ease: [0.25, 0.46, 0.45, 0.94] }
      },
      desktop: {
        initial: { x: 0, y: 0 },
        animate: { x: -300, y: -110 },
        transition: { duration: 1, delay: 2, ease: [0.25, 0.46, 0.45, 0.94] }
      }
    },
    // Card 4 - Left side (Swim & chill)
    card4: {
      mobile: {
        initial: { x: 0, y: 0},
        animate: { x: 60, y: -10},
        transition: { duration: 1, delay: 2, ease: [0.25, 0.46, 0.45, 0.94] }
      },
      tablet: {
        initial: { x: 0, y: 0, rotate: 5 },
        animate: { x: 120, y: -15, rotate: 9.9 },
        transition: { duration: 1, delay: 2, ease: [0.25, 0.46, 0.45, 0.94] }
      },
      desktop: {
        initial: { x: 0, y: 0 },
        animate: { x: 180, y: -20 },
        transition: { duration: 1, delay: 2, ease: [0.25, 0.46, 0.45, 0.94] }
      }
    },
    // Card 5 - Far left (Birthday Hangout)
    card5: {
      mobile: {
        initial: { x: -100, y: 0, rotate: 15, opacity: 0 },
        animate: { x: 150, y: -50, rotate: 30, opacity: 0 },
        transition: { duration: 0.8, delay: 2.4, ease: [0.25, 0.46, 0.45, 0.94] }
      },
      tablet: {
        initial: { x: 0, y: 0, rotate: 15 },
        animate: { x: 200, y: -70, rotate: 30 },
        transition: { duration: 0.9, delay: 2.2, ease: [0.25, 0.46, 0.45, 0.94] }
      },
      desktop: {
        initial: { x: 0, y: 0 },
        animate: { x: 300, y: -110 },
        transition: { duration: 1, delay: 2, ease: [0.25, 0.46, 0.45, 0.94] }
      }
    }
  };

  const cardKey = `card${cardIndex + 1}`;
  const animation = animations[cardKey];

  if (isMobile) return animation.mobile;
  if (isTablet) return animation.tablet;
  return animation.desktop;
};

// Animated Card Component
const AnimatedCard = ({
  bgImage,
  location,
  attendees,
  title,
  date,
  customClass,
  font,
  screenWidth,
  cardIndex,
}) => {
  const animation = getResponsiveAnimation(screenWidth, 'card', cardIndex);
  
  return (
    <motion.div
      key={title}
      initial={animation.initial}
      animate={animation.animate}
      transition={animation.transition}
      className={`backdrop-blur-2xl shadow-2xl bg-cover bg-center flex flex-col justify-between ${customClass} border-8 border-white rounded-4xl`}
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="flex items-center justify-between w-full h-fit p-4 bg-transparent">
        <div className="flex items-center p-1 gap-1 bg-black/40 rounded-full">
          <div className="bg-white/24 p-1 rounded-4xl size-fit">
            <img src="/location-green.svg" alt="Location" className="size-3" />
          </div>
          <h6 className="text-white satoshi font-bold text-[10px] leading-3.5 capitalize">
            {location}
          </h6>
        </div>
        <div className="flex items-center p-1 gap-1 bg-black/40 rounded-full">
          <img
            src="/v2-tinyprofile.jpg"
            alt="Profile"
            className="w-6 h-6 rounded-full border border-white"
            loading="lazy"
          />
          <h6 className="text-white satoshi font-bold text-[10px] leading-3.5 capitalize">
            {attendees}
          </h6>
        </div>
      </div>
      <div className="relative flex flex-col items-center justify-between w-full h-fit p-4 gap-2 text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20 blur-[1px] rounded-3xl"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-transparent rounded-3xl"></div>

        <div className="relative z-10">
          <h6
            className={`font-[400] text-base leading-[100%] capitalize ${font}`}
          >
            {title}
          </h6>
          <p className="font-medium text-sm leading-5">{date}</p>
        </div>
      </div>
    </motion.div>
  );
};

const Hero = () => {
  const { width: screenWidth } = useScreenSize();
  
  // Responsive title animation
  const getTitleAnimation = () => {
    const isMobile = screenWidth < 768;
    
    return {
      initial: { opacity: 0, scale: isMobile ? 0.7 : 0.5, y: isMobile ? 20 : 0 },
      animate: {
        opacity: [0, 0, 1],
        scale: [isMobile ? 0.7 : 0.5, 1, 1],
        y: [isMobile ? 20 : 0, 0, 0],
      },
      transition: {
        duration: isMobile ? 0.6 : 0.5,
        ease: "easeInOut",
        times: [0, 0.5, 1],
        delay: 0.7,
      }
    };
  };

  // Responsive container animation
  const getContainerAnimation = () => {
    const isMobile = screenWidth < 768;
    
    return {
      initial: { scale: isMobile ? 1 : 0 },
      animate: { scale: [isMobile ? 1 : 0, 1] },
      transition: {
        duration: isMobile ? 0.4 : 0.5,
        ease: "easeInOut",
        times: [0, 1],
        delay: isMobile ? 1.4 : 1.4,
      }
    };
  };

  const cards = [
    {
      bgImage: "/hero-img1.png",
      location: "Abuja",
      attendees: "+ 200",
      title: "Mad Love and Chill",
      date: "Sat, Mar 1, 16:30pm",
      customClass: "md:w-[302px] md:h-[353px] z-2 w-[220px] h-[260px]",
      font: "nico-moji",
    },
    {
      bgImage: "/hero-img5.png",
      location: "enugu",
      attendees: "+ 150",
      title: "wedding ceremony",
      date: "Fri, Feb 28, 14:00pm",
      customClass:
        "md:w-[277px] md:h-[332px] w-[180px] h-[224px] absolute right-[30px] -rotate-[9.9deg] z-1",
      font: "times-new-roman",
    },
    {
      bgImage: "/hero-img4.png",
      location: "Kano",
      attendees: "+ 100",
      title: "tech convention",
      date: "Sun, Apr 15, 18:00pm",
      customClass: "w-[250px] h-[292px] absolute -rotate-[30deg] invisible lg:visible",
      font: "satoshi",
    },
    {
      bgImage: "/hero-img3.png",
      location: "Enugu",
      attendees: "+ 50",
      title: "swim & chill with friends",
      date: "Wed, May 10, 10:00am",
      customClass: "md:w-[277px] md:h-[332px] w-[180px] h-[224px] absolute rotate-[9.9deg] z-1",
      font: "urbanist",
    },
    {
      bgImage: "/hero-img2.png",
      location: "Port Harcourt",
      attendees: "+ 300",
      title: "24th Birthday Hangout",
      date: "Sat, Jun 5, 20:00pm",
      customClass: "w-[250px] h-[292px] absolute rotate-[30deg] invisible lg:visible",
      font: "paytone",
    },
  ];

  return (
    <div className="relative w-full h-screen max-h-[1040px] min-h-[780px] flex items-center justify-center bg-[#FCFEF9] satoshi overflow-hidden">
      <div className="w-[1069px] h-fit flex gap-14 flex-col items-center justify-center">
        <motion.section
          className="flex items-center justify-center h-fit relative"
          {...getContainerAnimation()}
        >
          {cards.map((card, index) => (
            <AnimatedCard 
              key={index} 
              {...card} 
              screenWidth={screenWidth}
              cardIndex={index}
            />
          ))}
        </motion.section>
        <div className="size-fit flex flex-col items-center justify-center gap-6">
          <motion.h1
            className="paytone text-center text-[40px] md:text-[60px] font-[400] leading-[120%] text-[#011F0F] capitalize z-10"
            {...getTitleAnimation()}
          >
            bring people together,
            <br />
            <motion.span
              className="text-[#866AD2] max-w-[90%]"
              initial={{ 
                opacity: 0, 
                scale: screenWidth < 768 ? 0.7 : 0.5, 
                y: screenWidth < 768 ? 20 : 0 
              }}
              animate={{
                opacity: [0, 0, 1],
                scale: [screenWidth < 768 ? 0.7 : 0.5, 1, 1],
                y: [screenWidth < 768 ? 20 : 0, 0, 0],
              }}
              transition={{
                duration: screenWidth < 768 ? 0.6 : 0.5,
                ease: "easeIn",
                times: [0, 0.5, 1],
                delay: 1,
              }}
            >
              effortlessly.
            </motion.span>
          </motion.h1>
          <CtaButton name="create event" />
        </div>
      </div>
      <div className="absolute flex justify-between items-center w-full h-fit bg-transparent -bottom-[250px]">
        <div className="size-[345px] bg-[#AEFC40] rounded-full opacity-80 blur-[200px]"></div>
        <div className="size-[345px] bg-[#866AD2] rounded-full blur-[200px] opacity-80 mt-[100px]"></div>
        <div className="size-[345px] bg-[#077D8A] rounded-full blur-[200px] opacity-80"></div>
      </div>
    </div>
  );
};

export default Hero;