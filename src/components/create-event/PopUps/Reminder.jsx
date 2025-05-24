import React, { useState, useEffect, useCallback } from "react";
import CreateEventBtn from "../Layout-conponents/CreateEventBtn";
import When from "./PopUps/When";
import Where from "./PopUps/Where";
import Host from "./PopUps/Host";
import Description from "./PopUps/Description";
import DressCode from "./PopUps/DressCode";
import ChipIn from "./PopUps/ChipIn";

// Extracted component definitions
const Grid = ({ children, title, buttom }) => {
  return (
    <div className="grid w-full h-fit gap-3">
      <h4 className="text-black text-[14px] font-[700] leading-[20px] satoshi capitalize">
        {title}
      </h4>
      {children}
      <div className="flex gap-4 w-full flex-wrap">{buttom}</div>
    </div>
  );
};

const Input = ({ leftImgSrc, text, onClickRight, onClick, rightImg }) => {
  return (
    <div
      className="flex justify-between p-3 gap-4 rounded-[12px] bg-white/50 border border-white items-center w-full cursor-pointer"
      onClick={onClick}
    >
      {/* Left Image */}
      <div className="bg-white p-1 rounded-4xl size-fit">
        <img src={leftImgSrc} alt={`${text} icon`} className="w-5 h-4" />
      </div>

      {/* Middle Text */}
      <div className="text-left w-full text-[#8A9191] font-medium text-[14px] capitalize satoshi">
        {text}
      </div>

      {/* Right Image */}
      {rightImg && (
        <img
          src={rightImg}
          alt="More options"
          className="size-4 cursor-pointer"
          onClick={onClickRight}
        />
      )}
    </div>
  );
};

const Add = ({ title, onOptionClick }) => {
  return (
    <div
      className="py-2 px-3 flex gap-2 bg-white/80 rounded-[20px] size-fit border border-white justify-center items-center cursor-pointer"
      onClick={onOptionClick}
    >
      <img src="add.svg" alt="Add icon" className="size-4" />
      <h6 className="font-bold text-black text-[14px] capitalize satoshi">
        {title}
      </h6>
    </div>
  );
};

// Main component
const Private = ({ onPublic }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [eventName, setEventName] = useState("");
  const [eventImage, setEventImage] = useState(null);
  
  // Consolidated event data state
  const [eventData, setEventData] = useState({});

  // States to manage two separate lists of added inputs
  const [addedInputsListOne, setAddedInputsListOne] = useState([]);
  const [addedInputsListTwo, setAddedInputsListTwo] = useState([]);
  
  // State for context menu/popup
  const [showPopup, setShowPopup] = useState(false);
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });
  const [activeItem, setActiveItem] = useState(null);

  // Handle body overflow when modal is open
  useEffect(() => {
    document.body.style.overflow = isModalVisible ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isModalVisible]);

  // Close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (showPopup) {
        setShowPopup(false);
      }
    };
    
    if (showPopup) {
      document.addEventListener("click", handleClickOutside);
    }
    
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showPopup]);

  // Modal control functions
  const openModal = useCallback((type) => {
    setIsModalVisible(true);
    setModalType(type);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalVisible(false);
    setModalType(null);
  }, []);

  // Function to add inputs to the first list with display text
  const handleAddToListOne = useCallback((title, input, displayText) => {
    setAddedInputsListOne((prev) => {
      // Don't add duplicates
      if (prev.some(item => item.title === title)) {
        return prev.map(item => 
          item.title === title ? { ...item, input, displayText } : item
        );
      }
      return [...prev, { title, input, displayText }];
    });
  }, []);

  // Function to add inputs to the second list with display text
  const handleAddToListTwo = useCallback((title, input, displayText) => {
    setAddedInputsListTwo((prev) => {
      // Don't add duplicates
      if (prev.some(item => item.title === title)) {
        return prev.map(item => 
          item.title === title ? { ...item, input, displayText } : item
        );
      }
      return [...prev, { title, input, displayText }];
    });
  }, []);

  // Check if a specific item is added to list one
  const isAddedToListOne = useCallback((title) => 
    addedInputsListOne.some((item) => item.title === title),
  [addedInputsListOne]);

  // Check if a specific item is added to list two
  const isAddedToListTwo = useCallback((title) => 
    addedInputsListTwo.some((item) => item.title === title),
  [addedInputsListTwo]);

  // Function to remove item from list one
  const removeFromListOne = useCallback((title) => {
    setAddedInputsListOne((prev) =>
      prev.filter((item) => item.title !== title)
    );
    setShowPopup(false);

    // Also remove from event data
    setEventData(prev => {
      const newData = {...prev};
      delete newData[title];
      return newData;
    });
  }, []);

  // Function to remove item from list two
  const removeFromListTwo = useCallback((title) => {
    setAddedInputsListTwo((prev) =>
      prev.filter((item) => item.title !== title)
    );
    setShowPopup(false);

    // Also remove from event data
    setEventData(prev => {
      const newData = {...prev};
      delete newData[title];
      return newData;
    });
  }, []);

  // Handle right icon click to show popup
  const handleRightIconClick = useCallback((event, item) => {
    event.stopPropagation();
    setActiveItem(item);
    setPopupPosition({
      x: event.clientX,
      y: event.clientY,
    });
    setShowPopup(true);
  }, []);

  // Handle saving data from modals
  const handleSaveModalData = useCallback((data) => {
    if (!data || !modalType) return;
    
    // Store event data
    setEventData(prev => ({
      ...prev,
      [modalType]: data.data // Store the actual data
    }));
    
    // For main inputs (when, where, host) add to list one
    if (['when', 'where', 'host'].includes(modalType)) {
      const mainInput = mainInputs.find(input => input.key === modalType);
      if (mainInput) {
        // Create a new Input component with the data
        const inputComponent = (
          <Input
            leftImgSrc={mainInput.leftImgSrc}
            text={data.displayText || mainInput.text}
            onClick={() => openModal(modalType)}
            rightImg="more-circle.svg"
            onClickRight={(e) => handleRightIconClick(e, { title: modalType })}
          />
        );
        handleAddToListOne(modalType, inputComponent, data.displayText);
      }
    } 
    // For optional inputs add to list two
    else {
      const optionalInput = optionalInputs.find(input => input.key === modalType);
      if (optionalInput) {
        // Create a new Input component with the data
        const inputComponent = (
          <Input
            leftImgSrc={optionalInput.leftImgSrc}
            text={data.displayText || optionalInput.text}
            onClick={() => openModal(modalType)}
            rightImg="more-circle.svg"
            onClickRight={(e) => handleRightIconClick(e, { title: modalType })}
          />
        );
        handleAddToListTwo(modalType, inputComponent, data.displayText);
      }
    }
    
    closeModal();
  }, [closeModal, handleAddToListOne, handleAddToListTwo, handleRightIconClick, modalType, openModal]);

  const renderModal = useCallback(() => {
    if (!isModalVisible) return null;

    const commonProps = {
      isVisible: isModalVisible,
      onClose: closeModal,
      onSave: handleSaveModalData,
      initialData: eventData[modalType] || null,
    };

    switch (modalType) {
      case "when":
        return <When {...commonProps} />;
      case "where":
        return <Where {...commonProps} />;
      case "host":
        return <Host {...commonProps} />;
      case "description":
        return <Description {...commonProps} />;
      case "dress code":
        return <DressCode {...commonProps} />;
      case "chip in":
        return <ChipIn {...commonProps} />;
      default:
        return null;
    }
  }, [isModalVisible, closeModal, handleSaveModalData, modalType, eventData]);

  // Handle image upload
  const handleImageUpload = useCallback((e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert("File size should be less than 2MB");
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (event) => {
        setEventImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  // Handle event creation
  const handleCreateEvent = useCallback(() => {
    // Validate minimum required fields
    if (!eventName) {
      alert("Please enter an event name");
      return;
    }
    
    if (!eventData.when || !eventData.where || !eventData.host) {
      alert("Please fill in all required event details (When, Where, and Host)");
      return;
    }
    
    // Prepare event data for submission
    const completeEventData = {
      name: eventName,
      image: eventImage,
      isPrivate: true,
      ...eventData
    };
    
    console.log("Creating event with data:", completeEventData);
    // Here you would normally submit this data to your backend
  }, [eventData, eventImage, eventName]);

  // Define main inputs with their configurations
  const mainInputs = [
    {
      key: "when",
      leftImgSrc: "timer.svg",
      text: "When is your event?",
      modalType: "when",
    },
    {
      key: "where",
      leftImgSrc: "location-try.svg",
      text: "Where is your event?",
      modalType: "where",
    },
    {
      key: "host",
      leftImgSrc: "crown.svg",
      text: "Who is the host?",
      modalType: "host",
    },
  ];

  // Define optional inputs
  const optionalInputs = [
    {
      title: "Description",
      key: "description",
      leftImgSrc: "note-text.svg",
      text: "Event description",
      modalType: "description",
    },
    {
      title: "Dress Code",
      key: "dress code",
      leftImgSrc: "dress.svg",
      text: "Enter dress code",
      modalType: "dress code",
    },
    {
      title: "Chip In",
      key: "chip in",
      leftImgSrc: "money-add.svg",
      text: "Enter chip in details",
      modalType: "chip in",
    },
  ];

  return (
    <main className="bg-[#F0F0F0] min-h-[90vh] h-fit w-full grid gap-[43px] px-20 py-10">
      <div className="flex justify-center gap-12 flex-wrap">
        {/* left section */}
        <section className="w-fit h-fit grid gap-4">
          <div className="grid h-fit">
            <h5 className="text-black text-[14px] font-[700] leading-[20px] satoshi capitalize">
              event image
            </h5>
            <p className="text-[#8A9191] text-[12px] font-[500] leading-[18px] satoshi capitalize">
              Upload a JPEG or PNG file with a size of 2mb or less
            </p>
          </div>
          <div className="relative">
            <label htmlFor="event-image-upload" className="cursor-pointer">
              <img
                src={eventImage || "private.png"}
                alt="Event preview"
                className="rounded-3xl sm:w-[349px] sm:h-[349px] w-[333px] h-[306px] backdrop-blur-[12px] object-cover"
              />
              <div className="absolute hidden top-[303px] left-[302px] rounded-full lg:flex items-center justify-center h-8 w-8 bg-white">
                <img src="image.svg" className="z-10" alt="Upload icon" />
              </div>
            </label>
            <input 
              type="file" 
              id="event-image-upload" 
              accept="image/jpeg, image/png"
              className="hidden"
              onChange={handleImageUpload}
            />
          </div>
          <div className="flex justify-center p-2 items-start bg-[#F3F0FB]">
            <p className="text-[#7A60BF] text-[12px] font-[500] leading-[18px] satoshi capitalize">
              Images with a 1 : 1 ratio (a square) work best
            </p>
          </div>
          <div className="flex p-3 gap-2 rounded-[12px] bg-white/50 border border-white backdrop-blur-[2px] items-center w-full">
            <h5 className="text-[#8A9191] text-[16px] font-[700] leading-[24px] satoshi capitalize w-full">
              theme settings
            </h5>
            <div className="aspect-square size-[47px] py-3 px-2 flex justify-center items-center rounded-[6px] backdrop-blur-[12px] border border-[#866AD2]"></div>
          </div>
        </section>

        {/* right section */}
        <section className="grid gap-6 items-start w-fit lg:w-[553px] h-fit">
          <div className="grid gap-2">
            <div
              style={{
                boxShadow: "0px 4px 24px 0px rgba(0, 0, 0, 0.08)",
                backdropFilter: "blur(16px)",
              }}
              className="flex p-[4px] rounded-[20px] bg-white w-fit h-fit"
            >
              <div className="items-center py-1 px-[10px] rounded-3xl bg-[#BEFD66] cursor-pointer">
                <h5 className="text-black text-[10px] font-[700] leading-[14px] satoshi capitalize">
                  private
                </h5>
              </div>
              <div
                className="items-center py-1 px-[10px] rounded-3xl bg-white cursor-pointer"
                onClick={onPublic}
              >
                <h5 className="text-black text-[10px] font-[700] leading-[14px] satoshi capitalize">
                  public
                </h5>
              </div>
            </div>
            <p className="text-[#8A9191] text-[12px] font-[500] leading-[18px] satoshi capitalize">
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
              aria-label="Event name"
            />
          </div>
          <Grid
            title="Event Details"
            buttom={
              <>
                {optionalInputs.map(
                  (option) =>
                    !isAddedToListOne(option.key) && !isAddedToListTwo(option.key) && (
                      <Add
                        key={option.key}
                        title={option.title}
                        onOptionClick={() => openModal(option.modalType)}
                      />
                    )
                )}
              </>
            }
          >
            {/* Render main inputs that haven't been filled out yet */}
            {mainInputs.map((input) => 
              !isAddedToListOne(input.key) ? (
                <Input
                  key={input.key}
                  leftImgSrc={input.leftImgSrc}
                  text={input.text}
                  onClick={() => openModal(input.modalType)}
                />
              ) : null
            )}
            
            {/* Render filled out inputs from list one */}
            {addedInputsListOne.map((item, index) => (
              <React.Fragment key={`list1-${index}-${item.title}`}>
                {item.input}
              </React.Fragment>
            ))}
            
            {/* Render filled out inputs from list two */}
            {addedInputsListTwo.map((item, index) => (
              <React.Fragment key={`list2-${index}-${item.title}`}>
                {item.input}
              </React.Fragment>
            ))}
            
            {/* Popup menu for edit/remove */}
            {showPopup && activeItem && (
              <div
                className="absolute bg-white shadow-lg rounded-[8px] py-2 px-4 z-10 w-fit h-fit"
                style={{
                  top: `${popupPosition.y}px`,
                  left: `${popupPosition.x}px`,
                  transform: "translate(-80%, -100%)",
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <div
                  className="px-4 py-2 hover:scale-110 cursor-pointer flex items-center"
                  onClick={() => {
                    // Find the input type to edit
                    const mainInput = mainInputs.find(
                      (input) => input.key === activeItem.title
                    );
                    const optionalInput = optionalInputs.find(
                      (opt) => opt.key === activeItem.title
                    );
                    
                    const inputToEdit = mainInput || optionalInput;
                    if (inputToEdit) openModal(inputToEdit.modalType);
                    setShowPopup(false);
                  }}
                >
                  <span className="font-medium text-sm satoshi text-black">Edit</span>
                </div>
                <div
                  className="px-4 py-2 hover:scale-110 cursor-pointer flex items-center"
                  onClick={() => {
                    // Determine which list to remove from
                    if (isAddedToListOne(activeItem.title)) {
                      removeFromListOne(activeItem.title);
                    } else if (isAddedToListTwo(activeItem.title)) {
                      removeFromListTwo(activeItem.title);
                    }
                  }}
                >
                  <span className="font-medium text-sm satoshi text-black hover:text-red-500">Remove</span>
                </div>
              </div>
            )}
          </Grid>

          {/* Create Event Buttons */}
          <section className="h-fit w-full flex justify-between gap-4 flex-wrap">
            <CreateEventBtn
              text="View Preview"
              bgcolor="bg-[#E6F2F3]"
              textcolor="text-[#095256]"
              onClick={() => console.log("Preview data:", { eventName, eventImage, eventData })}
            />
            <CreateEventBtn
              text="Create Event"
              textcolor="text-[#095256]"
              bgcolor="bg-[#aefc40]"
              onClick={handleCreateEvent}
            />
          </section>
        </section>
      </div>
      {renderModal()}
    </main>
  );
};

export default Private;