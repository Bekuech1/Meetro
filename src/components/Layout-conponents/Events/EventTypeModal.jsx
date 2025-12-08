import TextButton from "../Buttons/TextButtons";
import Modal from "../Modal/Modal";
import TagButton from "../Buttons/TagButton";
import { useState } from "react";
import { useModalContext } from "../Modal/ModalContext";
import { TickCircle } from "iconsax-reactjs";

const eventTypes = [
  {
    name: "Nightlife & parties",
    color: "!text-[#011F0F]",
  },
  { name: "Music & Concerts", color: "!text-[#4A3A74]" },
  { name: "Networking & Conferences", color: "!text-[#077D8A]" },
  { name: "Festivals & Cultural Events", color: "!text-[#496A1B]" },
  { name: "Sports & Fitness", color: "!text-[#5856D6]" },
  { name: "Food & Drink Events", color: "!text-[#9B1C46]" },
  { name: "Tech & Innovation", color: "!text-[#011F0F]" },
  { name: "Community Meetups", color: "!text-[#0A84FF]" },
  { name: "Art & Exhibitions", color: "!text-[#CF7E00]" },
  { name: "Outdoor & Adventure", color: "!text-[#B25000]" },
  { name: "Gaming & Esports", color: "!text-[#269E44]" },
  { name: "Charity & Fundraisers", color: "!text-[#8125AF]" },
];

export default function EventTypeModal({ onSave }) {
  const { close } = useModalContext();
  const [categories, setCategories] = useState([]);

  // Check if even is selected
  const selected = event => categories.includes(event.name);

  return (
    <Modal.Window name="event-type" title="What type of Event?">
      {/* Content goes here */}
      <div className="satoshi font-bold text-sm text-[#010E1F]">
        <div className="flex flex-col gap-y-12">
          <div className="flex flex-col gap-y-4">
            <h3 className="text-sm text-[#8A9191] font-medium">
              Pick a vibe! Music, Tech, Networking, Food, Sports—you name it.
            </h3>
            <div className="flex flex-wrap gap-2">
              {/* Render event type buttons */}
              {eventTypes.map((eventType, i) => (
                <TagButton
                  key={i}
                  text={eventType.name}
                  variant={`${selected(eventType) ? "purple" : "tertiary"}`}
                  className={`${!selected(eventType) ? eventType.color : ""}`}
                  onClick={() =>
                    setCategories(s =>
                      s.includes(eventType.name)
                        ? s.filter(e => e !== eventType.name)
                        : [...s, eventType.name]
                    )
                  }
                  rightImg={
                    selected(eventType) && <TickCircle variant="Bold" />
                  }
                />
              ))}
            </div>
          </div>
          <div className="flex items-center justify-center md:justify-start gap-x-4">
            <TextButton text="Cancel" variant="tertiary" onClick={close} />
            <TextButton text="Save" />
          </div>
        </div>
      </div>
    </Modal.Window>
  );
}
