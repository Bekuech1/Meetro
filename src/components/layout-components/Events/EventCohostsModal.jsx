import InputIcon from "@/assets/icons/InputIcon";
import Avatar from "../Avatar";
import IconButton from "../Buttons/IconButton";
import TagButton from "../Buttons/TagButton";
import TextButton from "../Buttons/TextButtons";
import FormGroup from "../Inputs/FormGroup";
import ImageInput from "../Inputs/ImageInput";
import InputField from "../Inputs/InputField";
import SelectInput from "../Inputs/SelectInput";
import Modal from "../Modal/Modal";
import { useModalContext } from "../Modal/ModalContext";
import { Crown, Sms, Trash, User } from "iconsax-reactjs";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

const roleOptions = [
  { id: 1, name: "Co-host" },
  { id: 2, name: "Moderator" },
  { id: 3, name: "Speaker" },
];

export default function EventCohostsModal({ onSave, cohostsData }) {
  const { close } = useModalContext();
  const [editedCohosts, setEditedCohosts] = useState(cohostsData || []);
  const [currentStep, setCurrentStep] = useState(1);
  const [hasAccount, setHasAccount] = useState(true);
  const [cohost, setCohost] = useState({
    email: "",
    role: "",
    photo: "",
    name: "",
    file: null,
  });

  // Validation state for form fields
  const [validation, setValidation] = useState({
    email: "",
    role: "",
    name: "",
  });

  // Initialize cohosts and step based on incoming data
  useEffect(() => {
    setEditedCohosts(cohostsData || []);
    if (cohostsData && cohostsData.length > 0) {
      setCurrentStep(2);
    } else {
      setCurrentStep(1);
    }
  }, [cohostsData]);

  // Validate form fields before adding a cohost
  const validateForm = () => {
    let isValid = true;
    const newValidation = { email: "", role: "", name: "" };
    if (!cohost.email) {
      newValidation.email = "Email is required";
      isValid = false;
    }
    if (!cohost.role) {
      newValidation.role = "Role is required";
      isValid = false;
    }
    if (!hasAccount) {
      if (!cohost.name) {
        newValidation.name = "Name is required";
        isValid = false;
      }
    }
    setValidation(newValidation);
    return isValid;
  };

  // Add a new cohost to the list
  const addCohost = () => {
    if (!validateForm()) return;
    setEditedCohosts(s => [...s, cohost]);
    setCohost({ email: "", role: "", photo: "", name: "", file: null });
    setCurrentStep(2);
  };

  // Reset all data to initial state
  const resetData = () => {
    setEditedCohosts(cohostsData || []);
    setCurrentStep(cohostsData.length > 0 ? 2 : 1);
    setHasAccount(true);
    setValidation({ email: "", role: "", name: "" });
    setCohost({ email: "", role: "", photo: "", name: "", file: null });
  };

  // Remove a cohost from the list by index
  const removeCohost = index => {
    setEditedCohosts(s => s.filter((_, i) => i !== index));
    if (editedCohosts.length === 1) {
      setHasAccount(true);
      setCurrentStep(1);
    }
  };

  // Navigate to the previous step
  const goToPreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setHasAccount(true);
    }
  };

  // Save the edited cohosts and close the modal
  const handleSave = () => {
    onSave?.(editedCohosts);
    close();
  };

  return (
    <Modal.Window
      name="event-cohosts"
      title={currentStep === 1 ? "Add Cohosts?" : "Review Cohosts"}
      onClose={resetData}
    >
      {/* Content goes here */}
      <div className="satoshi font-bold text-sm text-[#010E1F]">
        {currentStep === 1 ? (
          /* Step 1: Add Cohosts Form */
          <div className="flex flex-col gap-y-12">
            <div className="flex flex-col gap-4">
              {/* Cohost account status */}
              <div>
                <div className="border border-[#F9F9F9] p-[2px] bg-[#E5E7E3] rounded-full inline-flex items-center">
                  <TagButton
                    text="Has Meetro Account"
                    className={twMerge(
                      "satoshi min-w-auto h-7.5 px-3 hover:bg-transparent bg-transparent text-[#B0B5B5] border-transparent",
                      hasAccount && "bg-white text-[#011F0F] hover:bg-white"
                    )}
                    onClick={() => {
                      setHasAccount(true);
                      setValidation({ name: "", email: "", role: "" });
                      setCohost({
                        email: "",
                        role: "",
                        photo: "",
                        name: "",
                        file: null,
                      });
                    }}
                  />
                  <TagButton
                    text="No Meetro Account"
                    className={twMerge(
                      "satoshi min-w-auto h-7.5 px-3 bg-transparent hover:bg-transparent text-[#B0B5B5] border-transparent",
                      !hasAccount && "bg-white text-[#011F0F] hover:bg-white"
                    )}
                    onClick={() => {
                      setHasAccount(false);
                      setValidation({
                        ...validation,
                        name: "",
                        email: "",
                        role: "",
                      });
                      setCohost({
                        email: "",
                        role: "",
                        photo: "",
                        name: "",
                        file: null,
                      });
                    }}
                  />
                </div>
              </div>
              {/* Cohost photo */}
              {!hasAccount && (
                <ImageInput
                  size="sm"
                  onUpload={({ file, previewUrl }) =>
                    setCohost({ ...cohost, photo: previewUrl, file })
                  }
                  imgUrl={cohost.photo}
                  setImgUrl={value => setCohost({ ...cohost, photo: value })}
                />
              )}
              {/* Cohost name */}
              {!hasAccount && (
                <FormGroup
                  label="Name"
                  message={
                    validation.name
                      ? {
                          text: validation.name,
                          type: "error",
                        }
                      : null
                  }
                >
                  <InputField
                    leftIcon={
                      <InputIcon>
                        <User variant="Bold" />
                      </InputIcon>
                    }
                    placeholder="Enter the name you want displayed"
                    value={cohost.name}
                    onChange={e => {
                      setCohost({ ...cohost, name: e.target.value });
                      setValidation({ ...validation, name: "" });
                    }}
                  />
                </FormGroup>
              )}

              {/* Cohost email */}
              <FormGroup
                label="Email"
                message={
                  validation.email
                    ? {
                        text: validation.email,
                        type: "error",
                      }
                    : null
                }
              >
                <InputField
                  leftIcon={
                    <InputIcon>
                      <Sms variant="Bold" />
                    </InputIcon>
                  }
                  placeholder="Enter the person's email"
                  type="email"
                  value={cohost.email}
                  onChange={e => {
                    setCohost({ ...cohost, email: e.target.value });
                    setValidation({ ...validation, email: "" });
                  }}
                />
              </FormGroup>
              {/* Cohost role */}
              <FormGroup
                label="Role"
                message={
                  validation.role
                    ? {
                        text: validation.role,
                        type: "error",
                      }
                    : null
                }
              >
                <SelectInput
                  placeholder="Choose one"
                  value={cohost.role}
                  setValue={role => {
                    setCohost({ ...cohost, role });
                    setValidation({ ...validation, role: "" });
                  }}
                  icon={
                    <InputIcon>
                      <Crown variant="Bold" />
                    </InputIcon>
                  }
                  options={roleOptions}
                />
              </FormGroup>
            </div>
            <div className="flex items-center justify-center md:justify-start gap-x-4">
              <TextButton
                text="Cancel"
                variant="tertiary"
                onClick={() => {
                  close();
                  resetData();
                }}
              />
              <TextButton
                text="Add Cohost"
                onClick={addCohost}
                className="min-w-auto"
              />
            </div>
          </div>
        ) : (
          /* Step 2: Review Cohosts */
          <div className="flex flex-col gap-y-12">
            <div className="flex flex-col gap-4">
              {/* Cohosts list */}
              {editedCohosts.length > 0 && (
                <ul className="flex flex-col gap-y-4">
                  {editedCohosts.map((cohost, index) => (
                    <li key={index} className="flex flex-col gap-1">
                      <p className="font-bold text-[18px] leading-7">
                        Collaborator {index + 1}
                      </p>
                      <div className="rounded-2xl flex items-center justify-between bg-white p-4">
                        {/*  Cohost info */}
                        <div className="flex items-center gap-2">
                          <Avatar src={cohost?.photo} size="sm" />
                          <div className="font-medium">
                            <p className="text-base text-[#001010]">
                              {cohost?.name || cohost.email}
                            </p>
                            <p className="text-xs text-[#8A9191]">
                              {cohost?.role}
                            </p>
                          </div>
                        </div>
                        {/* Delete button */}
                        <IconButton
                          variant="tertiary"
                          icon={<Trash variant="Bold" color="#DB2863" />}
                          onClick={() => removeCohost(index)}
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              )}
              <div className="flex items-center justify-between">
                {editedCohosts.length < 3 && (
                  <TextButton
                    variant="secondary"
                    text="Add More"
                    className="sm:min-w-auto min-w-full"
                    onClick={goToPreviousStep}
                  />
                )}

                <p className="text-sm text-[#8A9191] flex-1 font-medium text-right">
                  Added {editedCohosts.length}/3 cohosts
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center md:justify-start gap-x-4">
              <TextButton
                text="Back"
                variant="tertiary"
                onClick={goToPreviousStep}
              />
              <TextButton text="Save" onClick={handleSave} />
            </div>
          </div>
        )}
      </div>
    </Modal.Window>
  );
}
