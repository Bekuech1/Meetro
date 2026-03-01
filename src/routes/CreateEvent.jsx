import TagButton from "@/components/layout-components/Buttons/TagButton";
import ImageInput from "@/components/layout-components/Inputs/ImageInput";
import Alert from "@/components/layout-components/Alert";
import { ArrowLeft2, Eye, Calendar, Location, Crown, Moneys, Trash, Add, Timer1, Colorfilter, UserTick, Lock1, People } from "iconsax-reactjs";
import React, { useState } from "react";
import EventName from "@/components/layout-components/Inputs/EventName";
import TextButton from "@/components/layout-components/Buttons/TextButtons";
import ListInput from "@/components/layout-components/Inputs/ListInput";
// 👇 Imported the Toggle component
import Toggle from "@/components/layout-components/Selectors/Toggle";
import SelectDate from "@/components/layout-components/Inputs/SelectDate";

const CreateEvent = () => {
  // True = Private, False = Public
  const [isPrivate, setIsPrivate] = useState(true);

  // State to hold the event name input
  const [eventName, setEventName] = useState("");
  const [eventFont, setEventFont] = useState("paytone");

  // 1. One state to rule them all
  const [activeModal, setActiveModal] = useState(null); // e.g. "when" | "where" | "hosts" | "description" | "dressCode" | "chipIn"

  const openModal = (id) => setActiveModal(id);
  const closeModal = () => setActiveModal(null);

  // --- OPTIONAL FIELDS LOGIC ---
  const optionalFieldsData = [
    { id: "description", label: "Event description", Icon: Calendar },
    // { id: "images", label: "Upload images", Icon: Gallery },
    { id: "dressCode", label: "Dress code", Icon: Colorfilter },
    { id: "chipIn", label: "Chip in", Icon: Moneys },
  ];

  const [activeOptionals, setActiveOptionals] = useState(["description", "images", "dressCode", "chipIn"]);

  const removeOptionalField = (e, id) => {
    e.stopPropagation();
    setActiveOptionals((prev) => prev.filter((fieldId) => fieldId !== id));
  };

  const addOptionalField = (id) => {
    setActiveOptionals((prev) => [...prev, id]);
  };

  // --- EVENT SETTINGS LOGIC 👇 ---
  const [settings, setSettings] = useState({
    requireApproval: false,
    hideGuestList: true,
    allowPlusOnes: false,
  });

  const toggleFields = [
    {
      id: "requireApproval",
      title: "Require Approval",
      description: "Approve all guest before the event",
      icon: UserTick
    },
    {
      id: "entryCode",
      title: "Entry Code",
      description: "Require attendees to enter a code",
      icon: Lock1
    },
    {
      id: "attendeeLimit",
      title: "Attendee Limit",
      description: "Set a limit to the number of attendees",
      icon: People
    },
  ];

  const handleToggle = (settingId) => {
    const needsInput = ["entryCode", "attendeeLimit"];

    setSettings((prev) => ({ ...prev, [settingId]: !prev[settingId] }));

    // Only open modal when turning ON a field that needs extra input
    if (needsInput.includes(settingId) && !settings[settingId]) {
      openModal(settingId);
    }
  };

  return (
    <div className="py-10 px-50 flex flex-col items-center gap-8 bg-[#F0F0F0] min-h-screen">

      {/* Header / Nav */}
      <div className="flex justify-between w-full max-w-[956px]">
        <TagButton text="back" leftImg={<ArrowLeft2 />} />
        <TagButton text="view preview" rightImg={<Eye variant="Bold" />} />
      </div>

      {/* Main Form Area */}
      <div className="w-full max-w-[956px] flex flex-col gap-8">

        {/* Top Section: Shared content + The Toggle Buttons */}
        <div className="flex justify-between items-start">

          {/* LEFT COLUMN: Event Image */}
          <section className="sm:w-fit w-full flex flex-col gap-4">
            <div className="grid w-full">
              <h5 className="text-black text-[14px] font-[700] leading-[20px] satoshi capitalize">
                Event Image
              </h5>
              <p className="text-[#8A9191] text-[12px] font-[500] leading-[18px] satoshi capitalize">
                Upload a JPEG or PNG file with a size of 2mb or less
              </p>
            </div>
            <ImageInput />
            <Alert title="Images with a 1 : 1 ratio (a square) work best" option="outline" />
          </section>

          {/* RIGHT COLUMN: Event Name & Toggle Buttons */}
          <section className="flex flex-col justify-items-start w-[553px] gap-6">

            {/* The Toggle Buttons */}
            <div className="grid gap-2">
              <div className="flex gap-2 p-0.5 bg-[#E5E7E3] rounded-full border border-[#F9F9F9] w-fit">
                <TagButton
                  size="md"
                  text="Private"
                  className={isPrivate ? "bg-white text-black border-0 hover:bg-white" : "bg-transparent text-gray-400 border-none hover:bg-transparent"}
                  onClick={() => setIsPrivate(true)}
                />
                <TagButton
                  size="md"
                  text="Public"
                  className={!isPrivate ? "bg-white text-black border-0 hover:bg-white" : "bg-transparent text-gray-400 border-none hover:bg-transparent"}
                  onClick={() => setIsPrivate(false)}
                />
              </div>

              <p className="text-[#8A9191] text-[12px] font-[500] leading-[18px] satoshi">
                {isPrivate
                  ? "Shh... it’s exclusive! Only those with the magic link can RSVP."
                  : "Anyone can discover and RSVP to this event on the platform."}
              </p>
            </div>

            <EventName
              value={eventName}
              font={eventFont}
              onChange={(e) => setEventName(e.target.value)}
              onSelect={(selectedFont) => setEventFont(selectedFont)}
            />

            <div className="grid gap-3">
              <TextButton
                text="Event Details"
                variant="tertiary"
                className="pointer-events-none w-full justify-start"
                onClick={() => { }}
              />

              {/* Permanent List Inputs */}
              <ListInput leftIcon={<Timer1 size={20} className="text-[#011F0F]" variant="Bold" />} placeholder="When is your event?" onClick={() => openModal("when")} />
              <ListInput leftIcon={<Location size={20} className="text-[#011F0F]" variant="Bold" />} placeholder="Where is your event?" onClick={() => openModal("where")} />
              <ListInput leftIcon={<Crown size={20} className="text-[#011F0F]" variant="Bold" />} placeholder="Who are the hosts?" onClick={() => openModal("who")} />

              {/* 1. Render ACTIVE Optional ListInputs */}
              {optionalFieldsData.map((field) => {
                if (!activeOptionals.includes(field.id)) return null;

                return (
                  <ListInput
                    key={field.id}
                    leftIcon={<field.Icon size={20} className="text-[#011F0F]" variant="Bold" />}
                    placeholder={field.label}
                    onClick={() => openModal(field.id)}
                    rightIcon={
                      <button
                        type="button"
                        onClick={(e) => removeOptionalField(e, field.id)}
                        className="hover:opacity-70 transition-opacity p-1 z-10"
                      >
                        <Trash size={16} className="text-[#292D32]" />
                      </button>
                    }
                  />
                );
              })}

              {/* 2. Render INACTIVE fields as TagButtons */}
              {optionalFieldsData.some((field) => !activeOptionals.includes(field.id)) && (
                <div className="flex flex-wrap gap-2">
                  {optionalFieldsData.map((field) => {
                    if (activeOptionals.includes(field.id)) return null;
                    return (
                      <TagButton
                        key={`add-${field.id}`}
                        text={field.label}
                        leftImg={<Add size={16} />}
                        onClick={() => addOptionalField(field.id)}
                        className="satoshi"
                        size="lg"
                      />
                    );
                  })}
                </div>
              )}
            </div>

            {/* 👇 The new Event Settings Grid */}
            <div className="grid gap-3">
              <TextButton
                text="Event Settings"
                variant="tertiary"
                className="pointer-events-none w-full justify-start bg-[#E5E7E3]"
                onClick={() => { }}
              />

              {/* Render the Toggle Settings */}
              {toggleFields.map((field) => (
                <ListInput
                  leftIcon={<field.icon size={20} className="text-[#011F0F]" variant="Bold" />}
                  key={field.id}
                  title={field.title}
                  content={field.description}
                  onClick={() => handleToggle(field.id)}
                  rightIcon={
                    <Toggle
                      props={{
                        checked: settings[field.id],
                        onChange: () => handleToggle(field.id),
                      }}
                    />
                  }
                />
              ))}

            </div>
          </section>
        </div>

        {/* Conditional Content: Only show if it's a Public Event */}
        {!isPrivate && (
          <div className="mt-8 p-6 border rounded-xl bg-gray-50">
            <h3 className="text-lg font-bold mb-4">Public Event Details</h3>
            <p className="text-gray-500">Extra settings for public events go here...</p>
          </div>
        )}

      </div>
      {/* Mount whichever modal is active */}
      {activeModal === "when" && <SelectDate onClose={closeModal} />}
    </div>
  );
};

export default CreateEvent;