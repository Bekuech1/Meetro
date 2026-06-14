import { useEffect, useRef } from "react";


export const useDisableScroll = (disabled = true) => {
  const scrollYRef = useRef(0);

  useEffect(() => {
    if (!disabled) return;

    scrollYRef.current = window.scrollY;

    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = `${scrollbarWidth}px`;

    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
      window.scrollTo(0, scrollYRef.current);
    };
  }, [disabled]);
};