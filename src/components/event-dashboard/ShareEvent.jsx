import React, { useState } from "react";

const ShareEvent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const togglePopup = () => setIsOpen(!isOpen);

  return (
    <div className="satoshi">
      <button onClick={togglePopup}>
        <img
          src="/icons/share-event.svg"
          alt=""
          className="w-7 h-7 md:w-auto md:h-auto"
        />
      </button>

      {isOpen && (
        <div className="w-screen h-screen bg-[#00000080] fixed inset-0 flex items-end md:items-start md:justify-center z-50">
          <div className="w-full md:w-[432px] h-fit flex gap-2">
            <div className="w-full md:w-[432px] md:mt-40 md:rounded-3xl overflow-clip">
              <div className="flex items-center justify-between bg-white py-3 px-4 rounded-t-3xl shadow-sm shadow-[#028E4B1A] : 0px 4px 24px 0px #028E4B1A">
                <p className="font-bold text-sm text-[#010E1F]">
                  Send out invite
                </p>

                <button
                  onClick={() => setIsOpen(false)}
                  className="mt-4 text-sm text-gray-500 hover:text-gray-700 md:hidden">
                  <img src="/close-circle.svg" alt="" />
                </button>
              </div>

              <div className="py-6 px-4 bg-[#FFFFFFD9] backdrop-blur-xl shadow-sm shadow-[#028E4B1A]">
                <div className="bg-[#FFFFFE80] backdrop-blur-xl border border-[#FFFFFE] rounded-[12px] p-2 flex gap-2 items-center">
                  <div>
                    <img
                      src="/events-img.png"
                      alt=""
                      className="w-[41.8px] h-[38px] rounded-xl"
                    />
                  </div>

                  <div className="flex itcems-center justify-between w-full">
                    <div>
                      <p className="font-bold text-sm">Crave Fest</p>
                      <p>Sat, Mar 1, 16:30pm</p>
                    </div>

                    <button className="flex items-center justify-center gap-1 bg-[#AEFC40] py-2 px-3 rounded-3xl">
                      <p className="font-bold text-[12px] text-[#011F0F]">
                        Copy Link
                      </p>{" "}
                      <img src="link.svg" alt="" className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Close Button */}
            <img
              src="closePopup.svg"
              alt=""
              className="h-12 hidden md:block w-12 relative top-36 right-2 cursor-pointer"
              onClick={() => setIsOpen(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ShareEvent;
