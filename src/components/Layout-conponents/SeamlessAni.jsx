import React, { useEffect, useRef, useState } from 'react';
import animationData from './SectionAni.json';
import Lottie from 'react-lottie';

const SeamlessAni = () => {
  // Create a ref to access the Lottie animation instance
  const lottieRef = useRef(null);
  // Track if animation should be paused (when initializing)
  const [isPaused, setIsPaused] = useState(false);
  
  const defaultOptions = {
    loop: false,
    autoplay: true, // We'll keep autoplay true but control it via isPaused
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  // This function allows us to get a reference to the Lottie instance
  const handleLottieRef = (ref) => {
    lottieRef.current = ref;
  };

  // When component mounts, it's already visible (parent component ensures this)
  // so we can start the animation
  useEffect(() => {
    console.log("Lottie animation ready to play");
    // If needed, we could manually control playback here:
    // setIsPaused(false);
    
    return () => {
      // Clean up if necessary when component unmounts
      console.log("Lottie animation component unmounted");
    };
  }, []);

  return (
    <div className="flex justify-center items-center h-full w-full">
      <div
        style={{
          width: '100%',
          maxWidth: '660px',
          height: 'auto',
        }}
        className="h-[532px] sm:h-[300px] md:h-[400px] lg:h-[532px] w-full"
      >
        <Lottie 
          options={defaultOptions}
          isPaused={isPaused}
          ref={handleLottieRef}
          eventListeners={[
            {
              eventName: 'complete',
              callback: () => console.log('Lottie animation completed')
            }
          ]}
        />
      </div>
    </div>
  );
};

export default SeamlessAni;

