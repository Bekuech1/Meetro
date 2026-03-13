import { useEffect, useRef } from "react";

export const useDisableScroll = (disabled = true) => {
  const scrollYRef = useRef(0);

  useEffect(() => {
    if (disabled) {
      // Store current scroll position
      scrollYRef.current = window.scrollY;

      // Prevent scrolling by setting overflow hidden
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";

      // Also prevent wheel and touch events as backup
      const preventDefault = e => e.preventDefault();

      // Add listeners with passive: false to allow preventDefault
      document.addEventListener("wheel", preventDefault, { passive: false });
      document.addEventListener("touchmove", preventDefault, {
        passive: false,
      });

      return () => {
        // Remove listeners
        document.removeEventListener("wheel", preventDefault);
        document.removeEventListener("touchmove", preventDefault);

        // Restore overflow
        document.body.style.overflow = "";
        document.documentElement.style.overflow = "";

        // Restore scroll position
        window.scrollTo(0, scrollYRef.current);
      };
    } else {
      // If disabled becomes false, clean up immediately
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }
  }, [disabled]);
};
