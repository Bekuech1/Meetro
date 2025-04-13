import React from 'react';
import animationData from './SectionAni.json';
import Lottie from 'react-lottie';

const SeamlessAni = () => {
  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

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
        <Lottie options={defaultOptions} />
      </div>
    </div>
  );
};

export default SeamlessAni;

