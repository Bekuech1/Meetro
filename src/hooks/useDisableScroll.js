import { useEffect } from "react";

export const useDisableScroll = disabled => {
  useEffect(() => {
    if (disabled) {
      // Store the current scroll position
      const scrollY = window.scrollY;

      // Prevent scroll with pointer-events and a scroll listener
      const preventScroll = e => e.preventDefault();

      // Add passive: false to allow preventDefault
      document.addEventListener("wheel", preventScroll, { passive: false });
      document.addEventListener("touchmove", preventScroll, { passive: false });
      document.addEventListener("scroll", preventScroll, { passive: false });

      // Cleanup function to re-enable scrolling
      return () => {
        document.removeEventListener("wheel", preventScroll);
        document.removeEventListener("touchmove", preventScroll);
        document.removeEventListener("scroll", preventScroll);

        // Restore scroll position
        window.scrollTo(0, scrollY);
      };
    }
  }, [disabled]);
};
