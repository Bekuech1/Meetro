import React from "react";

const LoadingSpinner = ({ size = 16, color, speed = "0.7s" }) => {
  const spinnerSize = `${size}px`;

  return (
    <div className="flex items-center justify-center">
      <div
        className={`border-2 border-t-transparent ${color} rounded-full animate-spin`}
        style={{
          width: spinnerSize,
          height: spinnerSize,
          animationDuration: speed,
        }}
      ></div>
    </div>
  );
};

export default LoadingSpinner;
