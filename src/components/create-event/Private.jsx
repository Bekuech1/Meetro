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
import EventType from "./PopUps/EventType";
import API from "@/lib/axios";
import { banks } from "@/utils/Banks";
import { useNavigate } from "react-router";
import axios from "axios";
import useEventStore from "@/stores/eventStore";

export const LoadingSpinner = ({
  size = 16,
  color = "#7A60BF",
  speed = "0.7s",
}) => {
  const spinnerSize = `${size}px`;

  return (
    <div className="flex items-center justify-center">
      <div
        className={`border-2 border-t-transparent border-[#7A60BF] ${size} ${color} rounded-full animate-spin`}
        style={{
          width: spinnerSize,
          height: spinnerSize,
          animationDuration: speed,
        }}
      ></div>
    </div>
  );
};

// Default image sources array (should match the one in ImageModal)
const imageSources = [
  "/event-ph1.png",
  "/event-ph2.jpg",
  "/event-ph3.jpg",
  "/event-ph4.jpg",
  "/event-ph5.jpg",
  "/event-ph6.jpg",
  "/event-ph7.jpg",
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
      className="flex justify-between p-3 gap-4 rounded-[12px] bg-white/50 border border-white items-center w-full max-w-[] cursor-pointer relative"
      onClick={onClick}
    >
      {/* Left Image */}
      <div className="bg-white p-1 rounded-4xl size-fit">
        <img src={leftImgSrc} alt="" className="w-5 h-4" />
      </div>

      {/* Middle Text */}
      <div
        className={`text-left w-full ${className} font-medium text-[14px] capitalize satoshi whitespace-nowrap overflow-hidden text-ellipsis`}
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
      className="py-2 px-3 flex md:gap-2 w-fit gap-1 bg-white/80 rounded-[20px] size-fit border border-white justify-center items-center cursor-pointer"
      onClick={onOptionClick}
    >
      <img src="/add.svg" alt="" className="size-4" />
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
  const [location, setLocation] = useState("");
  const [locationType, setLocationType] = useState("");
  const [state, setState] = useState("");
  const [amount, setAmount] = useState("");
  const [chipInType, setChipInType] = useState("");
  const [bankCode, setBankCode] = useState("");
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountName, setAccountName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endDate, setEndDate] = useState("");
  const [endTime, setEndTime] = useState("");
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [uploadResponse, setUploadResponse] = useState(null);

  // Modal states
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [imageModal, setImageModal] = useState(false);
  const [description, setDescription] = useState(false);
  const [host, setHost] = useState(false);
  const [when, setWhen] = useState(false);
  const [where, setWhere] = useState(false);
  const [dress, setDress] = useState(false);
  const [chipin, setChipIn] = useState(false);
  const [eventType, setEventType] = useState(false);
  const [createEventModal, setCreateEventModal] = useState(false);
  const [creatingEventPopup, setCreatingEventPopup] = useState(false);
  const [response, setResponse] = useState(null);

  // Add to List states
  const [addDressCode, setAddDressCode] = useState(false);
  const [addDescription, setAddDescription] = useState(false);
  const [addChipIn, setAddChipIn] = useState(false);
  const [addEventType, setAddEventType] = useState(false);

  // Dropdown visibility states
  const [showDressDropdown, setShowDressDropdown] = useState(false);
  const [showDescriptionDropdown, setShowDescriptionDropdown] = useState(false);
  const [showChipInDropdown, setShowChipInDropdown] = useState(false);
  const [showEventTypeDropdown, setShowEventTypeDropdown] = useState(false);

  const navigate = useNavigate();

  // Function to check if any modal is open
  const isAnyModalOpen = () => {
    return (
      isPreviewOpen ||
      imageModal ||
      description ||
      host ||
      when ||
      where ||
      dress ||
      chipin ||
      createEventModal ||
      creatingEventPopup ||
      eventType
    );
  };

  // Function to check if preview should be enabled
  const isPreviewEnabled = () => {
    return (
      eventName.trim() !== "" && startDate !== "" && location.trim() !== ""
    );
  };

  // Prevent scroll when modal is open
  useEffect(() => {
    if (isAnyModalOpen()) {
      // Disable scroll
      document.body.style.overflow = "hidden";
    } else {
      // Re-enable scroll
      document.body.style.overflow = "unset";
    }

    // Cleanup function to reset overflow when component unmounts
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isAnyModalOpen()]);

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
      setShowEventTypeDropdown(false);
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // Modal control functions
  const openPreview = () => {
    if (isPreviewEnabled()) {
      setIsPreviewOpen(true);
    }
  };
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

  const openEventType = () => setEventType(true);
  const closeEventType = () => setEventType(false);

  const creatingEvent = () => setCreateEventModal(true);
  const creatingEventComplete = () => setCreateEventModal(false);

  // Add List control functions
  const putDress = () => {
    setAddDressCode(true);
  };

  const removeDress = () => {
    setAddDressCode(false);
    setShowDressDropdown(false);
    setEventData((prev) => {
      const newData = { ...prev };
      delete newData.dressCode;
      return newData;
    });
  };

  const putDescription = () => {
    setAddDescription(true);
  };

  const removeDescription = () => {
    setAddDescription(false);
    setShowDescriptionDropdown(false);
    setEventData((prev) => {
      const newData = { ...prev };
      delete newData.description;
      return newData;
    });
  };

  const putChipIn = () => {
    setAddChipIn(true);
  };

  const removeChipIn = () => {
    setAddChipIn(false);
    setShowChipInDropdown(false);
    setEventData((prev) => {
      const newData = { ...prev };
      delete newData.chipIn;
      return newData;
    });
  };

  const putEventType = () => {
    setAddEventType(true);
  };

  const removeEventType = () => {
    setAddEventType(false);
    setShowEventTypeDropdown(false);
  };

  // Dropdown toggle functions
  const toggleDressDropdown = (e) => {
    e.stopPropagation();
    setShowDressDropdown(!showDressDropdown);
    setShowDescriptionDropdown(false);
    setShowChipInDropdown(false);
    setShowEventTypeDropdown(false);
  };

  const toggleDescriptionDropdown = (e) => {
    e.stopPropagation();
    setShowDescriptionDropdown(!showDescriptionDropdown);
    setShowDressDropdown(false);
    setShowChipInDropdown(false);
    setShowEventTypeDropdown(false);
  };

  const toggleChipInDropdown = (e) => {
    e.stopPropagation();
    setShowChipInDropdown(!showChipInDropdown);
    setShowDressDropdown(false);
    setShowDescriptionDropdown(false);
    setShowEventTypeDropdown(false);
  };

  const toggleEventTypeDropdown = (e) => {
    e.stopPropagation();
    setShowEventTypeDropdown(!showEventTypeDropdown);
    setShowChipInDropdown(false);
    setShowDressDropdown(false);
    setShowDescriptionDropdown(false);
  };

  const handleImageSave = (imageData) => {
    setEventImage(imageData);
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

  const handleChipInSave = async (chipInData) => {
    setAmount(chipInData.amount);
    setChipInType(chipInData.chipInType);
    setBankCode(chipInData.selectedBankCode);
    setBankName(chipInData.selectedBankName);
    setAccountNumber(chipInData.accountNumber);
    setAccountName(chipInData.accountName);

    return null;
  };

  const handleTimeSave = (TimeData) => {
    setStartDate(TimeData.startDate);
    setStartTime(TimeData.startTime);
    setEndDate(TimeData.endDate);
    setEndTime(TimeData.endTime);
  };

  const fullDateTimeRange =
    startDate && startTime
      ? endDate && endTime
        ? startDate === endDate
          ? `${startDate}, ${startTime} - ${endTime}`
          : `${startDate}, ${startTime} - ${endDate}, ${endTime}`
        : `${startDate}, ${startTime}` // Only start values present
      : "when is your event?";

  const handleLocationSave = (LocationData) => {
    setLocation(LocationData.venue);
    setLocationType(LocationData.locationType);
    setState(LocationData.state);
  };

  const handleEventTypeSave = (selectedEventType) => {
    if (selectedEventType) {
      setSelectedTypes(selectedEventType.data);
    }
  };

  const eventTypes = () => {
    return (
      selectedTypes.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedTypes.map((event, index) => (
            <span
              key={index}
              className={`px-2 py-1 rounded-full border text-[10px] ${event.className}`}
            >
              {event.title}
            </span>
          ))}
        </div>
      )
    );
  };

  // Get the location display text based on the current state
  const getLocationDisplayText = () => {
    switch (locationType) {
      case "online":
        return `Online - ${location}`;
      case "offline":
        return `${location}, ${state}`;
      default:
        return "Where is your event?";
    }
  };

  // Get the current image URL - fallback to default if eventImage is null
  const getCurrentImageUrl = () => {
    if (eventImage && eventImage.imageUrl) {
      return eventImage.imageUrl;
    }
    return imageSources[0]; // fallback to first image
  };

  // Handle image upload
  const handleImageUpload = async (file) => {
    try {
      const fileExtension = file.name.split(".").pop();
      const response = await API.post(`/upload`, {
        type: "event_temp",
        fileExtension: fileExtension,
      });

      const { uploadUrl, fileKey } = response.data;
      console.log("Upload URL:", uploadUrl);
      console.log("Uploading file:", file.name);
      console.log("File type:", file.type);
      console.log("Got upload URL:", uploadUrl);

      // const putUrl = import.meta.env.VITE_IMAGE_TO_S3_URL;
      await axios.put(uploadUrl, file, {
        headers: {
          "Content-Type": file.type,
        },
      });

      const getImg = import.meta.env.VITE_IMAGE_URL;
      const evtImg = `${getImg}/${fileKey}`;
      console.log("Image URL after upload:", evtImg);

      setUploadResponse(response.data);

      return {
        success: true,
        imageUrl: evtImg, // Remove query params from URL
        imageKey: fileKey,
      };
    } catch (error) {
      console.error("Image upload failed:", error);
      throw error;
    }
  };

  const handleCreateEvent = async () => {
    setIsLoading(true);
    setError(null);
    setResponse(null); // Clear previous response

    // Basic validation
    if (!eventName || !startDate || !location) {
      setError(
        "Please fill all required fields (Event Name, Date, and Location)"
      );
      setIsLoading(false);
      return;
    }

    // Show the popup before starting the API call
    setCreatingEventPopup(true);

    // Prepare the payload
    const payload = {
      title: eventName,
      description: descriptionText,
      date: startDate,
      timeFrom: startTime,
      timeTo: endTime,
      location: {
        venue: location,
        state: state,
        country: "Nigeria",
      },
      isPrivate: true,
      dressCode: dressCode,
      // tempImageKey: eventImage?.imageUrl,
      tempImageKey: uploadResponse?.fileKey,
      ...(amount && {
        chipInAmount: amount,
        chipInType: chipInType,
        chipInSettings: {
          fixedAmount: amount,
        },
        bankDetails: {
          bankName: bankName,
          accountNumber: accountNumber,
          accountName: accountName,
          bankCode: bankCode,
        },
      }),
      eventTypes: selectedTypes.map((type) => type.title),
      theme: 1,
      fontStyle: 1,
      isLightMode: true,
    };

    console.log("Sending tempImageKey:", eventImage?.imageKey);
    console.log("NOT sending imageUrl:", eventImage?.imageUrl);

    try {
      const apiResponse = await API.post(`/events`, payload);

      console.log("Event created successfully:", apiResponse.data);

      // Store the response in state for the modal to use
      setResponse(apiResponse.data);

      // Optional: Add a shorter delay or remove completely
      // You can handle navigation from the modal buttons instead
    } catch (error) {
      console.error(
        "Error creating event:",
        error.response?.data || error.message
      );
      setError(
        error.response?.data?.error ||
          "Failed to create event. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="bg-[#F0F0F0] min-h-[90vh] h-fit w-full grid gap-[43px] lg:pb-10 pt-10 pb-24">
      <div className="lg:flex-row flex lg:gap-12 gap-8 flex-col sm:w-fit w-[95%] mx-auto">
        {/* left section */}
        <section className="sm:w-fit w-full h-fit flex flex-col gap-4 mx-auto">
          <div className="flex flex-col justify-center h-fit">
            <h5 className="text-black text-[14px] font-[700] leading-[20px] satoshi capitalize">
              event image
            </h5>
            <p className="text-[#8A9191] text-[12px] font-[500] leading-[18px] satoshi capitalize">
              Upload a JPEG or PNG file with a size of 2mb or less
            </p>
          </div>
          <div className="relative flex justify-center">
            <img
              src={getCurrentImageUrl()}
              alt="/Event-img"
              className="rounded-3xl sm:w-[349px] sm:h-[349px] w-[306px] h-[306px] backdrop-blur-[12px] object-cover cursor-pointer justify-center"
              onClick={openImageModal}
            />
            <div
              className="hidden absolute cursor-pointer top-[303px] left-[302px] rounded-full xl:flex items-center justify-center h-8 w-8 bg-white shadow-lg hover:bg-gray-100 transition-colors"
              onClick={openImageModal}
            >
              <img src="/image.svg" className="z-10" alt="" />
            </div>
          </div>
          <div className="flex justify-center p-2 items-start bg-[#F3F0FB]">
            <p className="text-[#7A60BF] text-[12px] font-[500] leading-[18px] satoshi capitalize">
              Images with a 1 : 1 ratio (a square) work best
            </p>
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
              <div className="items-center py-2 px-[10px] rounded-3xl bg-[#BEFD66] cursor-pointer w-full text-center">
                <h5 className="text-black text-[10px] font-[700] leading-[14px] satoshi capitalize">
                  private
                </h5>
              </div>
              <div
                className="items-center py-2 px-[10px] rounded-3xl bg-white cursor-pointer w-full text-center"
                onClick={onPublic}
              >
                <h5 className="text-black text-[10px] font-[700] leading-[14px] satoshi capitalize">
                  public
                </h5>
              </div>
            </div>
            <p className="text-[#8A9191] text-[12px] font-[500] leading-[18px] satoshi capitalize w-full text-center lg:text-left">
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
              leftImgSrc="/timer.svg"
              text={fullDateTimeRange}
              onClick={openWhen}
              className={startDate || endDate ? "text-black" : "text-[#8A9191]"}
            />
            <Input
              leftImgSrc="/location-try.svg"
              text={getLocationDisplayText()}
              onClick={openWhere}
              className={location ? "text-black" : "text-[#8A9191]"}
            />
            <Input
              leftImgSrc="/crown.svg"
              text={hostName || "who is the host?"}
              onClick={openHost}
              className={hostName ? "text-black" : "text-[#8A9191]"}
            />
            {addDressCode && (
              <Input
                leftImgSrc="/dress.svg"
                text={dressCode || "enter dress code"}
                onClick={openDress}
                rightImg="/more-circle.svg"
                onClickRight={toggleDressDropdown}
                showDropdown={showDressDropdown}
                edit={openDress}
                remove={removeDress}
                className={dressCode ? "text-black" : "text-[#8A9191]"}
              />
            )}
            {addDescription && (
              <Input
                leftImgSrc="/note-text.svg"
                text={descriptionDisplay || "event description"}
                onClick={openDescription}
                rightImg="/more-circle.svg"
                onClickRight={toggleDescriptionDropdown}
                showDropdown={showDescriptionDropdown}
                edit={openDescription}
                remove={removeDescription}
                className={descriptionDisplay ? "text-black" : "text-[#8A9191]"}
              />
            )}
            {addChipIn && (
              <Input
                leftImgSrc="/money-add.svg"
                text={amount ? `${chipInType} - ₦${amount}` : "chip-in"}
                onClick={openChipIn}
                rightImg="/more-circle.svg"
                onClickRight={toggleChipInDropdown}
                showDropdown={showChipInDropdown}
                edit={openChipIn}
                remove={removeChipIn}
                className={amount ? "text-black" : "text-[#8A9191]"}
              />
            )}
            {addEventType && (
              <Input
                leftImgSrc="/category-2.svg"
                text={eventTypes() || "what type of event is this?"}
                onClick={openEventType}
                rightImg="/more-circle.svg"
                onClickRight={toggleEventTypeDropdown}
                showDropdown={showEventTypeDropdown}
                edit={openEventType}
                remove={removeEventType}
                className="text-[#8A9191]"
              />
            )}

            <div className="flex flex-wrap gap-2 w-full">
              {!addDressCode && (
                <Add title="dress code" onOptionClick={putDress} />
              )}
              {!addDescription && (
                <Add title="description" onOptionClick={putDescription} />
              )}
              {/* {!addChipIn && <Add title="chip-in" onOptionClick={putChipIn} />} */}
              {!addEventType && (
                <Add title="event type" onOptionClick={putEventType} />
              )}
            </div>
          </Grid>

          {error && (
            <div className="flex text-[12px] text-[#C7245A] rounded-2xl p-2 gap-2 satoshi font-medium bg-[#FBEAEF] border border-[#F4BCCF]">
              <img src="info-circle.svg" alt="" />
              <span>{error}</span>
            </div>
          )}

          {/* Create Event Buttons */}
          <section className="h-fit w-full lg:flex justify-between gap-4 hidden">
            <CreateEventBtn
              text="View Preview"
              bgcolor={isPreviewEnabled() ? "bg-[#E6F2F3]" : "bg-gray-300"}
              textcolor={
                isPreviewEnabled() ? "text-[#095256]" : "text-gray-500"
              }
              onClick={openPreview}
              disabled={!isPreviewEnabled()}
            />
            <CreateEventBtn
              text={isLoading ? "Creating..." : "Create Event"}
              textcolor="text-[#095256]"
              bgcolor="bg-[#aefc40]"
              onClick={handleCreateEvent}
              disabled={isLoading}
            />
          </section>
        </section>
      </div>

      {/* Fixed Bottom Section for Mobile */}
      <section className="fixed bottom-0 left-0 right-0 w-full h-fit px-4 pt-6 pb-6 rounded-t-2xl bg-white/90 backdrop-blur-md lg:hidden grid gap-4 z-20 border-t border-white/20 shadow-lg">
        <section className="h-fit w-full flex justify-between gap-4">
          <CreateEventBtn
            text="View Preview"
            bgcolor={isPreviewEnabled() ? "bg-[#E6F2F3]" : "bg-gray-300"}
            textcolor={isPreviewEnabled() ? "text-[#095256]" : "text-gray-500"}
            onClick={openPreview}
            disabled={!isPreviewEnabled()}
          />
          <CreateEventBtn
            text={isLoading ? "Creating..." : "Create Event"}
            textcolor="text-[#095256]"
            bgcolor="bg-[#aefc40]"
            onClick={handleCreateEvent}
            disabled={isLoading}
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
        handleImageUpload={handleImageUpload}
        onUpload={handleImageUpload}
        banks={banks}
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
        onSave={handleChipInSave}
        banks={banks}
      />
      <EventType
        isVisible={eventType}
        onClose={closeEventType}
        onSave={handleEventTypeSave}
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
          location={location}
          locationType={locationType}
          amount={amount}
          eventTypes={eventTypes()}
          time={fullDateTimeRange}
        />
      )}
      {creatingEventPopup && (
        <div className="fixed inset-0 h-screen flex items-center justify-center z-30 bg-[#00000080]/50 backdrop-blur-[4px]">
          <div className="sm:w-[90%] w-fit max-w-[546px] h-fit rounded-3xl border border-white/50 bg-[#F0F0F0] backdrop-blur-[32px] flex flex-col justify-center items-center">
            <div className="grid size-fit sm:gap-4 gap-2 sm:py-12 sm:px-6 p-6">
              <img
                src={getCurrentImageUrl()}
                alt=""
                className="sm:size-[220px] size-[120px] border border-white rounded-3xl mx-auto object-cover"
              />
              <div className="grid w-full h-fit gap-2 text-center">
                <h1 className="paytone capitalize text-black font-[400] text-[30px] leading-[38px]">
                  {eventName}
                </h1>
                <div className="flex gap-1 items-center w-fit h-fit mx-auto">
                  <img src="/calendar.svg" className="w-4 h-4" />
                  <h6 className="text-[#8A9191] text-[16px] font-[500] leading-[24px] satoshi capitalize">
                    {startDate}
                  </h6>
                  <img src="/timer.svg" className="w-4 h-4" />
                  <h6 className="text-[#8A9191] text-[16px] font-[500] leading-[24px] satoshi capitalize">
                    {startTime}
                  </h6>
                </div>
              </div>
            </div>
            <div className="bg-white w-full h-fit grid gap-4 py-6 px-12 rounded-b-3xl">
              {/* Error State */}
              {error && (
                <>
                  <div className="flex text-[12px] text-[#C7245A] rounded-2xl p-2 gap-2 satoshi font-medium bg-[#FBEAEF] border border-[#F4BCCF]">
                    <img src="/info-circle.svg" alt="" />
                    <span>{error}</span>
                  </div>
                  {/* this section */}
                  <section className="h-fit w-full flex justify-between gap-4">
                    <CreateEventBtn
                      text="Cancel"
                      bgcolor="bg-[#F3F0FB]"
                      textcolor="text-[#7A60BF]"
                      onClick={() => {
                        setCreatingEventPopup(false);
                        setError(null);
                        setResponse(null);
                      }}
                    />
                    <CreateEventBtn
                      text="Try Again"
                      textcolor="text-white"
                      bgcolor="bg-[#011F0F]"
                      onClick={handleCreateEvent}
                    />
                  </section>
                </>
              )}

              {/* Loading State */}
              {isLoading && !error && (
                <div className="flex text-[12px] text-[#7A60BF] rounded-2xl p-2 gap-2 satoshi font-medium bg-[#F3F0FB] border border-[#D9D1F1]">
                  <LoadingSpinner />
                  <span>Creating Event</span>
                </div>
              )}

              {/* Success State */}
              {!isLoading && !error && response && (
                <>
                  <div className="flex text-[12px] text-[#61B42D] rounded-2xl p-2 gap-2 satoshi font-medium bg-[#F3FFEC] border border-[#C8FEA7]">
                    <img src="/tick-circle.svg" alt="" />
                    <span>Event has been created successfully</span>
                  </div>
                  <section className="h-fit w-full flex justify-between gap-4">
                    <CreateEventBtn
                      text="Manage"
                      bgcolor="bg-[#F3F0FB]"
                      textcolor="text-[#7A60BF]"
                      onClick={() => {
                        setCreatingEventPopup(false);
                        useEventStore.getState().setShouldRefetch(true);
                        // Navigate to event management page with the event ID
                        navigate(`/home`);
                      }}
                      disabled={!response?.id}
                    />
                    <CreateEventBtn
                      text="Share Event"
                      textcolor="text-white"
                      bgcolor="bg-[#011F0F]"
                      onClick={() => {
                        setCreatingEventPopup(false);
                        useEventStore.getState().setShouldRefetch(true);
                        // Navigate to share page or home with share functionality
                        navigate(`/home`);
                      }}
                    />
                  </section>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Private;
