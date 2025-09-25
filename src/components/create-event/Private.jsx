import React, { useState, useEffect, useCallback, useMemo } from "react";
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

// Optimized Loading Spinner Component
export const LoadingSpinner = React.memo(
  ({ size = 16, color = "#7A60BF", speed = "0.7s" }) => (
    <div className="flex items-center justify-center">
      <div
        className="border-2 border-t-transparent rounded-full animate-spin"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          borderColor: color,
          borderTopColor: "transparent",
          animationDuration: speed,
        }}
      />
    </div>
  )
);

// Constants moved outside component to prevent recreation
const DEFAULT_IMAGE_SOURCES = [
  "/event-ph1.png",
  "/event-ph2.jpg",
  "/event-ph3.jpg",
  "/event-ph4.jpg",
  "/event-ph5.jpg",
  "/event-ph6.jpg",
  "/event-ph7.jpg",
];

const MODAL_TYPES = {
  PREVIEW: "preview",
  IMAGE: "image",
  DESCRIPTION: "description",
  HOST: "host",
  WHEN: "when",
  WHERE: "where",
  DRESS: "dress",
  CHIPIN: "chipin",
  EVENT_TYPE: "eventType",
  CREATE_EVENT: "createEvent",
  CREATING_EVENT: "creatingEvent",
};

// Optimized Grid component
const Grid = React.memo(({ children, title, buttom }) => (
  <div className="grid w-full h-fit gap-3">
    <h4 className="text-black text-[14px] font-[700] leading-[20px] satoshi capitalize">
      {title}
    </h4>
    {children}
    <div className="flex gap-4 w-full">{buttom}</div>
  </div>
));

// Optimized Input component
const Input = React.memo(
  ({
    leftImgSrc,
    text,
    onClickRight,
    onClick,
    rightImg,
    showDropdown,
    edit,
    remove,
    className,
  }) => (
    <div
      className="flex justify-between p-3 gap-4 rounded-[12px] bg-white/50 border border-white items-center w-full max-w-[92vw] lg:max-w-[553px] cursor-pointer relative"
      onClick={onClick}
    >
      <div className="bg-white p-1 rounded-4xl size-fit">
        <img src={leftImgSrc} alt="" className="w-5 h-4" />
      </div>

      <div
        className={`text-left w-full ${className} font-medium text-[14px] capitalize satoshi whitespace-nowrap overflow-hidden text-ellipsis`}
      >
        {text}
      </div>

      {rightImg && (
        <div className="grid h-fit w-fit relative">
          <img
            src={rightImg}
            alt="Right Icon"
            className="size-4 cursor-pointer"
            onClick={e => {
              e.stopPropagation();
              onClickRight?.(e);
            }}
          />
          {showDropdown && (
            <div className="absolute w-[100px] grid h-fit top-6 -right-4 bg-white z-40 px-4 gap-4 py-2 rounded-[8px] text-left satoshi shadow-lg border">
              <p
                className="text-sm font-medium text-black hover:scale-110 cursor-pointer"
                onClick={e => {
                  e.stopPropagation();
                  edit?.();
                }}
              >
                Edit
              </p>
              <p
                className="text-sm font-medium text-black hover:scale-110 hover:text-red-500 cursor-pointer"
                onClick={e => {
                  e.stopPropagation();
                  remove?.();
                }}
              >
                Remove
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  )
);

// Optimized Add component
const Add = React.memo(({ title, onOptionClick }) => (
  <div
    className="py-2 px-3 flex md:gap-2 w-fit gap-1 bg-white/80 rounded-[20px] size-fit border border-white justify-center items-center cursor-pointer"
    onClick={onOptionClick}
  >
    <img src="/add.svg" alt="" className="size-4" />
    <h6 className="font-bold text-black text-[12px] capitalize satoshi">
      {title}
    </h6>
  </div>
));

// Custom hook for modal management
const useModalManager = () => {
  const [activeModals, setActiveModals] = useState(new Set());

  const openModal = useCallback(modalType => {
    setActiveModals(prev => new Set([...prev, modalType]));
  }, []);

  const closeModal = useCallback(modalType => {
    setActiveModals(prev => {
      const newSet = new Set(prev);
      newSet.delete(modalType);
      return newSet;
    });
  }, []);

  const isModalOpen = useCallback(
    modalType => {
      return activeModals.has(modalType);
    },
    [activeModals]
  );

  const isAnyModalOpen = useMemo(() => activeModals.size > 0, [activeModals]);

  return { openModal, closeModal, isModalOpen, isAnyModalOpen };
};

// Custom hook for dropdown management
const useDropdownManager = () => {
  const [activeDropdowns, setActiveDropdowns] = useState(new Set());

  const toggleDropdown = useCallback((dropdownType, e) => {
    e?.stopPropagation();
    setActiveDropdowns(prev => {
      const newSet = new Set();
      if (!prev.has(dropdownType)) {
        newSet.add(dropdownType);
      }
      return newSet;
    });
  }, []);

  const closeAllDropdowns = useCallback(() => {
    setActiveDropdowns(new Set());
  }, []);

  const isDropdownOpen = useCallback(
    dropdownType => {
      return activeDropdowns.has(dropdownType);
    },
    [activeDropdowns]
  );

  return { toggleDropdown, closeAllDropdowns, isDropdownOpen };
};

// Custom hook for form state management
const useFormState = () => {
  const [formData, setFormData] = useState({
    eventName: "",
    hostName: "",
    descriptionText: "",
    descriptionDisplay: "",
    dressCode: "",
    location: "",
    locationType: "",
    state: "",
    amount: "",
    chipInType: "",
    bankCode: "",
    bankName: "",
    accountNumber: "",
    accountName: "",
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
    selectedTypes: [],
  });

  const updateFormData = useCallback(updates => {
    setFormData(prev => ({ ...prev, ...updates }));
  }, []);

  return { formData, updateFormData };
};

const Private = ({ onPublic }) => {
  // Use custom hooks
  const { openModal, closeModal, isModalOpen, isAnyModalOpen } =
    useModalManager();
  const { toggleDropdown, closeAllDropdowns, isDropdownOpen } =
    useDropdownManager();
  const { formData, updateFormData } = useFormState();

  // State for UI and API
  const [eventImage, setEventImage] = useState(null);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [uploadResponse, setUploadResponse] = useState(null);
  const [response, setResponse] = useState(null);

  // Add to List states (using object for better performance)
  const [addedComponents, setAddedComponents] = useState({
    dressCode: false,
    description: false,
    chipIn: false,
    eventType: false,
  });

  const navigate = useNavigate();

  // Memoized computed values
  const isPreviewEnabled = useMemo(() => {
    return (
      formData.eventName.trim() !== "" &&
      formData.startDate !== "" &&
      formData.location.trim() !== ""
    );
  }, [formData.eventName, formData.startDate, formData.location]);

  const fullDateTimeRange = useMemo(() => {
    const { startDate, startTime, endDate, endTime } = formData;
    if (!startDate || !startTime) return "when is your event?";

    if (!endDate || !endTime) return `${startDate}, ${startTime}`;

    return startDate === endDate
      ? `${startDate}, ${startTime} - ${endTime}`
      : `${startDate}, ${startTime} - ${endDate}, ${endTime}`;
  }, [
    formData.startDate,
    formData.startTime,
    formData.endDate,
    formData.endTime,
  ]);

  const locationDisplayText = useMemo(() => {
    const { locationType, location, state } = formData;
    switch (locationType) {
      case "online":
        return `Online - ${location}`;
      case "offline":
        return `${location}, ${state}`;
      default:
        return "Where is your event?";
    }
  }, [formData.locationType, formData.location, formData.state]);

  const getCurrentImageUrl = useCallback(() => {
    return eventImage?.imageUrl;
  }, [eventImage]);

  const eventTypesDisplay = useMemo(() => {
    if (formData.selectedTypes.length === 0) return null;

    return (
      <div className="flex flex-wrap gap-2">
        {formData.selectedTypes.map((event, index) => (
          <span
            key={`${event.title}-${index}`}
            className={`px-2 py-1 rounded-full border text-[10px] ${event.className}`}
          >
            {event.title}
          </span>
        ))}
      </div>
    );
  }, [formData.selectedTypes]);

  // Prevent scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = isAnyModalOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isAnyModalOpen]);

  // Set default image on component mount
  useEffect(() => {
    if (!eventImage && DEFAULT_IMAGE_SOURCES.length > 0) {
      setEventImage({
        type: "template",
        imageSrc: DEFAULT_IMAGE_SOURCES[0],
        imageUrl: DEFAULT_IMAGE_SOURCES[0],
      });
    }
  }, [eventImage]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    document.addEventListener("click", closeAllDropdowns);
    return () => document.removeEventListener("click", closeAllDropdowns);
  }, [closeAllDropdowns]);

  // Optimized handlers using useCallback
  const handleImageSave = useCallback(imageData => {
    setEventImage(imageData);

    if (imageData.type === "template") {
      setIsImageLoading(true);
      setTimeout(() => setIsImageLoading(false), 300);
    } else if (imageData.type === "upload") {
      setTimeout(() => setIsImageLoading(false), 200);
    }
  }, []);

  const handleFormFieldSave = useCallback(
    (field, value) => {
      if (typeof value === "object" && value !== null) {
        updateFormData(value);
      } else {
        updateFormData({ [field]: value });
      }
    },
    [updateFormData]
  );

  const handleChipInSave = useCallback(
    async chipInData => {
      updateFormData({
        amount: chipInData.amount,
        chipInType: chipInData.chipInType,
        bankCode: chipInData.selectedBankCode,
        bankName: chipInData.selectedBankName,
        accountNumber: chipInData.accountNumber,
        accountName: chipInData.accountName,
      });
      return null;
    },
    [updateFormData]
  );

  const handleTimeSave = useCallback(
    timeData => {
      updateFormData({
        startDate: timeData.startDate,
        startTime: timeData.startTime,
        endDate: timeData.endDate,
        endTime: timeData.endTime,
      });
    },
    [updateFormData]
  );

  const handleLocationSave = useCallback(
    locationData => {
      updateFormData({
        location: locationData.venue,
        locationType: locationData.locationType,
        state: locationData.state,
      });
    },
    [updateFormData]
  );

  const handleEventTypeSave = useCallback(
    selectedEventType => {
      if (selectedEventType) {
        updateFormData({ selectedTypes: selectedEventType.data });
      }
    },
    [updateFormData]
  );

  const handleDescriptionSave = useCallback(
    descriptionData => {
      updateFormData({
        descriptionText: descriptionData.data,
        descriptionDisplay: descriptionData.displayText,
      });
    },
    [updateFormData]
  );

  // Component management handlers
  const toggleComponent = useCallback(
    (componentName, shouldAdd) => {
      setAddedComponents(prev => ({
        ...prev,
        [componentName]: shouldAdd,
      }));

      if (!shouldAdd) {
        closeAllDropdowns();
        // Clear related form data when removing component
        switch (componentName) {
          case "dressCode":
            updateFormData({ dressCode: "" });
            break;
          case "description":
            updateFormData({ descriptionText: "", descriptionDisplay: "" });
            break;
          case "chipIn":
            updateFormData({
              amount: "",
              chipInType: "",
              bankCode: "",
              bankName: "",
              accountNumber: "",
              accountName: "",
            });
            break;
          case "eventType":
            updateFormData({ selectedTypes: [] });
            break;
        }
      }
    },
    [closeAllDropdowns, updateFormData]
  );

  const handleImageUpload = useCallback(async file => {
    setIsImageLoading(true);
    try {
      const fileExtension = file.name.split(".").pop();
      const response = await API.post(`/upload`, {
        type: "event_temp",
        fileExtension: fileExtension,
      });

      const { uploadUrl, fileKey } = response.data;

      await axios.put(uploadUrl, file, {
        headers: { "Content-Type": file.type },
      });

      const getImg = import.meta.env.VITE_IMAGE_URL;
      const evtImg = `${getImg}/${fileKey}`;

      setUploadResponse(response.data);

      return {
        success: true,
        imageUrl: evtImg,
        imageKey: fileKey,
      };
    } catch (error) {
      console.error("Image upload failed:", error);
      throw error;
    }
  }, []);

  const handleCreateEvent = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setResponse(null);

    if (!formData.eventName || !formData.startDate || !formData.location) {
      setError(
        "Please fill all required fields (Event Name, Date, and Location)"
      );
      setIsLoading(false);
      return;
    }

    openModal(MODAL_TYPES.CREATING_EVENT);

    const payload = {
      title: formData.eventName,
      description: formData.descriptionText,
      date: formData.startDate,
      timeFrom: formData.startTime,
      timeTo: formData.endTime,
      hostName: formData.hostName,
      location: {
        venue: formData.location,
        state: formData.state,
        country: "Nigeria",
      },
      isPrivate: true,
      dressCode: formData.dressCode,
      tempImageKey: uploadResponse?.fileKey,
      ...(formData.amount && {
        chipInAmount: formData.amount,
        chipInType: formData.chipInType,
        chipInSettings: { fixedAmount: formData.amount },
        bankDetails: {
          bankName: formData.bankName,
          accountNumber: formData.accountNumber,
          accountName: formData.accountName,
          bankCode: formData.bankCode,
        },
      }),
      eventTypes: formData.selectedTypes.map(type => type.title),
      theme: 1,
      fontStyle: 1,
      isLightMode: true,
    };

    try {
      const apiResponse = await API.post(`/events`, payload);
      console.log("Event creation response:", apiResponse.data);
      setResponse(apiResponse.data);
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
  }, [formData, uploadResponse, openModal]);

  // Modal handlers
  const modalHandlers = useMemo(
    () => ({
      [MODAL_TYPES.PREVIEW]: () => openModal(MODAL_TYPES.PREVIEW),
      [MODAL_TYPES.IMAGE]: () => openModal(MODAL_TYPES.IMAGE),
      [MODAL_TYPES.DESCRIPTION]: () => openModal(MODAL_TYPES.DESCRIPTION),
      [MODAL_TYPES.HOST]: () => openModal(MODAL_TYPES.HOST),
      [MODAL_TYPES.WHEN]: () => openModal(MODAL_TYPES.WHEN),
      [MODAL_TYPES.WHERE]: () => openModal(MODAL_TYPES.WHERE),
      [MODAL_TYPES.DRESS]: () => openModal(MODAL_TYPES.DRESS),
      [MODAL_TYPES.CHIPIN]: () => openModal(MODAL_TYPES.CHIPIN),
      [MODAL_TYPES.EVENT_TYPE]: () => openModal(MODAL_TYPES.EVENT_TYPE),
    }),
    [openModal]
  );

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
            {!isImageLoading ? (
              <img
                src={getCurrentImageUrl()}
                alt="Event image"
                className="rounded-3xl sm:w-[349px] sm:h-[349px] w-[306px] h-[306px] backdrop-blur-[12px] object-cover cursor-pointer"
                onClick={modalHandlers[MODAL_TYPES.IMAGE]}
              />
            ) : (
              <div className="rounded-3xl sm:w-[349px] sm:h-[349px] w-[306px] h-[306px] bg-white/60 flex items-center justify-center">
                <LoadingSpinner size={40} color="#61B42D" />
              </div>
            )}
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
              onChange={e => updateFormData({ eventName: e.target.value })}
              value={formData.eventName}
              className="appearance-none bg-transparent border-none text-2xl font-[400] leading-[32px] text-black placeholder-[#8A9191] focus:outline-none paytone"
            />
          </div>

          <Grid title="event details">
            <Input
              leftImgSrc="/timer.svg"
              text={fullDateTimeRange}
              onClick={modalHandlers[MODAL_TYPES.WHEN]}
              className={
                formData.startDate || formData.endDate
                  ? "text-black"
                  : "text-[#8A9191]"
              }
            />
            <Input
              leftImgSrc="/location-try.svg"
              text={locationDisplayText}
              onClick={modalHandlers[MODAL_TYPES.WHERE]}
              className={formData.location ? "text-black" : "text-[#8A9191]"}
            />
            <Input
              leftImgSrc="/crown.svg"
              text={formData.hostName || "who is the host?"}
              onClick={modalHandlers[MODAL_TYPES.HOST]}
              className={formData.hostName ? "text-black" : "text-[#8A9191]"}
            />

            {addedComponents.dressCode && (
              <Input
                leftImgSrc="/dress.svg"
                text={formData.dressCode || "enter dress code"}
                onClick={modalHandlers[MODAL_TYPES.DRESS]}
                rightImg="/more-circle.svg"
                onClickRight={e => toggleDropdown("dress", e)}
                showDropdown={isDropdownOpen("dress")}
                edit={modalHandlers[MODAL_TYPES.DRESS]}
                remove={() => toggleComponent("dressCode", false)}
                className={formData.dressCode ? "text-black" : "text-[#8A9191]"}
              />
            )}

            {addedComponents.description && (
              <Input
                leftImgSrc="/note-text.svg"
                text={formData.descriptionDisplay || "event description"}
                onClick={modalHandlers[MODAL_TYPES.DESCRIPTION]}
                rightImg="/more-circle.svg"
                onClickRight={e => toggleDropdown("description", e)}
                showDropdown={isDropdownOpen("description")}
                edit={modalHandlers[MODAL_TYPES.DESCRIPTION]}
                remove={() => toggleComponent("description", false)}
                className={
                  formData.descriptionDisplay ? "text-black" : "text-[#8A9191]"
                }
              />
            )}

            {addedComponents.chipIn && (
              <Input
                leftImgSrc="/money-add.svg"
                text={
                  formData.amount
                    ? `${formData.chipInType} - ₦${formData.amount}`
                    : "chip-in"
                }
                onClick={modalHandlers[MODAL_TYPES.CHIPIN]}
                rightImg="/more-circle.svg"
                onClickRight={e => toggleDropdown("chipIn", e)}
                showDropdown={isDropdownOpen("chipIn")}
                edit={modalHandlers[MODAL_TYPES.CHIPIN]}
                remove={() => toggleComponent("chipIn", false)}
                className={formData.amount ? "text-black" : "text-[#8A9191]"}
              />
            )}

            {addedComponents.eventType && (
              <Input
                leftImgSrc="/category-2.svg"
                text={eventTypesDisplay || "what type of event is this?"}
                onClick={modalHandlers[MODAL_TYPES.EVENT_TYPE]}
                rightImg="/more-circle.svg"
                onClickRight={e => toggleDropdown("eventType", e)}
                showDropdown={isDropdownOpen("eventType")}
                edit={modalHandlers[MODAL_TYPES.EVENT_TYPE]}
                remove={() => toggleComponent("eventType", false)}
                className="text-[#8A9191]"
              />
            )}

            <div className="flex flex-wrap gap-2 w-full">
              {!addedComponents.dressCode && (
                <Add
                  title="dress code"
                  onOptionClick={() => toggleComponent("dressCode", true)}
                />
              )}
              {!addedComponents.description && (
                <Add
                  title="description"
                  onOptionClick={() => toggleComponent("description", true)}
                />
              )}
              {!addedComponents.eventType && (
                <Add
                  title="event type"
                  onOptionClick={() => toggleComponent("eventType", true)}
                />
              )}
            </div>
          </Grid>

          {error && (
            <div className="flex text-[12px] text-[#C7245A] rounded-2xl p-2 gap-2 satoshi font-medium bg-[#FBEAEF] border border-[#F4BCCF]">
              <img src="/info-circle.svg" alt="" />
              <span>{error}</span>
            </div>
          )}

          {/* Create Event Buttons */}
          <section className="h-fit w-full lg:flex justify-between gap-4 hidden">
            <CreateEventBtn
              text="View Preview"
              bgcolor={isPreviewEnabled ? "bg-[#E6F2F3]" : "bg-gray-300"}
              textcolor={isPreviewEnabled ? "text-[#095256]" : "text-gray-500"}
              onClick={modalHandlers[MODAL_TYPES.PREVIEW]}
              disabled={!isPreviewEnabled}
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
      <section className="fixed bottom-0 left-0 right-0 w-full h-20 px-4 pt-6 pb-6 rounded-t-2xl bg-white/90 backdrop-blur-md lg:hidden grid gap-4 z-20 border-t border-white/20 shadow-lg">
        <section className="h-fit w-full flex justify-between gap-4">
          <CreateEventBtn
            text="View Preview"
            bgcolor={isPreviewEnabled ? "bg-[#E6F2F3]" : "bg-gray-300"}
            textcolor={isPreviewEnabled ? "text-[#095256]" : "text-gray-500"}
            onClick={modalHandlers[MODAL_TYPES.PREVIEW]}
            disabled={!isPreviewEnabled}
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
      <When
        isVisible={isModalOpen(MODAL_TYPES.WHEN)}
        onClose={() => closeModal(MODAL_TYPES.WHEN)}
        onSave={handleTimeSave}
      />
      <Where
        isVisible={isModalOpen(MODAL_TYPES.WHERE)}
        onClose={() => closeModal(MODAL_TYPES.WHERE)}
        onSave={handleLocationSave}
      />
      <Host
        isVisible={isModalOpen(MODAL_TYPES.HOST)}
        onClose={() => closeModal(MODAL_TYPES.HOST)}
        onSave={hostName => handleFormFieldSave("hostName", hostName)}
      />
      <ImageModal
        onClose={() => closeModal(MODAL_TYPES.IMAGE)}
        isOpen={isModalOpen(MODAL_TYPES.IMAGE)}
        onSave={handleImageSave}
        handleImageUpload={handleImageUpload}
        onUpload={handleImageUpload}
        banks={banks}
      />
      <Description
        isVisible={isModalOpen(MODAL_TYPES.DESCRIPTION)}
        onClose={() => closeModal(MODAL_TYPES.DESCRIPTION)}
        onSave={handleDescriptionSave}
      />
      <DressCode
        isVisible={isModalOpen(MODAL_TYPES.DRESS)}
        onClose={() => closeModal(MODAL_TYPES.DRESS)}
        onSave={dressCode => handleFormFieldSave("dressCode", dressCode)}
      />
      <ChipIn
        isVisible={isModalOpen(MODAL_TYPES.CHIPIN)}
        onClose={() => closeModal(MODAL_TYPES.CHIPIN)}
        onSave={handleChipInSave}
        banks={banks}
      />
      <EventType
        isVisible={isModalOpen(MODAL_TYPES.EVENT_TYPE)}
        onClose={() => closeModal(MODAL_TYPES.EVENT_TYPE)}
        onSave={handleEventTypeSave}
      />

      {isModalOpen(MODAL_TYPES.PREVIEW) && (
        <Preview
          closeModal={() => closeModal(MODAL_TYPES.PREVIEW)}
          eventImg={getCurrentImageUrl()}
          eventName={formData.eventName}
          hostName={formData.hostName}
          description={formData.descriptionText}
          dressCode={formData.dressCode}
          state={formData.state}
          location={formData.location}
          locationType={formData.locationType}
          amount={formData.amount}
          eventTypes={eventTypesDisplay}
          time={fullDateTimeRange}
        />
      )}

      {isModalOpen(MODAL_TYPES.CREATING_EVENT) && (
        <div className="fixed inset-0 h-screen flex items-center justify-center z-30 bg-[#00000080]/50 backdrop-blur-[4px]">
          <div className="sm:w-[90%] w-fit max-w-[546px] h-fit rounded-3xl border border-white/50 bg-[#F0F0F0] backdrop-blur-[32px] flex flex-col justify-center items-center">
            <div className="grid size-fit sm:gap-4 gap-2 sm:py-12 sm:px-6 px-10 py-4">
              <img
                src={getCurrentImageUrl()}
                alt=""
                className="sm:size-[220px] size-[120px] border border-white rounded-3xl mx-auto object-cover"
              />
              <div className="grid w-full h-fit gap-2 text-center">
                <h1 className="paytone capitalize text-black font-[400] text-[30px] leading-[38px]">
                  {formData.eventName}
                </h1>
                <div className="flex gap-1 items-center w-fit h-fit mx-auto">
                  <img src="/calendar.svg" className="w-4 h-4" />
                  <h6 className="text-[#8A9191] sm:text-[16px] text-[12px] font-[500] sm:leading-[24px] satoshi capitalize">
                    {formData.startDate}
                  </h6>
                  <img src="/timer.svg" className="w-4 h-4" />
                  <h6 className="text-[#8A9191] sm:text-[16px] text-[12px] font-[500] sm:leading-[24px] satoshi capitalize">
                    {formData.startTime}
                  </h6>
                </div>
              </div>
            </div>

            <div className="bg-white w-full h-fit grid sm:gap-4 sm:py-6 sm:px-12 gap-4 p-4 rounded-b-3xl">
              {/* Error State */}
              {error && (
                <>
                  <div className="flex sm:text-[12px] text-[10px] text-[#C7245A] rounded-2xl p-2 gap-2 satoshi font-medium bg-[#FBEAEF] border border-[#F4BCCF]">
                    <img src="/info-circle.svg" alt="" />
                    <span>{error}</span>
                  </div>
                  <section className="h-fit w-full flex justify-between gap-4">
                    <CreateEventBtn
                      text="Cancel"
                      bgcolor="bg-[#F3F0FB]"
                      textcolor="text-[#7A60BF]"
                      onClick={() => {
                        closeModal(MODAL_TYPES.CREATING_EVENT);
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
                <div className="flex sm:text-[12px] text-[10px] text-[#7A60BF] rounded-2xl p-2 gap-2 satoshi font-medium bg-[#F3F0FB] border border-[#D9D1F1]">
                  <LoadingSpinner />
                </div>
              )}

              {/* Success State */}
              {!isLoading && !error && response && (
                <>
                  <div className="flex sm:text-[12px] text-[10px] text-[#61B42D] rounded-2xl p-2 gap-2 satoshi font-medium bg-[#F3FFEC] border border-[#C8FEA7]">
                    <img src="/tick-circle.svg" alt="" />
                    <span>Event has been created successfully</span>
                  </div>
                  <section className="h-fit w-full flex justify-between gap-4">
                    <CreateEventBtn
                      text="Home"
                      bgcolor="bg-[#F3F0FB] hover:opacity-50"
                      textcolor="text-[#7A60BF]"
                      onClick={() => {
                        closeModal(MODAL_TYPES.CREATING_EVENT);
                        useEventStore.getState().setShouldRefetch(true);
                        navigate(`/home`);
                      }}
                      disabled={!response?.id}
                    />
                    {/* <CreateEventBtn
                      text="Manage Event"
                      textcolor="text-white"
                      bgcolor="bg-[#011F0F]"
                      onClick={() => {
                        closeModal(MODAL_TYPES.CREATING_EVENT);
                        useEventStore.getState().setShouldRefetch(true);
                      
                        if (response?.id) {
                          navigate(`/event/${response.id}`); // Navigate only if ID exists
                          console.log("Navigated to event:", response.id);
                        } else {
                          console.error("No event ID found in response");
                        }
                      }}

                    /> */}
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
