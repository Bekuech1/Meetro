import Avatar from "../Avatar";
import IconButton from "../Buttons/IconButton";
import TagButton from "../Buttons/TagButton";
import TextButton from "../Buttons/TextButtons";
import FormGroup from "../Inputs/FormGroup";
import InputField from "../Inputs/InputField";
import SelectInput from "../Inputs/SelectInput";
import Modal from "../Modal/Modal";
import InputIcon from "@/assets/icons/InputIcon";
import { Crown, Trash } from "iconsax-reactjs";
import { twMerge } from "tailwind-merge";
import { useState } from "react";
import { useModalContext } from "../Modal/ModalContext";

const roleOptions = [
  { id: 1, name: "Co-host" },
  { id: 2, name: "Moderator" },
  { id: 3, name: "Speaker" },
];

export default function EventCohostsModal({ onSave, cohostsData }) {
  const { close } = useModalContext();
  const [editedCohosts, setEditedCohosts] = useState(cohostsData || []);
  const [hasAccount, setHasAccount] = useState(true);
  const [cohost, setCohost] = useState({
    email: "",
    role: "",
    photo: "",
    name: "",
  });

  const addCohost = () => {
    if (!cohost.email || !cohost.role) return;
    if (!hasAccount && (!cohost.name || !cohost.photo)) return;
    setEditedCohosts(s => [...s, cohost]);
    setCohost({ email: "", role: "", photo: "", name: "" });
  };

  const resetData = () => {
    setEditedCohosts(cohostsData || []);
    setHasAccount(true);
    setCohost({ email: "", role: "", photo: "", name: "" });
  };

  const removeCohost = index => {
    setEditedCohosts(s => s.filter((_, i) => i !== index));
  };

  return (
    <Modal.Window name="event-cohosts" title="Add Cohosts?" onClose={resetData}>
      {/* Content goes here */}
      <div className="satoshi font-bold text-sm text-[#010E1F]">
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
            {/* Cohost account status */}
            <div>
              <div className="border border-[#F9F9F9] p-[2px] bg-[#E5E7E3] rounded-full inline-flex items-center">
                <TagButton
                  text="Has Meetro Account"
                  className={twMerge(
                    "satoshi min-w-auto h-7.5 px-3 hover:bg-transparent bg-transparent text-[#B0B5B5] border-transparent",
                    hasAccount && "bg-white text-[#011F0F] hover:bg-white"
                  )}
                  onClick={() => setHasAccount(true)}
                />
                <TagButton
                  text="No Meetro Account"
                  className={twMerge(
                    "satoshi min-w-auto h-7.5 px-3 bg-transparent hover:bg-transparent text-[#B0B5B5] border-transparent",
                    !hasAccount && "bg-white text-[#011F0F] hover:bg-white"
                  )}
                  onClick={() => setHasAccount(false)}
                />
              </div>
            </div>
            {/* Cohost email */}
            <FormGroup label="Email">
              <InputField
                placeholder="Enter the person's email"
                type="email"
                value={cohost.email}
                onChange={e => setCohost({ ...cohost, email: e.target.value })}
              />
            </FormGroup>
            {/* Cohost role */}
            <FormGroup label="Role">
              <SelectInput
                placeholder="Choose one"
                value={cohost.role}
                setValue={role => setCohost({ ...cohost, role })}
                icon={
                  <InputIcon>
                    <Crown variant="Bold" />
                  </InputIcon>
                }
                options={roleOptions}
              />
            </FormGroup>
            {/* Add cohost button */}
            <TextButton
              variant="secondary"
              text="Add Cohost"
              className="sm:min-w-auto min-w-full"
              onClick={addCohost}
            />
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
            <TextButton text="Save" />
          </div>
        </div>
      </div>
    </Modal.Window>
  );
}
