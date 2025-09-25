import React, { useEffect, useRef, useState } from "react";
import Button from "../Layout-components/Button";

const Simple = ({ onClick }) => {
  const videoRef = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const node = videoRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      { root: null, rootMargin: "200px", threshold: 0.01 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-[#291A55] xl:h-screen h-fit flex flex-col justify-center gap-[60px] items-center py-12">
      <div className="md:w-fit w-[90%] h-fit gap-12 flex flex-col justify-center">
        <div className="flex flex-col gap-6 w-fit h-fit justify-center text-center">
          <h1 className="paytone md:text-[60px] text-[40px] leading-none text-white font-[400] capitalize">
            it's this simple.
          </h1>
          <p className="satoshi text-[16px] leading-6 text-[#D9D1F1] font-[700]">
            Watch how easy it is to create an event, invite friends, and get the
            party rolling.
          </p>
        </div>
        <div className="flex justify-center">
          <Button name="try it out" color="bg-white" onclick={onClick} />
        </div>
      </div>
      <video
        ref={videoRef}
        src={isInView ? "/meetro-new.mp4" : undefined}
        className="lg:w-[750px] lg:h-[435px] sm:w-[580px] sm:h-[380px] w-[90%] h-[265px] rounded-4xl"
        autoPlay
        loop
        playsInline
        muted
        preload="metadata"
        poster="/video-placeholder.png"
        style={{ objectFit: "cover" }}
      />
    </div>
  );
};

export default Simple;
