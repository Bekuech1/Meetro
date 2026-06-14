import TagButton from "../Buttons/TagButton";
import TextButton from "../Buttons/TextButtons";
import FormGroup from "../Inputs/FormGroup";
import InputGroup from "../Inputs/InputGroup";
import SelectDate from "../Inputs/SelectDate";
import SelectTime from "../Inputs/SelectTime";
import Modal from "../Modal/Modal";
import React, { useEffect, useState } from "react";
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
  // Local state to manage date inputs
  const [newDates, setNewDates] = useState({
    startDate: data?.startDate || null,
    endDate: data?.endDate || null,
  });

  const [showEndDateInputs, setShowEndDateInputs] = useState(
    data?.endDate ? true : false
  );

  // Reset to initial values
  const resetValues = () => {
    setValidation({ startDate: "", endDate: "" });
    setNewDates(data);
    setShowEndDateInputs(data?.endDate ? true : false);
  };

  // Error state for validation
  const [validation, setValidation] = useState({
    startDate: "",
    endDate: "",
  });

  const hasEndDate = Boolean(newDates.endDate);

  const validateDates = () => {
    let isValid = true;
    const newValidation = { startDate: "", endDate: "" };

    // Convert to Date objects for reliable comparison
    const start = newDates.startDate ? new Date(newDates.startDate) : null;
    const end = newDates.endDate ? new Date(newDates.endDate) : null;

    // 1. Check if start date is provided
    if (!newDates.startDate) {
      newValidation.startDate = "Start date is required.";
      isValid = false;
    }

    // 2. Validate End Date logic
    if (showEndDateInputs) {
      if (!newDates.endDate) {
        newValidation.endDate = "End date is required.";
        isValid = false;
      } else if (start && end && end < start) {
        // Comparison is safer with Date objects or .getTime()
        newValidation.endDate = "End date cannot be before start date.";
        isValid = false;
      }
    }

    setValidation(newValidation);
    return isValid;
  };

  // Close modal
  const { close } = useModalContext();

  // Sync showEndDateInputs with presence of endDate in data when modal opens
  useEffect(() => {
    setNewDates({
      startDate: data?.startDate || null,
      endDate: data?.endDate || null,
    });
    setShowEndDateInputs(data?.endDate ? true : false);
  }, [data?.endDate, data?.startDate]);
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
            <FormGroup
              label="Start Date"
              message={
                validation.startDate
                  ? {
                      type: "error",
                      text: validation.startDate,
                    }
                  : null
              }
            >
              <InputGroup>
                <SelectDate
                  className="rounded-r-none"
                  date={newDates.startDate}
                  setDate={date => {
                    setNewDates(prev => ({
                      ...prev,
                      startDate: applyDatePreservingTime(date, prev.startDate),
                    }));
                    setValidation(prev => ({ ...prev, startDate: "" }));
                  }}
                />
                <SelectTime
                  time={newDates.startDate}
                  setTime={time => {
                    setNewDates(prev => ({
                      ...prev,
                      startDate: applyTimeToDate(prev.startDate, time),
                    }));
                    setValidation(prev => ({ ...prev, startDate: "" }));
                  }}
                  className="rounded-l-none"
                />
              </InputGroup>
            </FormGroup>
            <div className="flex flex-col gap-y-1">
              {showEndDateInputs ? (
                <React.Fragment>
                  <FormGroup
                    label="End Date"
                    message={
                      validation.endDate
                        ? {
                            type: "error",
                            text: validation.endDate,
                          }
                        : null
                    }
                  >
                    <InputGroup>
                      <SelectDate
                        className="rounded-r-none"
                        date={newDates.endDate}
                        setDate={date => {
                          setNewDates(prev => ({
                            ...prev,
                            endDate: applyDatePreservingTime(
                              date,
                              prev.endDate
                            ),
                          }));
                          setValidation(prev => ({ ...prev, endDate: "" }));
                        }}
                      />
                      <SelectTime
                        time={newDates.endDate}
                        setTime={time => {
                          setNewDates(prev => ({
                            ...prev,
                            endDate: applyTimeToDate(prev.endDate, time),
                          }));
                          setValidation(prev => ({ ...prev, endDate: "" }));
                        }}
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
                if (!validateDates()) return;

                const payload = {
                  startDate: newDates.startDate,
                };
                if (hasEndDate) {
                  payload.endDate = newDates.endDate;
                }
                onSave(payload);
                close();
              }}
            />
          </div>
        </div>
      </div>
    </Modal.Window>
  );
}
