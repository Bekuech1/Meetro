import React from "react";
import TagButton from "../Buttons/TagButton";
import TextButton from "../Buttons/TextButtons";
import FormGroup from "../Inputs/FormGroup";
import Modal from "../Modal/Modal";
import InputField from "../Inputs/InputField";
import Avatar from "../Avatar";
import SearchInput from "../Inputs/SearchInput";
import { ArrowDown2, InfoCircle, Trash } from "iconsax-reactjs";
import { useModalContext } from "../Modal/ModalContext";
import { useState } from "react";

// Example options
const options = [
  {
    id: 1,
    name: "Newman Ogbo",
    leftIcon: <Avatar size="xxxs" />,
  },
  {
    id: 2,
    name: "Nesky",
    leftIcon: <Avatar size="xxxs" />,
  },
];

export default function EventCohostsModal({ onSave }) {
  const { close } = useModalContext();
  const [showFirstCohostInput, setShowFirstCohostInput] = useState(false);
  const [showSecondCohostInput, setShowSecondCohostInput] = useState(false);
  const [hosts, setHosts] = useState({
    host: "",
    coHost1: {
      icon: null,
      name: "",
    },
    coHost2: {
      icon: null,
      name: "",
    },
  });
  return (
    <Modal.Window name="event-cohosts" title="Add Cohosts?">
      {/* Content goes here */}
      <div className="satoshi font-bold text-sm text-[#010E1F]">
        <div className="flex flex-col gap-y-12">
          <div className="flex flex-col gap-y-4">
            <FormGroup label="Host Name">
              <InputField
                leftIcon={<Avatar size="xs" />}
                placeholder="Enter the name you want Displayed"
                value={hosts.host}
                onChange={e =>
                  setHosts(prev => ({ ...prev, host: e.target.value }))
                }
              />
            </FormGroup>
            {showFirstCohostInput ? (
              <React.Fragment>
                <div className="flex flex-col gap-y-1">
                  <FormGroup label="Cohost 1">
                    <SearchInput
                      searchField="name"
                      placeholder="Enter cohost email"
                      options={options}
                      value={hosts.coHost1}
                      setValue={value =>
                        setHosts(prev => ({
                          ...prev,
                          coHost1: value,
                        }))
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
                    onClick={() => setShowFirstCohostInput(false)}
                  />
                </div>
                {showSecondCohostInput ? (
                  <div className="flex flex-col gap-y-1">
                    <FormGroup label="Cohost 2">
                      <SearchInput
                        searchField="name"
                        placeholder="Enter cohost email"
                        options={options}
                        value={hosts.coHost2}
                        setValue={value =>
                          setHosts(prev => ({
                            ...prev,
                            coHost2: value,
                          }))
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
                      onClick={() => setShowSecondCohostInput(false)}
                    />
                  </div>
                ) : (
                  <div className="flex flex-col gap-y-1">
                    <TextButton
                      variant="secondary"
                      text="Add Cohost"
                      rightImg={
                        <ArrowDown2
                          variant="Outline"
                          size={16}
                          color="#011F0F"
                        />
                      }
                      onClick={() => setShowSecondCohostInput(true)}
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
                  text="Add Cohost"
                  rightImg={
                    <ArrowDown2 variant="Outline" size={16} color="#011F0F" />
                  }
                  onClick={() => setShowFirstCohostInput(true)}
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
