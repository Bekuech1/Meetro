import { LoadingSpinner } from "../create-event/Private";
import EventInfo from "../event-dashboard/EventInfo";

const EventModal = ({ eventId, closeModal }) => {
  return (
    <>
      <div className="fixed inset-0 h-full lg:h-screen lg:flex lg:items-center lg:justify-center bg-[#00000080]/50 backdrop-blur-[4px] hidden z-50">
        <div className="flex flex-col-reverse gap-2 lg:w-fit w-full h-fit">
          <div className="lg:mx-14 mx-auto w-fit lg:h-[85vh] lg:max-h-[670px] h-full p-8 rounded-3xl lg:flex grid gap-8 bg-[#E8E8E8] text-center lg:overflow-hidden">
            <EventInfo eventId={eventId} />
          </div>

          {/* Close Button */}
          <img
            src="/closePopup.svg"
            alt=""
            className="h-12 w-12 cursor-pointer ml-auto"
            onClick={closeModal}
          />
        </div>
      </div>

      {/* mobile modal */}
    </>
  );
};

export default EventModal;

// ModalText Component
export const ModalText = ({ img, text }) => {
  return (
    <div className="flex gap-1 items-center w-fit h-fit">
      <img src={img} alt={text} className="w-4 h-4" />
      <h6 className="text-[#8A9191] text-[16px] font-[500] leading-[24px] satoshi capitalize">
        {text}
      </h6>
    </div>
  );
};

// event categories div
export const EventCategories = ({ borderBgColor, text }) => {
  return (
    <div
      className={`font-[500] text-[12px] leading-[18px] bg-white capitalize border-[0.5px] p-[8px] rounded-[20px] ${borderBgColor}`} // Fixed
    >
      {text}
    </div>
  );
};

export const ModalBtn = ({
  onClick,
  bgcolor,
  bgHover,
  image,
  textcolor,
  text,
  className,
}) => {
  return (
    <div
      className={`lg:w-fit w-full h-fit rounded-[60px] flex gap-2 p-[10px] justify-center items-center cursor-pointer ${bgHover} ${bgcolor}`}
      onClick={onClick}
    >
      <img src={image} className="size-[22px]" />
      <h6
        className={`paytone sm:font-[700] font-[500] sm:text-[14px] text-[10px] sm:leading-[20px] leading-[14px] ${textcolor} ${className}`}
      >
        {text}
      </h6>
    </div>
  );
};

export const Attendance = ({
  img,
  text,
  bgHover,
  textcolor,
  texthover,
  onClick,
  loading,
}) => {
  return (
    <div
      className={`cursor-pointer w-full h-fit rounded-[60px] lg:py-3 lg:px-8 lg:gap-2 py-2 px-3 gap-1 bg-white flex flex-col paytone items-center justify-center hover:bg-[${bgHover}] transition-all duration-300 ease-in-out`}
      onClick={loading ? null : onClick}
    >
      {loading ? (
        <div className="flex items-center justify-center gap-2 py-3">
          <LoadingSpinner size={20} />
          {/* <div className="loader size-4 border-2 border-t-transparent border-green-500 rounded-full animate-spin" /> */}
          {/* <span className="text-[12px] text-gray-500">Loading...</span> */}
        </div>
      ) : (
        <>
          <img src={img} alt="" className="size-8" />
          <h6
            className={`text-[${textcolor}] hover:text-[${texthover}] font-[400] text-[12px] lg:leading-[18px] capitalize`}
          >
            {text}
          </h6>
        </>
      )}
    </div>
  );
};
