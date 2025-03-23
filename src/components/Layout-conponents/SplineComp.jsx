import React from 'react';
import Spline from '@splinetool/react-spline';

const SplineComponent = () => {
  const handleLoad = (spline) => {
    // Disable zoom
    spline.scene.disableZoom = true;

    // Set pan limits
    const camera = spline.scene.activeCamera;
    const minX = -5;
    const maxX = 5;
    const minY = -5;
    const maxY = 5;

    spline.on('update', () => {
      if (camera.position.x < minX) camera.position.x = minX;
      if (camera.position.x > maxX) camera.position.x = maxX;
      if (camera.position.y < minY) camera.position.y = minY;
      if (camera.position.y > maxY) camera.position.y = maxY;
    });
  };

  return (
    <div className='fix w-[802px] h-[768px] absolute'>
      <Spline
        scene="https://prod.spline.design/qaJYAozdDsMpJmdo/scene.splinecode"
        onLoad={handleLoad}
      />
    </div>
  );
};

export default SplineComponent;

