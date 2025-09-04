import React, { useState, useEffect, useMemo, useRef } from "react";
import CtaButton from "../Layout-conponents/CtaButton";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";

// Optimized hook with debouncing
const useScreenSize = () => {
  const [screenSize, setScreenSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1024,
    height: typeof window !== 'undefined' ? window.innerHeight : 768,
  });

  useEffect(() => {
    let timeoutId;
    
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setScreenSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }, 100); // Debounce resize events
    };

    window.addEventListener('resize', handleResize, { passive: true });
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutId);
    };
  }, []);

  return screenSize;
};

// Memoized function to get responsive animation values
const getResponsiveAnimation = (screenWidth, cardIndex) => {
  const isMobile = screenWidth < 768;
  const isTablet = screenWidth >= 768 && screenWidth < 1024;

  // Simplified easing function for better performance
  const easeOut = [0.25, 0.46, 0.45, 0.94];

  const animations = {
    card1: {
      mobile: {
        initial: { x: 0, y: 0, scale: 0.8, opacity: 1 },
        animate: { x: 0, y: 0, scale: 1, opacity: 1 },
        transition: { duration: 0.6, delay: 1.8, ease: easeOut }
      },
      tablet: {
        initial: { x: 0, y: 0, scale: 0.9, opacity: 1 },
        animate: { x: 0, y: 0, scale: 1, opacity: 1 },
        transition: { duration: 0.7, delay: 1.8, ease: easeOut }
      },
      desktop: {
        initial: { x: 0, y: 0, opacity: 1 },
        animate: { x: 0, y: 0, opacity: 1 },
        transition: { duration: 0.8, delay: 1.8, ease: easeOut }
      }
    },
    card2: {
      mobile: {
        initial: { x: 0, y: 0, opacity: 1 },
        animate: { x: -60, y: -10, opacity: 1 },
        transition: { duration: 0.8, delay: 1.8, ease: easeOut }
      },
      tablet: {
        initial: { x: 0, y: 0, opacity: 1 },
        animate: { x: -120, y: -15, opacity: 1 },
        transition: { duration: 0.8, delay: 1.8, ease: easeOut }
      },
      desktop: {
        initial: { x: 0, y: 0, opacity: 1 },
        animate: { x: -180, y: -20, opacity: 1 },
        transition: { duration: 0.8, delay: 1.8, ease: easeOut }
      }
    },
    card3: {
      mobile: {
        initial: { x: 0, y: 0, rotate: -15, opacity: 0 },
        animate: { x: -150, y: -50, rotate: -30, opacity: 0 },
        transition: { duration: 0.6, delay: 2.0, ease: easeOut }
      },
      tablet: {
        initial: { x: 0, y: 0, rotate: -15, opacity: 1 },
        animate: { x: -200, y: -70, rotate: -30, opacity: 1 },
        transition: { duration: 0.7, delay: 1.9, ease: easeOut }
      },
      desktop: {
        initial: { x: 0, y: 0, opacity: 1 },
        animate: { x: -300, y: -110, opacity: 1 },
        transition: { duration: 0.8, delay: 1.8, ease: easeOut }
      }
    },
    card4: {
      mobile: {
        initial: { x: 0, y: 0, opacity: 1 },
        animate: { x: 60, y: -10, opacity: 1 },
        transition: { duration: 0.8, delay: 1.8, ease: easeOut }
      },
      tablet: {
        initial: { x: 0, y: 0, rotate: 5, opacity: 1 },
        animate: { x: 120, y: -15, rotate: 9.9, opacity: 1 },
        transition: { duration: 0.8, delay: 1.8, ease: easeOut }
      },
      desktop: {
        initial: { x: 0, y: 0, opacity: 1 },
        animate: { x: 180, y: -20, opacity: 1 },
        transition: { duration: 0.8, delay: 1.8, ease: easeOut }
      }
    },
    card5: {
      mobile: {
        initial: { x: 0, y: 0, rotate: 15, opacity: 0 },
        animate: { x: 150, y: -50, rotate: 30, opacity: 0 },
        transition: { duration: 0.6, delay: 2.0, ease: easeOut }
      },
      tablet: {
        initial: { x: 0, y: 0, rotate: 15, opacity: 1 },
        animate: { x: 200, y: -70, rotate: 30, opacity: 1 },
        transition: { duration: 0.7, delay: 1.9, ease: easeOut }
      },
      desktop: {
        initial: { x: 0, y: 0, opacity: 1 },
        animate: { x: 300, y: -110, opacity: 1 },
        transition: { duration: 0.8, delay: 1.8, ease: easeOut }
      }
    }
  };

  const cardKey = `card${cardIndex + 1}`;
  const animation = animations[cardKey];

  if (isMobile) return animation.mobile;
  if (isTablet) return animation.tablet;
  return animation.desktop;
};

// Optimized Card Component with memoization
const AnimatedCard = React.memo(({
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
  const animation = useMemo(() => 
    getResponsiveAnimation(screenWidth, cardIndex), 
    [screenWidth, cardIndex]
  );
  
  return (
    <motion.div
      initial={animation.initial}
      animate={animation.animate}
      transition={animation.transition}
      className={`backdrop-blur-2xl shadow-2xl bg-center flex flex-col justify-between ${customClass} border-8 border-white rounded-4xl will-change-transform`}
      style={{ 
        backgroundImage: `url(${bgImage})`,
        // GPU acceleration hints
        transform: 'translate3d(0, 0, 0)',
        backfaceVisibility: 'hidden',
      }}
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

        <div className="relative z-10">
          <h6 className={`font-[400] text-base leading-[100%] capitalize ${font}`}>
            {title}
          </h6>
          <p className="font-medium text-sm leading-5">{date}</p>
        </div>
      </div>
    </motion.div>
  );
});

AnimatedCard.displayName = 'AnimatedCard';

const Hero = () => {
  const { width: screenWidth } = useScreenSize();
  
  // Memoized animations to prevent recalculation
  const titleAnimation = useMemo(() => {
    const isMobile = screenWidth < 768;
    
    return {
      initial: { opacity: 0, scale: isMobile ? 0.8 : 0.6, y: isMobile ? 15 : 0 },
      animate: {
        opacity: 1,
        scale: 1,
        y: 0,
      },
      transition: {
        duration: isMobile ? 0.5 : 0.4,
        ease: "easeOut",
        delay: 0.6,
      }
    };
  }, [screenWidth]);

  const containerAnimation = useMemo(() => {
    const isMobile = screenWidth < 768;
    
    return {
      initial: { scale: isMobile ? 0.9 : 0.8, opacity: 0 },
      animate: { scale: 1, opacity: 1 },
      transition: {
        duration: isMobile ? 0.3 : 0.4,
        ease: "easeOut",
        delay: isMobile ? 1.2 : 1.2,
      }
    };
  }, [screenWidth]);

  const spanAnimation = useMemo(() => {
    const isMobile = screenWidth < 768;
    
    return {
      initial: { 
        opacity: 0, 
        scale: isMobile ? 0.8 : 0.6, 
        y: isMobile ? 15 : 0 
      },
      animate: {
        opacity: 1,
        scale: 1,
        y: 0,
      },
      transition: {
        duration: isMobile ? 0.5 : 0.4,
        ease: "easeOut",
        delay: 0.9,
      }
    };
  }, [screenWidth]);

  // Memoized cards data to prevent recreation
  const cards = useMemo(() => [
    {
      bgImage: "/hero-abuja.png",
      location: "Abuja",
      attendees: "+ 200",
      title: "Mad Love and Chill",
      date: "Sat, Mar 1, 16:30pm",
      customClass: "md:w-[302px] md:h-[353px] z-2 w-[220px] h-[260px]",
      font: "nico-moji",
    },
    {
      bgImage: "/hero-enugu.png",
      location: "enugu",
      attendees: "+ 150",
      title: "wedding ceremony",
      date: "Fri, Feb 28, 14:00pm",
      customClass:
        "md:w-[277px] md:h-[332px] w-[180px] h-[224px] absolute right-[30px] -rotate-[9.9deg] z-1",
      font: "times-new-roman",
    },
    {
      bgImage: "/hero-kano.png",
      location: "Kano",
      attendees: "+ 100",
      title: "tech convention",
      date: "Sun, Apr 15, 18:00pm",
      customClass: "w-[250px] h-[292px] absolute -rotate-[30deg] invisible lg:visible",
      font: "satoshi",
    },
    {
      bgImage: "/hero-enugu-r.png",
      location: "Enugu",
      attendees: "+ 50",
      title: "swim & chill with friends",
      date: "Wed, May 10, 10:00am",
      customClass: "md:w-[277px] md:h-[332px] w-[180px] h-[224px] absolute rotate-[9.9deg] z-1",
      font: "urbanist",
    },
    {
      bgImage: "/hero-ph.png",
      location: "Port Harcourt",
      attendees: "+ 300",
      title: "24th Birthday Hangout",
      date: "Sat, Jun 5, 20:00pm",
      customClass: "w-[250px] h-[292px] absolute rotate-[30deg] invisible lg:visible",
      font: "paytone",
    },
  ], []);

  return (
    <div className="relative w-full h-screen max-h-[1040px] min-h-[780px] flex items-center justify-center bg-[#FCFEF9] satoshi overflow-hidden">
      <div className="w-[1069px] h-fit flex gap-14 flex-col items-center justify-center mt-16">
        <motion.section
          className="flex items-center justify-center h-fit relative will-change-transform"
          {...containerAnimation}
        >
          {cards.map((card, index) => (
            <AnimatedCard 
              key={`${card.title}-${index}`} 
              {...card} 
              screenWidth={screenWidth}
              cardIndex={index}
            />
          ))}
        </motion.section>
        
        <div className="size-fit flex flex-col items-center justify-center gap-6">
          <motion.h1
            className="paytone text-center text-[40px] md:text-[60px] font-[400] leading-[120%] text-[#011F0F] capitalize z-10 will-change-transform"
            {...titleAnimation}
          >
            bring people together,
            <br />
            <motion.span
              className="text-[#866AD2] max-w-[90%] will-change-transform"
              {...spanAnimation}
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