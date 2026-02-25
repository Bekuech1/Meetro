import { useEffect, useId, useState } from "react";
import { twMerge } from "tailwind-merge";

const placementClasses = {
  top: "bottom-full mb-2 left-1/2 -translate-x-1/2",
  bottom: "top-full mt-2 left-1/2 -translate-x-1/2",
  left: "right-full mr-2 top-1/2 -translate-y-1/2",
  right: "left-full ml-2 top-1/2 -translate-y-1/2",
};

const arrowPlacementClasses = {
  top: "bottom-[-4px] left-1/2 -translate-x-1/2",
  bottom: "top-[-4px] left-1/2 -translate-x-1/2",
  left: "right-[-4px] top-1/2 -translate-y-1/2",
  right: "left-[-4px] top-1/2 -translate-y-1/2",
};

function Tooltip({
  content,
  children,
  placement = "bottom",
  defaultPlacement = "bottom",
  className,
  contentClassName,
  arrowClassName,
}) {
  const tooltipId = useId();
  const [isMdUp, setIsMdUp] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    const mediaQuery = window.matchMedia("(min-width: 768px)");
    const updateMatch = () => setIsMdUp(mediaQuery.matches);

    updateMatch();
    mediaQuery.addEventListener("change", updateMatch);

    return () => {
      mediaQuery.removeEventListener("change", updateMatch);
    };
  }, []);

  if (!content) {
    return children;
  }

  const activePlacement = isMdUp ? placement : defaultPlacement;
  const placementClass =
    placementClasses[activePlacement] ?? placementClasses[defaultPlacement];
  const arrowPlacementClass =
    arrowPlacementClasses[activePlacement] ??
    arrowPlacementClasses[defaultPlacement];

  return (
    <span
      className={twMerge("relative inline-flex items-center group", className)}
      aria-describedby={tooltipId}
    >
      {children}
      <span
        id={tooltipId}
        role="tooltip"
        className={twMerge(
          "pointer-events-none absolute z-50 w-max max-w-[248px] rounded-[8px] bg-[#011F0F] p-3 text-[10px] leading-[14px] font-medium satoshi text-white opacity-0 scale-95 transition-all duration-200 ease-out group-hover:opacity-100 group-hover:scale-100 group-focus-within:opacity-100 group-focus-within:scale-100",
          placementClass,
          contentClassName
        )}
      >
        <span
          aria-hidden="true"
          className={twMerge(
            "pointer-events-none absolute w-4 h-4 bg-[#011F0F] rotate-45",
            arrowPlacementClass,
            arrowClassName
          )}
        />
        {content}
      </span>
    </span>
  );
}

export default Tooltip;
