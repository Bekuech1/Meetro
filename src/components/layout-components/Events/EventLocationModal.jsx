import TextButton from "../Buttons/TextButtons";
import Modal from "../Modal/Modal";
import Tabs from "../Tabs/Tabs";
import FormGroup from "../Inputs/FormGroup";
import InputField from "../Inputs/InputField";
import InputIcon from "@/assets/icons/InputIcon";
import SelectInput from "../Inputs/SelectInput";
import TagButton from "../Buttons/TagButton";
import React, { useEffect, useState } from "react";
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
import { states } from "@/lib/utils";

// All tabs
const tabs = [
  { id: "offline", label: "Offline" },
  { id: "online", label: "Online" },
];

export default function EventLocationModal({
  onSave,
  locationData,
  eventType,
  meetingURL,
}) {
  const { close } = useModalContext();
  // Local state to manage form inputs, initialized with existing location data if available

  const initialLocationState = {
    venue: locationData?.venue || "",
    state: locationData?.state || "",
    city: locationData?.city || "",
    coordinates: locationData?.coordinates || null,
    directions: locationData?.directions || "",
  };
  const [newLocation, setNewLocation] = useState(initialLocationState);

  // Separate state for meeting URL to avoid confusion with location fields
  const [newMeetingURL, setNewMeetingURL] = useState(meetingURL || "");

  // State to track selected event type tab
  const [newEventType, setNewEventType] = useState(eventType || "offline");

  // Handle save action based on selected event type
  const [venueSuggestions, setVenueSuggestions] = useState([]);
  const [isSearchingVenue, setIsSearchingVenue] = useState(false);
  const [showVenueSuggestions, setShowVenueSuggestions] = useState(false);
  const [showVenueInput, setShowVenueInput] = useState(
    locationData?.venue ? true : false
  );
  const [showDirectionsInput, setShowDirectionsInput] = useState(
    locationData?.directions ? true : false
  );

  // State to manage validation errors
  const [validation, setValidation] = useState({
    meetingURL: "",
    venue: "",
    directions: "",
    state: "",
  });

  // Effect to fetch venue suggestions when user types in the venue input
  useEffect(() => {
    const searchQuery = newLocation.venue.trim();
    if (searchQuery.length < 3) {
      setVenueSuggestions([]);
      setIsSearchingVenue(false);
      return;
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(async () => {
      try {
        setIsSearchingVenue(true);
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=jsonv2&addressdetails=1&limit=5&countrycodes=ng&q=${encodeURIComponent(searchQuery)}`,
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error("Unable to fetch location suggestions");
        }

        const data = await response.json();

        const suggestions = data
          .filter(item => item.address?.country_code?.toLowerCase() === "ng")
          .map(item => ({
            id: item.place_id,
            label: `${item.name}${item.address?.road ? ", " + item.address.road : ""}${item.address?.suburb ? ", " + item.address.suburb : ""}${item.address?.state ? ", " + item.address.state : ""}`,
            value: `${item.name}${item.address?.road ? ", " + item.address.road : ""}${item.address?.suburb ? ", " + item.address.suburb : ""}`,
            state:
              item.address?.state ||
              item.address?.city ||
              item.address?.county ||
              "",
            coordinates: {
              lat: item.lat,
              lng: item.lon,
            },
          }));

        setVenueSuggestions(suggestions);
      } catch (error) {
        if (error.name !== "AbortError") {
          setVenueSuggestions([]);
        }
      } finally {
        setIsSearchingVenue(false);
      }
    }, 350);

    return () => {
      clearTimeout(timeoutId);
      controller.abort();
    };
  }, [newLocation.venue]);

  // Handle venue selection from suggestions
  const handleVenueSelect = suggestion => {
    setNewLocation(prev => ({
      ...prev,
      venue: suggestion.value,
    }));
    // If the suggestion includes a state, extract it and set it in the location state
    if (suggestion.state) {
      const state = suggestion.state.replace(/ State$/, "").trim();
      setNewLocation(prev => ({
        ...prev,
        state: state,
      }));
    }
    // If the suggestion includes coordinates, set them in the location state
    if (suggestion.coordinates) {
      setNewLocation(prev => ({
        ...prev,
        coordinates: suggestion.coordinates,
      }));
    }
    setVenueSuggestions([]);
    setShowVenueSuggestions(false);
  };

  // Reset values
  const resetValues = () => {
    setValidation({
      meetingURL: "",
      venue: "",
      directions: "",
      state: "",
    });
    setNewLocation(initialLocationState);
    setNewMeetingURL(meetingURL || "");
    setNewEventType(eventType || "offline");
    setShowVenueInput(locationData?.venue ? true : false);
    setShowDirectionsInput(locationData?.directions ? true : false);
  };

  // Handle save action
  const handleSave = () => {
    if (!validateFields()) return;

    switch (newEventType) {
      case "online":
        onSave({
          eventType: "online",
          meetingURL: newMeetingURL,
        });
        setNewLocation({
          venue: "",
          state: "",
          city: "",
          coordinates: null,
          directions: "",
        });
        setShowVenueInput(false);
        setShowDirectionsInput(false);
        break;
      case "offline":
        onSave({
          eventType: "offline",
          location: {
            ...newLocation,
          },
        });
        setNewMeetingURL("");
        break;
      default:
        break;
    }
    close();
  };

  // Validation function to check required fields based on event type
  const validateFields = () => {
    let isValid = true;
    const newValidation = {
      meetingURL: "",
      venue: "",
      directions: "",
      state: "",
    };
    if (newEventType === "online") {
      if (!newMeetingURL.trim()) {
        newValidation.meetingURL = "Meeting URL is required.";
        isValid = false;
      } else if (!/^https?:\/\/\S+$/.test(newMeetingURL.trim())) {
        newValidation.meetingURL = "Please enter a valid URL.";
        isValid = false;
      }
    } else if (newEventType === "offline") {
      if (!newLocation.state.trim()) {
        newValidation.state = "State is required.";
        isValid = false;
      }
      if (showVenueInput && !newLocation.venue.trim()) {
        newValidation.venue = "Venue is required.";
        isValid = false;
      }
      if (showDirectionsInput && !newLocation.directions.trim()) {
        newValidation.directions = "Directions are required.";
        isValid = false;
      }
    }
    setValidation(newValidation);
    return isValid;
  };

  // Sync local state with incoming props when modal opens
  useEffect(() => {
    setNewLocation(initialLocationState);
    setNewMeetingURL(meetingURL || "");
    setNewEventType(eventType || "offline");
    setShowVenueInput(locationData?.venue ? true : false);
    setShowDirectionsInput(locationData?.directions ? true : false);
  }, [locationData, meetingURL, eventType]);

  return (
    <Modal.Window
      name="event-location"
      title="Where is the Event?"
      onClose={resetValues}
    >
      {/* Content goes here */}
      <div className="satoshi font-bold text-sm text-[#010E1F]">
        <div className="flex flex-col gap-y-12">
          {/* Tab list */}
          <Tabs defaultTab={newEventType} className="flex flex-col gap-y-4">
            <Tabs.List
              list={tabs}
              btnStyles="min-w-[87px]"
              onChange={eventType => {
                setNewEventType(eventType);
              }}
            />
            {/* Online tab */}
            <Tabs.Panel name="online">
              <FormGroup
                label="Enter Link"
                message={
                  validation.meetingURL
                    ? {
                        text: validation.meetingURL,
                        type: "error",
                      }
                    : null
                }
              >
                <InputField
                  placeholder="Paste the meeting link here"
                  value={newMeetingURL}
                  onChange={event => setNewMeetingURL(event.target.value)}
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
              <FormGroup
                label="Select a state"
                message={
                  validation.state
                    ? {
                        text: validation.state,
                        type: "error",
                      }
                    : null
                }
              >
                <SelectInput
                  value={newLocation.state}
                  setValue={value =>
                    setNewLocation(prev => ({ ...prev, state: value }))
                  }
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
                <React.Fragment>
                  <div className="flex flex-col gap-y-1">
                    <FormGroup
                      label="Venue"
                      message={
                        validation.venue
                          ? {
                              text: validation.venue,
                              type: "error",
                            }
                          : null
                      }
                    >
                      <div className="relative">
                        <InputField
                          placeholder="Enter venue"
                          value={newLocation.venue}
                          onChange={event => {
                            setNewLocation(prev => ({
                              ...prev,
                              venue: event.target.value,
                            }));
                            setShowVenueSuggestions(true);
                          }}
                          onFocus={() => {
                            if (venueSuggestions.length > 0) {
                              setShowVenueSuggestions(true);
                            }
                          }}
                          onBlur={() => {
                            setTimeout(() => {
                              setShowVenueSuggestions(false);
                            }, 120);
                          }}
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
                        {showVenueSuggestions &&
                          (isSearchingVenue || venueSuggestions.length > 0) && (
                            <div className="absolute z-20 mt-1 w-full rounded-xl border border-[#E5E7E3] satoshi bg-white shadow-lg overflow-hidden">
                              {isSearchingVenue ? (
                                <p className="px-3 py-2 text-xs font-medium text-[#8A9191]">
                                  Searching address...
                                </p>
                              ) : (
                                <ul className="max-h-48 overflow-y-auto py-1">
                                  {venueSuggestions.map(suggestion => (
                                    <li
                                      key={suggestion.id}
                                      className="overflow-hidden"
                                    >
                                      <button
                                        type="button"
                                        onClick={() =>
                                          handleVenueSelect(suggestion)
                                        }
                                        className="w-full px-3 py-2 text-left text-xs font-medium text-[#001010] hover:bg-[#F8F8F7]"
                                      >
                                        {suggestion.label}
                                      </button>
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </div>
                          )}
                      </div>
                    </FormGroup>
                    <TagButton
                      size="sm"
                      text="remove"
                      rightImg={
                        <Trash variant="Bold" size={12} color="#DB2863" />
                      }
                      className="text-[#DB2863] satoshi"
                      onClick={() => {
                        setShowVenueInput(false);
                        setNewLocation(prev => {
                          const { venue, coordinates, ...rest } = prev;
                          return {
                            ...rest,
                            venue: "",
                            coordinates: null,
                          };
                        });
                      }}
                    />
                  </div>
                  {showDirectionsInput ? (
                    <div className="flex flex-col gap-y-1">
                      <FormGroup
                        label="Direction"
                        message={
                          validation.directions
                            ? {
                                text: validation.directions,
                                type: "error",
                              }
                            : null
                        }
                      >
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
                          onChange={event =>
                            setNewLocation(prev => ({
                              ...prev,
                              directions: event.target.value,
                            }))
                          }
                          value={newLocation.directions}
                        />
                      </FormGroup>
                      <TagButton
                        size="sm"
                        text="remove"
                        rightImg={
                          <Trash variant="Bold" size={12} color="#DB2863" />
                        }
                        className="text-[#DB2863] satoshi"
                        onClick={() => {
                          setShowDirectionsInput(false);
                          setNewLocation(prev => ({ ...prev, directions: "" }));
                        }}
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
                </React.Fragment>
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
            <TextButton
              text="Cancel"
              variant="tertiary"
              onClick={() => {
                close();
                resetValues();
              }}
            />
            <TextButton text="Save" onClick={handleSave} />
          </div>
        </div>
      </div>
    </Modal.Window>
  );
}
