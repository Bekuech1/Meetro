import { LoadingSpinner } from "../create-event/Private";
import EventInfo from "../event-dashboard/EventInfo";
import ShareEvent from "../event-dashboard/ShareEvent";
import { createPortal } from "react-dom";
import { memo, useCallback } from "react";

const EventModal = memo(({ eventId, closeModal }) => {

  const handleCloseClick = useCallback((e) => {
    e.stopPropagation();
    closeModal();
  }, [closeModal]);

  return createPortal(
    <div 
      className="fixed inset-0 w-full h-full lg:pt-0 pt-16 lg:h-screen lg:flex lg:items-center lg:justify-center bg-black/50 md:backdrop-blur-[4px] z-[1000] overflow-auto scrollbar-hide"
    >
      <div className="flex flex-col-reverse gap-2 lg:w-fit w-full h-fit">
        <div className="lg:mx-14 mx-auto w-full md:w-fit lg:h-[85vh] lg:max-h-[670px] h-full p-4 md:p-8 md:rounded-3xl lg:flex grid gap-2 bg-[#E8E8E8] text-center lg:overflow-hidden">
         
          {/* back, share and delete icons on mobile view */}
          <div className="flex md:hidden justify-between items-center gap-2">
            <button onClick={handleCloseClick} aria-label="Close modal">
              <img src="/arrow-left.svg" alt="Back" />
            </button>

            <div className="flex gap-2 md:hidden">
              <div className="h-7 w-7 flex items-center justify-center bg-white rounded-full cursor-pointer">
                <ShareEvent eventId={eventId} className={"p-1"} />
              </div>
            </div>
          </div>

          <EventInfo eventId={eventId} />
        </div>

        {/* Close Button */}
        <img
          src="/closePopup.svg"
          alt="Close"
          className="h-12 w-12 cursor-pointer ml-auto hidden md:block"
          onClick={handleCloseClick}
        />
      </div>
    </div>,
    document.body
  );
});

export default EventModal;

// ModalText Component
export const ModalText = memo(({ img, text }) => {
  return (
    <div className="flex gap-1 items-center w-fit h-fit">
      <img src={img} alt={text} className="w-4 h-4" />
      <h6 className="text-[#8A9191] text-[16px] font-[500] leading-[24px] satoshi capitalize">
        {text}
      </h6>
    </div>
  );
});

// event categories div
export const EventCategories = memo(({ borderBgColor, text }) => {
  return (
    <div
      className={`font-[500] text-[12px] leading-[18px] bg-white capitalize border-[0.5px] p-[8px] rounded-[20px] ${borderBgColor}`}
    >
      {text}
    </div>
  );
});

export const ModalBtn = memo(({
  onClick,
  bgcolor,
  image,
  textcolor,
  text,
}) => {
  const handleClick = useCallback((e) => {
    e.stopPropagation();
    onClick?.(e);
  }, [onClick]);

  return (
    <button
      type="button"
      className={`w-full h-fit rounded-[60px] flex gap-2 p-[10px] justify-center items-center cursor-pointer hover:bg-gray-200 transition-colors duration-200 ${bgcolor}`}
      onClick={handleClick}
    >
      <img src={image} className="size-[22px]" alt="" />
      <h6
        className={`paytone sm:font-[700] font-[500] sm:text-[14px] text-[10px] sm:leading-[20px] leading-[14px] ${textcolor}`}
      >
        {text}
      </h6>
    </button>
  );
});

export const Attendance = memo(({
  img,
  text,
  textcolor,
  texthover,
  onClick,
  loading = false,
}) => {
  const handleClick = useCallback((e) => {
    e.stopPropagation();
    if (!loading && onClick) {
      onClick(e);
    }
  }, [loading, onClick]);

  return (
    <button
      type="button"
      className={`cursor-pointer w-full h-fit rounded-[60px] hover:bg-gray-200 hover:border-gray-300 border lg:py-3 lg:px-8 lg:gap-2 py-2 px-3 gap-1 bg-white flex flex-col paytone items-center justify-center transition-all duration-300 ease-in-out ${loading ? 'opacity-50' : ''}`}
      onClick={handleClick}
      disabled={loading}
    >
      {loading ? (
        <div className="flex items-center justify-center gap-2 py-3">
          <LoadingSpinner size={20} />
        </div>
      ) : (
        <>
          <img src={img} alt={text} className="size-8" />
          <h6
            className={`font-[400] text-[12px] lg:leading-[18px] capitalize transition-colors duration-200`}
            style={{ 
              color: textcolor,
              '--hover-color': texthover 
            }}
          >
            {text}
          </h6>
        </>
      )}
    </button>
  );
});