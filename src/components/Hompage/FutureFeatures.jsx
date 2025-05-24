import React, { useState, useEffect, useRef } from "react";
import Button from "../Layout-conponents/Button";
import SplineComponent from "../Layout-conponents/SplineComp";

const FutureFeatures = ({ onclick }) => {
  const [shouldLoadIframe, setShouldLoadIframe] = useState(false);
  const iframeContainerRef = useRef(null);
  
  useEffect(() => {
    // Wait for the window load event which fires when all resources have loaded
    const handleAllContentLoaded = () => {
      // Check if the iframe container is in viewport
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            // Set a small delay to ensure UI is responsive after main content load
            setTimeout(() => setShouldLoadIframe(true), 100);
            observer.disconnect();
          }
        },
        { threshold: 0.1 }
      );

      if (iframeContainerRef.current) {
        observer.observe(iframeContainerRef.current);
      }
    };

    // If document is already loaded, execute immediately
    if (document.readyState === 'complete') {
      handleAllContentLoaded();
    } else {
      // Otherwise wait for the load event
      window.addEventListener('load', handleAllContentLoaded);
    }

    return () => {
      window.removeEventListener('load', handleAllContentLoaded);
      // Clean up the observer if it exists
      const observer = new IntersectionObserver(() => {});
      if (iframeContainerRef.current) {
        observer.disconnect();
      }
    };
  }, []);

  const featureItems = [
    "Discover local events",
    "Match with people attending",
    "Join communities you vibe with",
    "Create public events & grow your tribe"
  ];

  return (
    <div className="bg-[#F3F0FB] xl:h-screen h-fit flex flex-col-reverse justify-center gap-[60px] items-center py-12 xl:flex-row">
      <div 
        ref={iframeContainerRef}
        className="relative md:w-[666px] md:h-[562px] w-[90%] h-[300px] md:overflow-hidden overflow-visible flex justify-center items-center mx-auto md:mx-0 pointer-events-none"
      >
        {shouldLoadIframe ? (
          <iframe
            src="https://my.spline.design/untitled-be2bbd8ec37ca2b1a1125ad742bd52aa/"
            frameBorder="0"
            width="125%"
            height="125%"
            loading="lazy"
            title="Future Features Spline Animation"
            className="transition-opacity duration-500"
            onLoad={() => {
              console.log("Iframe loaded");
            }}
          ></iframe>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-[#F3F0FB]">
            <div className="animate-pulse text-[#4A3A74] flex flex-col items-center">
              <svg className="w-12 h-12 mb-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
              </svg>
              <span>Loading 3D model...</span>
              <span className="text-sm mt-1 text-[#4A3A7A]">Waiting for page content to finish loading</span>
            </div>
          </div>
        )}
      </div>

      <div className="grid gap-12 xl:w-fit w-[90%] mx-auto xl:mx-0">
        <div className="grid gap-6">
          <button className="bg-linear-to-tr from-[#97DC37] to-[#055962] rounded-[60px] py-[12px] px-[24px] font-[400] text-white text-[14px] leading-5 h-fit w-fit paytone">
            Coming Soon
          </button>
          <h5 className="capitalize text-[60px] font-[400] leading-[100%] text-[#4A3A74] paytone">
            future features
          </h5>
          <div className="grid gap-2">
            <div className="flex gap-2">
              <h6 className="font-[700] text-[16px] leading-6 text-[#4A3A7A] satoshi">
                Soon, you'll be able to:
              </h6>
            </div>
            
            {featureItems.map((item, index) => (
              <div key={index} className="flex gap-2">
                <img src="tick-square.svg" alt="" loading="lazy" />
                <h6 className="font-[700] text-[16px] leading-6 text-[#4A3A7A] satoshi">
                  {item}
                </h6>
              </div>
            ))}
          </div>
        </div>
        
        <div className="grid gap-4">
          <h6 className="font-[700] text-[16px] leading-6 text-black satoshi">
            Stay tuned for more exciting updates!
          </h6>
          <div className="flex gap-4 w-fit">
            <Button
              name="Join Waitlist"
              color="bg-[#AFFC41]"
              onclick={onclick}
            />
            <a
              href="https://chat.whatsapp.com/FLUaeqHc6oAIXNJeHilDhQ"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button name="Join Community" color="bg-white" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FutureFeatures;