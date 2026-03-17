import TagButton from "../Buttons/TagButton";
import TextButton from "../Buttons/TextButtons";
import FormGroup from "../Inputs/FormGroup";
import InputGroup from "../Inputs/InputGroup";
import SelectDate from "../Inputs/SelectDate";
import SelectTime from "../Inputs/SelectTime";
import Modal from "../Modal/Modal";
import React, { useState } from "react";
import { useModalContext } from "../Modal/ModalContext";
import { parseTimeValue } from "@/lib/utils";
import { ArrowDown2, InfoCircle, Trash } from "iconsax-reactjs";

// Utility functions to apply time to date and preserve time when changing date
function applyTimeToDate(baseDate, timeValue) {
  const parsedTime = parseTimeValue(timeValue);
  if (!parsedTime) {
    return baseDate;
  }

  const updatedDate = new Date(baseDate || new Date());
  updatedDate.setHours(parsedTime.hours, parsedTime.minutes, 0, 0);
  return updatedDate;
}

// Preserves time components of currentDateValue when changing the date with nextDateValue
function applyDatePreservingTime(nextDateValue, currentDateValue) {
  const nextDate = nextDateValue ? new Date(nextDateValue) : null;
  if (!nextDate) {
    return currentDateValue;
  }

  const updatedDate = new Date(nextDate);
  const currentDate = currentDateValue ? new Date(currentDateValue) : null;

  if (currentDate) {
    updatedDate.setHours(
      currentDate.getHours(),
      currentDate.getMinutes(),
      currentDate.getSeconds(),
      currentDate.getMilliseconds()
    );
  }

  return updatedDate;
}

export default function EventDateModal({ onSave, data }) {
  const [newDates, setNewDates] = useState({
    startDate: data?.startDate || null,
    endDate: data?.endDate || null,
  });

  const [showEndDateInputs, setShowEndDateInputs] = useState(
    data?.endDate ? true : false
  );

  // Reset to initial values
  const resetValues = () => {
    setNewDates(data);
    setShowEndDateInputs(data?.endDate ? true : false);
  };

  // Close modal
  const { close } = useModalContext();
  return (
    <Modal.Window
      name="event-date"
      title="When is the Event?"
      onClose={resetValues}
    >
      {/* Content goes here */}
      <div className="satoshi font-bold text-sm text-[#010E1F]">
        <div className="flex flex-col gap-y-12">
          <div className="flex flex-col gap-y-4">
            <FormGroup label="Start Date">
              <InputGroup>
                <SelectDate
                  className="rounded-r-none"
                  date={newDates.startDate}
                  setDate={date =>
                    setNewDates(prev => ({
                      ...prev,
                      startDate: applyDatePreservingTime(date, prev.startDate),
                    }))
                  }
                />
                <SelectTime
                  time={newDates.startDate}
                  setTime={time =>
                    setNewDates(prev => ({
                      ...prev,
                      startDate: applyTimeToDate(prev.startDate, time),
                    }))
                  }
                  className="rounded-l-none"
                />
              </InputGroup>
            </FormGroup>
            <div className="flex flex-col gap-y-1">
              {showEndDateInputs ? (
                <React.Fragment>
                  <FormGroup label="End Date">
                    <InputGroup>
                      <SelectDate
                        className="rounded-r-none"
                        date={newDates.endDate}
                        setDate={date =>
                          setNewDates(prev => ({
                            ...prev,
                            endDate: applyDatePreservingTime(
                              date,
                              prev.endDate
                            ),
                          }))
                        }
                      />
                      <SelectTime
                        time={newDates.endDate}
                        setTime={time =>
                          setNewDates(prev => ({
                            ...prev,
                            endDate: applyTimeToDate(prev.endDate, time),
                          }))
                        }
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
                    onClick={() => {
                      setShowEndDateInputs(false);
                      setNewDates(prev => ({ ...prev, endDate: null }));
                    }}
                  />
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <TextButton
                    variant="secondary"
                    text="Add End Date"
                    rightImg={
                      <ArrowDown2 variant="Outline" size={16} color="#011F0F" />
                    }
                    onClick={() => {
                      if (!newDates.endDate && data.endDate) {
                        setNewDates(prev => ({
                          ...prev,
                          endDate: data.endDate,
                        }));
                      }
                      setShowEndDateInputs(true);
                    }}
                    className="sm:min-w-[123px] min-w-full"
                  />
                  <div className="flex items-center gap-x-1">
                    <InfoCircle variant="Bold" size={16} color="#8A9191" />
                    <span className="text-[10px] leading-[14px] font-medium text-[#001010]">
                      Optional
                    </span>
                  </div>
                </React.Fragment>
              )}
            </div>
          </div>
          <div className="flex items-center justify-center md:justify-start gap-x-4">
            <TextButton
              text="Cancel"
              variant="tertiary"
              onClick={() => {
                close();
                resetValues();
              }}
            />
            <TextButton
              text="Save"
              onClick={() => {
                onSave(newDates);
                close();
              }}
            />
          </div>
        </div>
      </div>
    </Modal.Window>
  );
}
