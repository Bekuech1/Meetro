import TagButton from "../Buttons/TagButton";
import TextButton from "../Buttons/TextButtons";
import SelectDate from "../Inputs/SelectDate";
import FormGroup from "../Inputs/FormGroup";
import InputGroup from "../Inputs/InputGroup";
import SelectTime from "../Inputs/SelectTime";
import Modal from "../Modal/Modal";
import { ArrowDown2, InfoCircle, Trash } from "iconsax-reactjs";
import { useModalContext } from "../Modal/ModalContext";
import { useState } from "react";

export default function EventDateModal({ onSave }) {
  const { close } = useModalContext();
  const [startDate, setStartDate] = useState("");
  const [startDateTime, setStartDateTime] = useState("");
  const [endDate, setEndDate] = useState("");
  const [endDateTime, setEndDateTime] = useState("");
  const [showEndDateInputs, setShowEndDateInputs] = useState(false);
  return (
    <Modal.Window name="event-date" title="When is the Event?">
      {/* Content goes here */}
      <div className="satoshi font-bold text-sm text-[#010E1F]">
        <div className="flex flex-col gap-y-12">
          <div className="flex flex-col gap-y-4">
            <FormGroup label="Start Date">
              <InputGroup>
                <SelectDate
                  className="rounded-r-none"
                  date={startDate}
                  setDate={setStartDate}
                />
                <SelectTime
                  time={startDateTime}
                  setTime={setStartDateTime}
                  className="rounded-l-none"
                />
              </InputGroup>
            </FormGroup>
            <div className="flex flex-col gap-y-1">
              {showEndDateInputs ? (
                <>
                  <FormGroup label="End Date">
                    <InputGroup>
                      <SelectDate
                        className="rounded-r-none"
                        date={endDate}
                        setDate={setEndDate}
                      />
                      <SelectTime
                        time={endDateTime}
                        setTime={setEndDateTime}
                        className="rounded-l-none"
                      />
                    </InputGroup>
                  </FormGroup>
                  <TagButton
                    size="sm"
                    text="remove"
                    rightImg={
                      <Trash variant="Bold" size={12} color="#DB2863" />
                    }
                    className="text-[#DB2863] satoshi"
                    onClick={() => setShowEndDateInputs(false)}
                  />
                </>
              ) : (
                <>
                  <TextButton
                    variant="secondary"
                    text="Add End Date"
                    rightImg={
                      <ArrowDown2 variant="Outline" size={16} color="#011F0F" />
                    }
                    onClick={() => setShowEndDateInputs(true)}
                    className="sm:min-w-[123px] min-w-full"
                  />
                  <div className="flex items-center gap-x-1">
                    <InfoCircle variant="Bold" size={16} color="#8A9191" />
                    <span className="text-[10px] leading-[14px] font-medium text-[#001010]">
                      Optional
                    </span>
                  </div>
                </>
              )}
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
