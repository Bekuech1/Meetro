import React from 'react';
import Spline from '@splinetool/react-spline';

const SplineComponent = () => {
  return (
    <div className='fix md:w-[660px] md:h-[562px] w-[90%] h-[300px]'>
      <Spline
        scene="https://prod.spline.design/qaJYAozdDsMpJmdo/scene.splinecode"
        className="w-[660px] h-[562px] md:w-[90%] md:h-[300px]"
      />
    </div>
  );
};

export default SplineComponent;

