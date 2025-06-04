import React, { useState, useEffect } from "react";
import CreateEventBtn from "../Layout-conponents/CreateEventBtn";
import When from "./PopUps/When";
import Where from "./PopUps/Where";
import Host from "./PopUps/Host";
import Description from "./PopUps/Description";
import DressCode from "./PopUps/DressCode";
import ChipIn from "./PopUps/ChipIn";
import ImageModal from "./PopUps/ImageModal";
import Preview from "./Preview";

// Default image sources array (should match the one in ImageModal)
const imageSources = [
  "event-ph1.png",
  "event-ph2.jpg",
  "event-ph3.jpg",
  "event-ph4.jpg",
  "event-ph5.jpg",
  "event-ph6.jpg",
  "event-ph7.jpg",
];

const Grid = ({ children, title, buttom }) => {
  return (
    <div className="grid w-full h-fit gap-3">
      <h4 className="text-black text-[14px] font-[700] leading-[20px] satoshi capitalize">
        {title}
      </h4>
      {children}
      <div className="flex gap-4 w-full">{buttom}</div>
    </div>
  );
};

const Input = ({
  leftImgSrc,
  text,
  onClickRight,
  onClick,
  rightImg,
  showDropdown,
  edit,
  remove,
  className,
}) => {
  return (
    <div
      className="flex justify-between p-3 gap-4 rounded-[12px] bg-white/50 border border-white items-center w-full cursor-pointer relative"
      onClick={onClick}
    >
      {/* Left Image */}
      <div className="bg-white p-1 rounded-4xl size-fit">
        <img src={leftImgSrc} alt="" className="w-5 h-4" />
      </div>

      {/* Middle Text */}
      <div
        className={`text-left w-full ${className} font-medium text-[14px] capitalize satoshi`}
      >
        {text}
      </div>

      {/* Right Image */}
      {rightImg && (
        <div className="grid h-fit w-fit relative">
          <img
            src={rightImg}
            alt="Right Icon"
            className="size-4 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              onClickRight && onClickRight(e);
            }}
          />
          {showDropdown && (
            <div className="absolute w-[100px] grid h-fit top-6 -right-4 bg-white z-40 px-4 gap-4 py-2 rounded-[8px] text-left satoshi shadow-lg border">
              <p
                className="text-sm font-medium text-black hover:scale-110 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  edit && edit();
                }}
              >
                Edit
              </p>
              <p
                className="text-sm font-medium text-black hover:scale-110 hover:text-red-500 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  remove && remove();
                }}
              >
                Remove
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const Add = ({ title, onOptionClick }) => {
  return (
    <div
      className="py-2 px-3 flex md:gap-2 gap-1 bg-white/80 rounded-[20px] size-fit border border-white justify-center items-center cursor-pointer"
      onClick={onOptionClick}
    >
      <img src="add.svg" alt="" className="size-4" />
      <h6 className="font-bold text-black text-[12px] capitalize satoshi">
        {title}
      </h6>
    </div>
  );
};

const Private = ({ onPublic }) => {
  // Basic state
  const [eventName, setEventName] = useState("");
  const [eventImage, setEventImage] = useState(null);
  const [eventData, setEventData] = useState({});
  const [hostName, setHostName] = useState("");
  const [descriptionText, setDescriptionText] = useState("");
  const [descriptionDisplay, setDescriptionDisplay] = useState("");
  const [dressCode, setDressCode] = useState("");
  const [offlineLocation, setOfflineLocation] = useState("");
  const [onlineLocation, setOnlineLocation] = useState("");
  const [state, setState] = useState("");
  const [timeType, setTimeType] = useState("");
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endDate, setEndDate] = useState("");
  const [endTime, setEndTime] = useState("");
  const [recurringDate, setRecurringDate] = useState("");
  const [recurringTime, setRecurringTime] = useState("");
  const [timeFrequency, setTimeFrequency] = useState("");
  const [reoccurrance, setReoccurrance] = useState("");
  const [timeData, setTimeData] = useState(null);

  // Modal states
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [imageModal, setImageModal] = useState(false);
  const [description, setDescription] = useState(false);
  const [host, setHost] = useState(false);
  const [when, setWhen] = useState(false);
  const [where, setWhere] = useState(false);
  const [dress, setDress] = useState(false);
  const [chipin, setChipIn] = useState(false);

  // Add to List states
  const [addDressCode, setAddDressCode] = useState(false);
  const [addDescription, setAddDescription] = useState(false);
  const [addChipIn, setAddChipIn] = useState(false);

  // Dropdown visibility states
  const [showDressDropdown, setShowDressDropdown] = useState(false);
  const [showDescriptionDropdown, setShowDescriptionDropdown] = useState(false);
  const [showChipInDropdown, setShowChipInDropdown] = useState(false);

  // Set default image on component mount
  useEffect(() => {
    if (!eventImage && imageSources.length > 0) {
      setEventImage({
        type: "template",
        imageSrc: imageSources[0],
        imageUrl: imageSources[0],
      });
    }
  }, [eventImage]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setShowDressDropdown(false);
      setShowDescriptionDropdown(false);
      setShowChipInDropdown(false);
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // Modal control functions
  const openPreview = () => setIsPreviewOpen(true);
  const closePreview = () => setIsPreviewOpen(false);

  const openImageModal = () => setImageModal(true);
  const closeImageModal = () => setImageModal(false);

  const openDescription = () => setDescription(true);
  const closeDescription = () => setDescription(false);

  const openWhen = () => setWhen(true);
  const closeWhen = () => setWhen(false);

  const openWhere = () => setWhere(true);
  const closeWhere = () => setWhere(false);

  const openHost = () => setHost(true);
  const closeHost = () => setHost(false);

  const openDress = () => setDress(true);
  const closeDress = () => setDress(false);

  const openChipIn = () => setChipIn(true);
  const closeChipIn = () => setChipIn(false);

  // Add List control functions
  const putDress = () => {
    setAddDressCode(true);
    openDress(); // Open modal immediately when adding
  };

  const removeDress = () => {
    setAddDressCode(false);
    setShowDressDropdown(false);
    // Remove from eventData
    setEventData((prev) => {
      const newData = { ...prev };
      delete newData.dressCode;
      return newData;
    });
  };

  const putDescription = () => {
    setAddDescription(true);
    openDescription(); // Open modal immediately when adding
  };

  const removeDescription = () => {
    setAddDescription(false);
    setShowDescriptionDropdown(false);
    // Remove from eventData
    setEventData((prev) => {
      const newData = { ...prev };
      delete newData.description;
      return newData;
    });
  };

  const putChipIn = () => {
    setAddChipIn(true);
    openChipIn(); // Open modal immediately when adding
  };

  const removeChipIn = () => {
    setAddChipIn(false);
    setShowChipInDropdown(false);
    // Remove from eventData
    setEventData((prev) => {
      const newData = { ...prev };
      delete newData.chipIn;
      return newData;
    });
  };

  // Dropdown toggle functions
  const toggleDressDropdown = (e) => {
    e.stopPropagation();
    setShowDressDropdown(!showDressDropdown);
    setShowDescriptionDropdown(false);
    setShowChipInDropdown(false);
  };

  const toggleDescriptionDropdown = (e) => {
    e.stopPropagation();
    setShowDescriptionDropdown(!showDescriptionDropdown);
    setShowDressDropdown(false);
    setShowChipInDropdown(false);
  };

  const toggleChipInDropdown = (e) => {
    e.stopPropagation();
    setShowChipInDropdown(!showChipInDropdown);
    setShowDressDropdown(false);
    setShowDescriptionDropdown(false);
  };

  // Handle saving data from modals
  const handleSaveModalData = (data) => {
    console.log("Modal data saved:", data);

    // Store event data
    setEventData((prev) => ({
      ...prev,
      [data.type || "data"]: data.data,
    }));

    // Special handling for host to also update hostName state
    if (data.type === "host") {
      setHostName(data.data || data.displayText || "");
    }
  };

  const handleImageSave = (imageData) => {
    setEventImage(imageData);
    console.log("Image saved:", imageData);
  };

  const handleHostNameSave = (hostName) => {
    setHostName(hostName);
  };

  const handleDressCodeSave = (dressCode) => {
    setDressCode(dressCode);
  };

  const handleDescriptionSave = (descriptionData) => {
    setDescriptionText(descriptionData.data);
    setDescriptionDisplay(descriptionData.displayText);
  };

  const handleLocationSave = (LocationData) => {
    setOfflineLocation(LocationData.offline);
    setOnlineLocation(LocationData.online);
    setState(LocationData.state);
  };

  // Get the location display text based on the current state
  const getLocationDisplayText = () => {
    if (offlineLocation && onlineLocation) {
      return `${offlineLocation}, ${state} + Online`;
    } else if (offlineLocation) {
      return `${offlineLocation}, ${state}`;
    } else if (onlineLocation) {
      return `Online Event - ${onlineLocation}`;
    }
    return "Where is your event?";
  };

  const handleTimeSave = (timeData) => {
    setTimeData(timeData);

    // Also update individual states if needed
    setTimeType(timeData.type);

    if (timeData.type === "single") {
      setStartDate(timeData.startDate);
      setStartTime(timeData.startTime);
      setEndDate(timeData.endDate);
      setEndTime(timeData.endTime);
    } else if (timeData.type === "recurring") {
      setRecurringDate(timeData.recurringDate);
      setRecurringTime(timeData.recurringTime);
      setTimeFrequency(timeData.frequency);
      setReoccurrance(timeData.recurrencePattern);
    }
  };

  const formatDateRange = (startDate, startTime, endDate, endTime) => {
    // Handle empty inputs
    if (!startDate || !startTime) {
      return "when is your event?";
    }

    // Create full datetime strings
    const startDateTime = new Date(`${startDate} ${startTime}`);
    const endDateTime =
      endDate && endTime ? new Date(`${endDate} ${endTime}`) : null;

    // Options for formatting
    const dayOptions = { weekday: "long" };
    const monthOptions = { month: "long" };
    const timeOptions = {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    };

    // Helper function to get ordinal suffix
    const getOrdinalSuffix = (day) => {
      if (day > 3 && day < 21) return "th";
      switch (day % 10) {
        case 1:
          return "st";
        case 2:
          return "nd";
        case 3:
          return "rd";
        default:
          return "th";
      }
    };

    // Helper function to format a single date
    const formatSingleDate = (date, includeYear = true) => {
      const dayName = date
        .toLocaleDateString("en-US", dayOptions)
        .toLowerCase();
      const monthName = date
        .toLocaleDateString("en-US", monthOptions)
        .toLowerCase();
      const day = date.getDate();
      const year = date.getFullYear();

      const formattedDate = `${dayName}, ${monthName} ${day}${getOrdinalSuffix(
        day
      )}`;
      return includeYear ? `${formattedDate}, ${year}` : formattedDate;
    };

    // Format start time
    const startTimeFormatted = startDateTime
      .toLocaleTimeString("en-US", timeOptions)
      .toLowerCase();

    // If no end date/time, just show start
    if (!endDateTime) {
      const startDateFormatted = formatSingleDate(startDateTime);
      return `${startDateFormatted} ${startTimeFormatted}`;
    }

    // Check if same date (ignoring time)
    const isSameDate =
      startDateTime.toDateString() === endDateTime.toDateString();

    if (isSameDate) {
      // Same date: "monday, march 3rd, 2023 4:30pm-7:30pm"
      const dateStr = formatSingleDate(startDateTime);
      return `${dateStr}          ${startTime}    -    ${endTime}`;
    } else {
      // Different dates: "monday, march 3rd 5:00pm - wednesday, march 5th, 2025 12:00pm"
      const startDateStr = formatSingleDate(startDateTime, false);
      const endDateStr = formatSingleDate(endDateTime);
      return `${startDateStr} ${startTime} - ${endDateStr} ${endTime}`;
    }
  };

  const getTimeDisplayText = () => {
    return formatDateRange(startDate, startTime, endDate, endTime);
  };

  // Get the current image URL - fallback to default if eventImage is null
  const getCurrentImageUrl = () => {
    if (eventImage && eventImage.imageUrl) {
      return eventImage.imageUrl;
    }
    return imageSources[0]; // fallback to first image
  };

  return (
    <main className="bg-[#F0F0F0] min-h-[90vh] h-fit w-full grid gap-[43px] lg:pb-10 pt-10">
      <div className="lg:flex-row flex lg:gap-12 gap-8 flex-col sm:w-fit w-[95%] mx-auto">
        {/* left section */}
        <section className="sm:w-fit w-full h-fit flex flex-col gap-4 mx-auto">
          <div className="grid h-fit w-full">
            <h5 className="text-black text-[14px] font-[700] leading-[20px] satoshi capitalize">
              event image
            </h5>
            <p className="text-[#8A9191] text-[12px] font-[500] leading-[18px] satoshi capitalize">
              Upload a JPEG or PNG file with a size of 2mb or less
            </p>
          </div>
          <div className="relative">
            <img
              src={getCurrentImageUrl()}
              alt="Event-img"
              className="rounded-3xl sm:w-[349px] sm:h-[349px] w-[95vw] h-[306px] backdrop-blur-[12px] object-cover cursor-pointer justify-center"
              onClick={openImageModal}
            />
            <div
              className="hidden absolute cursor-pointer top-[303px] left-[302px] rounded-full xl:flex items-center justify-center h-8 w-8 bg-white shadow-lg hover:bg-gray-100 transition-colors"
              onClick={openImageModal}
            >
              <img src="image.svg" className="z-10" alt="" />
            </div>
          </div>
          <div className="flex justify-center p-2 items-start bg-[#F3F0FB]">
            <p className="text-[#7A60BF] text-[12px] font-[500] leading-[18px] satoshi capitalize">
              Images with a 1 : 1 ratio (a square) work best
            </p>
          </div>
          <div className="lg:flex p-3 gap-2 rounded-[12px] bg-white/50 border border-white backdrop-blur-[2px] items-center w-full hidden">
            <h5 className="text-[#8A9191] text-[16px] font-[700] leading-[24px] satoshi capitalize w-full">
              theme settings
            </h5>
            <div className="aspect-square size-[47px] py-3 px-2 flex justify-center items-center rounded-[6px] backdrop-blur-[12px] border border-[#866AD2]"></div>
          </div>
        </section>

        {/* right section */}
        <section className="gap-6 items-start flex flex-col w-full lg:w-[553px] h-fit mx-auto">
          <div className="grid gap-2 w-full">
            <div
              style={{
                boxShadow: "0px 4px 24px 0px rgba(0, 0, 0, 0.08)",
                backdropFilter: "blur(16px)",
              }}
              className="flex p-[4px] rounded-[20px] bg-white lg:w-fit h-fit w-full"
            >
              <div className="items-center py-1 px-[10px] rounded-3xl bg-[#BEFD66] cursor-pointer w-full text-center">
                <h5 className="text-black text-[10px] font-[700] leading-[14px] satoshi capitalize">
                  private
                </h5>
              </div>
              <div
                className="items-center py-1 px-[10px] rounded-3xl bg-white cursor-pointer w-full text-center"
                onClick={onPublic}
              >
                <h5 className="text-black text-[10px] font-[700] leading-[14px] satoshi capitalize">
                  public
                </h5>
              </div>
            </div>
            <p className="text-[#8A9191] text-[12px] font-[500] leading-[18px] satoshi capitalize sm:w-full w-[323px] text-center lg:text-left">
              Shh... it's exclusive! Only those with the magic link can RSVP.
            </p>
          </div>
          <div className="grid p-3 gap-4 rounded-[12px] bg-white/50 border border-white items-center w-full">
            <input
              type="text"
              placeholder="Event name"
              onChange={(e) => setEventName(e.target.value)}
              value={eventName}
              className="appearance-none bg-transparent border-none text-2xl font-[400] leading-[32px] text-black placeholder-[#8A9191] focus:outline-none paytone"
            />
          </div>
          <Grid title="event details">
            <Input
              leftImgSrc="timer.svg"
              text={timeType}
              onClick={openWhen}
              className={startDate || endDate ? "text-black" : "text-[#8A9191]"}
            />
            <Input
              leftImgSrc="location-try.svg"
              text={getLocationDisplayText()}
              onClick={openWhere}
              className={
                offlineLocation || onlineLocation
                  ? "text-black"
                  : "text-[#8A9191]"
              }
            />
            <Input
              leftImgSrc="crown.svg"
              text={hostName || "who is the host?"}
              onClick={openHost}
              className={hostName ? "text-black" : "text-[#8A9191]"}
            />
            {addDressCode && (
              <Input
                leftImgSrc="dress.svg"
                text={dressCode || "enter dress code"}
                onClick={openDress}
                rightImg="more-circle.svg"
                onClickRight={toggleDressDropdown}
                showDropdown={showDressDropdown}
                edit={openDress}
                remove={removeDress}
                className={dressCode ? "text-black" : "text-[#8A9191]"}
              />
            )}
            {addDescription && (
              <Input
                leftImgSrc="note-text.svg"
                text={descriptionDisplay || "event description"}
                onClick={openDescription}
                rightImg="more-circle.svg"
                onClickRight={toggleDescriptionDropdown}
                showDropdown={showDescriptionDropdown}
                edit={openDescription}
                remove={removeDescription}
                className={descriptionDisplay ? "text-black" : "text-[#8A9191]"}
              />
            )}
            {addChipIn && (
              <Input
                leftImgSrc="money-add.svg"
                text="enter chip-in details"
                onClick={openChipIn}
                rightImg="more-circle.svg"
                onClickRight={toggleChipInDropdown}
                showDropdown={showChipInDropdown}
                edit={openChipIn}
                remove={removeChipIn}
              />
            )}

            <div className="flex w-full h-fit gap-4">
              {!addDressCode && (
                <Add title="dress code" onOptionClick={putDress} />
              )}
              {!addDescription && (
                <Add title="description" onOptionClick={putDescription} />
              )}
              {!addChipIn && <Add title="chip-in" onOptionClick={putChipIn} />}
            </div>
          </Grid>

          {/* Create Event Buttons */}
          <section className="h-fit w-full lg:flex justify-between gap-4 hidden">
            <CreateEventBtn
              text="View Preview"
              bgcolor="bg-[#E6F2F3]"
              textcolor="text-[#095256]"
              onClick={openPreview}
            />
            <CreateEventBtn
              text="Create Event"
              textcolor="text-[#095256]"
              bgcolor="bg-[#aefc40]"
              onClick={() =>
                console.log("Create Event Clicked", {
                  eventName,
                  eventImage,
                  eventData,
                })
              }
            />
          </section>
        </section>
      </div>
      <section className="w-full h-fit px-4 pt-6 pb-12 rounded-t-2xl bg-white/90 lg:hidden grid gap-4">
        <div className="flex p-3 gap-2 rounded-[12px] bg-white/90 border backdrop-blur-[2px] items-center w-full">
          <h5 className="text-[#8A9191] text-[16px] font-[700] leading-[24px] satoshi capitalize w-full">
            theme settings
          </h5>
          <div className="aspect-square size-[47px] py-3 px-2 flex justify-center items-center rounded-[6px] backdrop-blur-[12px] border border-[#866AD2]"></div>
        </div>
        <section className="h-fit w-full flex justify-between gap-4">
          <CreateEventBtn
            text="View Preview"
            bgcolor="bg-[#E6F2F3]"
            textcolor="text-[#095256]"
            onClick={openPreview}
          />
          <CreateEventBtn
            text="Create Event"
            textcolor="text-[#095256]"
            bgcolor="bg-[#aefc40]"
            onClick={() =>
              console.log("Create Event Clicked", {
                eventName,
                eventImage,
                eventData,
              })
            }
          />
        </section>
      </section>

      {/* All Modals */}
      <When isVisible={when} onClose={closeWhen} onSave={handleTimeSave} />
      <Where
        isVisible={where}
        onClose={closeWhere}
        onSave={handleLocationSave}
      />
      <Host isVisible={host} onClose={closeHost} onSave={handleHostNameSave} />
      <ImageModal
        onClose={closeImageModal}
        isOpen={imageModal}
        onSave={handleImageSave}
      />
      <Description
        isVisible={description}
        onClose={closeDescription}
        onSave={handleDescriptionSave}
      />
      <DressCode
        isVisible={dress}
        onClose={closeDress}
        onSave={handleDressCodeSave}
      />
      <ChipIn
        isVisible={chipin}
        onClose={closeChipIn}
        onSave={handleSaveModalData}
      />
      {isPreviewOpen && (
        <Preview
          closeModal={closePreview}
          eventImg={getCurrentImageUrl()}
          eventName={eventName}
          hostName={hostName}
          description={descriptionText}
          dressCode={dressCode}
          state={state}
          offline={offlineLocation}
          online={onlineLocation}
        />
      )}
    </main>
  );
};

export default Private;
