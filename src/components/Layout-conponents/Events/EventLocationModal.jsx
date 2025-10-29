import TextButton from "../Buttons/TextButtons";
import Modal from "../Modal/Modal";
import Tabs from "../Tabs/Tabs";
import FormGroup from "../Inputs/FormGroup";
import InputField from "../Inputs/InputField";
import InputIcon from "@/assets/icons/InputIcon";
import SelectInput from "../Inputs/SelectInput";
import TagButton from "../Buttons/TagButton";
import {
  ArrowDown2,
  Building,
  InfoCircle,
  Location,
  Routing,
  Trash,
  Video,
} from "iconsax-reactjs";
import { useModalContext } from "../Modal/ModalContext";
import { useState } from "react";
import { states } from "@/lib/utils";

// All tabs
const tabs = [
  { id: "offline", label: "Offline" },
  { id: "online", label: "Online" },
];

export default function EventLocationModal({ onSave }) {
  const { close } = useModalContext();
  const [location, setLocation] = useState("");
  const [showVenueInput, setShowVenueInput] = useState(false);
  const [showDirectionsInput, setShowDirectionsInput] = useState(false);

  return (
    <Modal.Window name="event-location" title="Where is the Event?">
      {/* Content goes here */}
      <div className="satoshi font-bold text-sm text-[#010E1F]">
        <div className="flex flex-col gap-y-12">
          {/* Tab list */}
          <Tabs defaultTab="offline" className="flex flex-col gap-y-4">
            <Tabs.List list={tabs} btnStyles="min-w-[87px]" />
            {/* Online tab */}
            <Tabs.Panel name="online">
              <FormGroup label="Enter Link">
                <InputField
                  placeholder="Paste the meeting link here"
                  leftIcon={
                    <InputIcon>
                      <Video size={16} variant="Bold" color="#001010" />
                    </InputIcon>
                  }
                />
              </FormGroup>
            </Tabs.Panel>
            {/* Offline tab */}
            <Tabs.Panel name="offline">
              <FormGroup label="Select a state">
                <SelectInput
                  value={location}
                  setValue={setLocation}
                  options={states}
                  placeholder="Choose one"
                  icon={
                    <InputIcon>
                      <Location size={16} variant="Bold" color="#001010" />
                    </InputIcon>
                  }
                />
              </FormGroup>
              {showVenueInput ? (
                <>
                  <div className="flex flex-col gap-y-1">
                    <FormGroup label="Venue">
                      <InputField
                        placeholder="Enter venue"
                        leftIcon={
                          <InputIcon>
                            <Building
                              color="#001010"
                              size={16}
                              variant="Bold"
                            />
                          </InputIcon>
                        }
                      />
                    </FormGroup>
                    <TagButton
                      size="sm"
                      text="remove"
                      rightImg={
                        <Trash variant="Bold" size={12} color="#DB2863" />
                      }
                      className="text-[#DB2863] satoshi"
                      onClick={() => setShowVenueInput(false)}
                    />
                  </div>
                  {showDirectionsInput ? (
                    <div className="flex flex-col gap-y-1">
                      <FormGroup label="Direction">
                        <InputField
                          placeholder="Apartment number, Take the right, etc."
                          leftIcon={
                            <InputIcon>
                              <Routing
                                color="#001010"
                                size={16}
                                variant="Bold"
                              />
                            </InputIcon>
                          }
                        />
                      </FormGroup>
                      <TagButton
                        size="sm"
                        text="remove"
                        rightImg={
                          <Trash variant="Bold" size={12} color="#DB2863" />
                        }
                        className="text-[#DB2863] satoshi"
                        onClick={() => setShowDirectionsInput(false)}
                      />
                    </div>
                  ) : (
                    <div className="flex flex-col gap-y-1">
                      <TextButton
                        variant="secondary"
                        text="Add Further Directions"
                        rightImg={
                          <ArrowDown2
                            variant="Outline"
                            size={16}
                            color="#011F0F"
                          />
                        }
                        onClick={() => setShowDirectionsInput(true)}
                        className="sm:min-w-[123px] min-w-full"
                      />
                      <div className="flex items-center gap-x-1">
                        <InfoCircle variant="Bold" size={16} color="#8A9191" />
                        <span className="text-[10px] leading-[14px] font-medium text-[#001010]">
                          Optional
                        </span>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="flex flex-col gap-y-1">
                  <TextButton
                    variant="secondary"
                    text="What venue is hosting this event?"
                    rightImg={
                      <ArrowDown2 variant="Outline" size={16} color="#011F0F" />
                    }
                    onClick={() => setShowVenueInput(true)}
                    className="sm:min-w-[123px] min-w-full"
                  />
                  <div className="flex items-center gap-x-1">
                    <InfoCircle variant="Bold" size={16} color="#8A9191" />
                    <span className="text-[10px] leading-[14px] font-medium text-[#001010]">
                      Optional
                    </span>
                  </div>
                </div>
              )}
            </Tabs.Panel>
          </Tabs>
          <div className="flex items-center justify-center md:justify-start gap-x-4">
            <TextButton text="Cancel" variant="tertiary" onClick={close} />
            <TextButton text="Save" />
          </div>
        </div>
      </div>
    </Modal.Window>
  );
}
