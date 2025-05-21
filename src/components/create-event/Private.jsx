import React, { useState, useEffect } from "react";
import CreateEventBtn from "../Layout-conponents/CreateEventBtn";
import When from "./PopUps/When";
import Where from "./PopUps/Where";
import Host from "./PopUps/Host";
import Description from "./PopUps/Description";
import DressCode from "./PopUps/DressCode";
import ChipIn from "./PopUps/ChipIn";

const Private = ({ onPublic }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [eventName, setEventName] = useState("");
  const [eventImage, setEventImage] = useState(null);

  useEffect(() => {
    document.body.style.overflow = isModalVisible ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [isModalVisible]);

  const openModal = (content) => {
    setIsModalVisible(true);
    setModalContent(content);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setModalContent(null);
  };

  // States to manage two separate lists of added inputs
  const [addedInputsListOne, setAddedInputsListOne] = useState([]);
  const [addedInputsListTwo, setAddedInputsListTwo] = useState([]);

  // Function to add inputs to the first list
  const handleAddToListOne = (title, input) => {
    setAddedInputsListOne((prev) => [...prev, { title, input }]);
  };

  // Function to add inputs to the second list
  const handleAddToListTwo = (title, input) => {
    setAddedInputsListTwo((prev) => [...prev, { title, input }]);
  };

  // Check if a specific item is added to list one
  const isAddedToListOne = (title) =>
    addedInputsListOne.some((item) => item.title === title);

  // Check if a specific item is added to list two
  const isAddedToListTwo = (title) =>
    addedInputsListTwo.some((item) => item.title === title);

  const renderContent = (type) => {
    switch (type) {
      case "when":
        return (
          <When
            isVisible={isModalVisible}
            onClose={closeModal}
            onSave={() => console.log("when")}
          />
        );
      case "where":
        return (
          <Where
            isVisible={isModalVisible}
            onClose={closeModal}
            onSave={() => console.log("where")}
          />
        );
      case "host":
        return (
          <Host
            isVisible={isModalVisible}
            onClose={closeModal}
            onSave={() => console.log("host")}
          />
        );
      case "description":
        return (
          <Description
            isVisible={isModalVisible}
            onClose={closeModal}
            onSave={() => console.log("host")}
          />
        );
      case "dress code":
        return (
          <DressCode
            isVisible={isModalVisible}
            onClose={closeModal}
            onSave={() => console.log("host")}
          />
        );
      case "chip in":
        return (
          <ChipIn
            isVisible={isModalVisible}
            onClose={closeModal}
            onSave={() => console.log("host")}
          />
        );
      default:
        return null;
    }
  };

  return (
    <main className="bg-[#F0F0F0] min-h-[90vh] h-fit w-full grid gap-[43px] px-20 py-10">
      <div className="flex justify-center gap-12">
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
            <img
              src="private.png"
              alt="Event-img"
              className="rounded-3xl sm:w-[349px] sm:h-[349px] w-[333px] h-[306px] backdrop-blur-[12px]"
            />
            <div className="absolute hidden top-[303px] left-[302px] rounded-full lg:flex items-center justify-center h-8 w-8 bg-white">
              <img src="image.svg" className="z-10" alt="" />
            </div>
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
              Shh... it’s exclusive! Only those with the magic link can RSVP.
            </p>
          </div>
          <div className="grid p-3 gap-4 rounded-[12px] bg-white/50 border border-white items-center w-full">
            <input
              type="text"
              placeholder="Event name"
              onChange={(e) => setEventName(e.target.value)}
              value={eventName}
              class="appearance-none bg-transparent border-none text-2xl font-[400] leading-[32px] text-black placeholder-[#8A9191] focus:outline-none paytone"
            />
          </div>
          <Grid
            title="Event Details"
            buttom={
              <>
                {!isAddedToListOne("dress code") && (
                  <Add
                    title="Dress Code"
                    onOptionClick={() =>
                      handleAddToListOne(
                        "dress code",
                        <Input leftImgSrc="dress.svg" text="Enter dress code"   
                        onClickRight={() => openModal("dress code")} />
                      )
                    }
                  />
                )}
                {!isAddedToListOne("chip in") && (
                  <Add
                    title="Chip In"
                    onOptionClick={() =>
                      handleAddToListOne(
                        "chip in",
                        <Input
                          leftImgSrc="money-add.svg"
                          text="Enter chip in details"
                          onClickRight={() => openModal("chip in")}
                        />
                      )
                    }
                  />
                )}
              </>
            }
          >
            {[
              <Input
                leftImgSrc="timer.svg"
                text="When is your event?"
                key="timer"
                onClickRight={() => openModal(renderContent("when"))}
              />,
              <Input
                leftImgSrc="location.svg"
                text="Where is your event?"
                key="location"
                onClickRight={() => openModal(renderContent("where"))}
              />,
              <Input
                leftImgSrc="crown.svg"
                text="Who is the host?"
                key="host"
                onClickRight={() => openModal(renderContent("host"))}
              />,
              <Input
                leftImgSrc="note-text.svg"
                text="Event description"
                key="description"
                onClickRight={() => openModal(renderContent("description"))}
              />,
              ...addedInputsListOne.map((item, index) => (
                <React.Fragment key={index}>{item.input}</React.Fragment>
              )),
            ]}
          </Grid>

          {/* Second Grid */}
          {/* <Grid
            title="RSVP Settings"
            buttom={
              <>
                {!isAddedToListTwo("guest approval") && (
                  <Add
                    title="Require Guest Approval"
                    onOptionClick={() =>
                      handleAddToListTwo(
                        "guest approval",
                        <Input
                          leftImgSrc="note-text.svg"
                          text="Enter guest approval settings"
                        />
                      )
                    }
                  />
                )}
                {!isAddedToListTwo("entry code") && (
                  <Add
                    title="Require Entry Code"
                    onOptionClick={() =>
                      handleAddToListTwo(
                        "entry code",
                        <Input
                          leftImgSrc="note-text.svg"
                          text="Enter entry code details"
                        />
                      )
                    }
                  />
                )}
              </>
            }
          >
            {[
              <Input
                leftImgSrc="note-text.svg"
                text="RSVP settings"
                key="rsvp"
              />,
              <Input
                leftImgSrc="note-text.svg"
                text="Enter bank details"
                key="bank"
              />,
              <Input
                leftImgSrc="note-text.svg"
                text="Set reminders"
                key="reminder"
              />,
              ...addedInputsListTwo.map((item, index) => (
                <React.Fragment key={index}>{item.input}</React.Fragment>
              )),
            ]}
          </Grid> */}

          {/* Create Event Buttons */}
          <section className="h-fit w-full flex justify-between gap-4">
            <CreateEventBtn
              text="View Preview"
              bgcolor="bg-[#E6F2F3]"
              textcolor="text-[#095256]"
              onClick={() => console.log("View Preview Clicked")}
            />
            <CreateEventBtn
              text="Create Event"
              textcolor="text-[#095256]"
              bgcolor="bg-[#aefc40]"
              onClick={() => console.log("Create Event Clicked")}
            />
          </section>
        </section>
      </div>
      {modalContent}
    </main>
  );
};

export default Private;

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

const Input = ({ leftImgSrc, text, onClickRight }) => {
  return (
    <div className="flex justify-between p-3 gap-4 rounded-[12px] bg-white/50 border border-white items-center w-full">
      {/* Left Image */}
      <div className="bg-white p-1 rounded-4xl size-fit">
        <img src={leftImgSrc} alt="" className="w-5 h-4" />
      </div>

      {/* Middle Text */}
      <div className="text-left w-full text-[#8A9191] font-medium text-[14px] capitalize satoshi">
        {text}
      </div>

      {/* Right Image */}
      <img
        src="more-circle.svg"
        alt="Right Icon"
        className="size-4 cursor-pointer"
        onClick={onClickRight}
      />
    </div>
  );
};

const Add = ({ title, onOptionClick }) => {
  return (
    <div
      className="py-2 px-3 flex gap-2 bg-white/80 rounded-[20px] size-fit border border-white justify-center items-center cursor-pointer"
      onClick={onOptionClick}
    >
      <img src="add.svg" alt="" className="size-4" />
      <h6 className="font-bold text-black text-[14px] capitalize satoshi">
        {title}
      </h6>
    </div>
  );
};
