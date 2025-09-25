import React from "react";
import FormGroup from "../Layout-conponents/Inputs/FormGroup";
import { BiSolidInfoCircle } from "react-icons/bi";
import { BsChevronRight } from "react-icons/bs";
import InputField from "../Layout-conponents/Inputs/InputField";
import InputGroup from "../Layout-conponents/Inputs/InputGroup";
import EventName from "../Layout-conponents/Inputs/EventName";
import ImageInput from "../Layout-conponents/Inputs/ImageInput";
import Toggle from "../Layout-conponents/Selectors/Toggle";
import Checkbox from "../Layout-conponents/Selectors/Checkbox";
import Radio from "../Layout-conponents/Selectors/Radio";
import Tabs from "../Layout-conponents/Tabs/Tabs";
import ListInput from "../Layout-conponents/Inputs/ListInput";

const MainAbout = () => {
  return (
    <div className="relative w-full h-fit min-h-[600px] flex flex-col gap-10 bg-[#FCFEF9] satoshi py-24">
      <div className="flex flex-col gap-6 md:w-[702px] w-[90%] h-fit justify-center text-center mx-auto mt-6">
        <h1 className="paytone md:text-[60px] text-[40px] leading-none text-[#011F0F] font-[400] capitalize">
          about us
        </h1>
        <p className="satoshi text-[20px] leading-6 text-[#011F0F] font-[500]">
          Helping people actually meet up again.
        </p>
        <img
          src="/about-hero.png"
          alt=""
          className="lg:w-[848px] lg:h-[515px] rounded-[32px] object-cover sm:w-[580px] sm:h-[380px] w-full h-[205px] mx-auto"
        />
        <p className="satoshi text-[18px] leading-6 text-[#8A9191] font-[500] text-center">
          Meetro was born out of a simple problem we were always missing events
          or finding out too late. Between the noise on social media and the
          stress of planning, it just felt harder to connect in real life.
          <br />
          <br />
          <span className="text-[#011F0F]">So, we built something better.</span>
          <br />
          <br />
          Meetro helps you create, share, and manage private events
          effortlessly, while also making it fun to discover things happening
          around you. Whether it’s a chill hangout with friends or a community
          event, we’re here to make meeting up easy, intentional, and
          stress-free.
        </p>
      </div>
      <div className="absolute flex justify-between items-center w-full h-fit bg-transparent -top-[250px]">
        <div className="size-[345px] bg-[#AEFC40] rounded-full opacity-80 blur-[250px]"></div>
        <div className="size-[345px] bg-[#866AD2] rounded-full blur-[250px] opacity-80 mt-[100px]"></div>
        <div className="size-[345px] bg-[#077D8A] rounded-full blur-[250px] opacity-80"></div>
      </div>
      <div className="bg-[#f0f0f0] py-4">
        <div className="max-w-[498px] flex flex-col gap-4 mx-auto">
          <FormGroup
            label="Input"
            labelIcon={<BiSolidInfoCircle />}
            helper="hint"
          >
            <InputField
              placeholder="Subtitle"
              leftIcon={<BiSolidInfoCircle />}
              rightIcon={<BiSolidInfoCircle />}
            />
          </FormGroup>
          <FormGroup
            label="Input"
            labelIcon={<BiSolidInfoCircle />}
            message={{
              type: "error",
              text: "Error",
            }}
          >
            <InputField
              placeholder="Subtitle"
              leftIcon={<BiSolidInfoCircle />}
              rightIcon={<BiSolidInfoCircle />}
            />
          </FormGroup>
          <FormGroup
            label="Input"
            labelIcon={<BiSolidInfoCircle />}
            message={{
              type: "success",
              text: "Success",
            }}
          >
            <InputField
              placeholder="Subtitle"
              leftIcon={<BiSolidInfoCircle />}
              rightIcon={<BiSolidInfoCircle />}
            />
          </FormGroup>
          <FormGroup
            label="Input"
            labelIcon={<BiSolidInfoCircle />}
            helper="hint"
          >
            <InputGroup>
              <InputField
                placeholder="Subtitle"
                leftIcon={<BiSolidInfoCircle />}
                rightIcon={<BiSolidInfoCircle />}
              />
              <InputField
                placeholder="Subtitle"
                leftIcon={<BiSolidInfoCircle />}
                rightIcon={<BiSolidInfoCircle />}
              />
            </InputGroup>
          </FormGroup>
          <FormGroup
            label="Input"
            labelIcon={<BiSolidInfoCircle />}
            message={{
              type: "error",
              text: "Error",
            }}
          >
            <InputGroup>
              <InputField
                placeholder="Subtitle"
                leftIcon={<BiSolidInfoCircle />}
                rightIcon={<BiSolidInfoCircle />}
              />
              <InputField
                placeholder="Subtitle"
                leftIcon={<BiSolidInfoCircle />}
                rightIcon={<BiSolidInfoCircle />}
              />
            </InputGroup>
          </FormGroup>
          <FormGroup
            label="Input"
            labelIcon={<BiSolidInfoCircle />}
            message={{
              type: "success",
              text: "Success",
            }}
          >
            <InputGroup>
              <InputField
                placeholder="Subtitle"
                leftIcon={<BiSolidInfoCircle />}
                rightIcon={<BiSolidInfoCircle />}
              />
              <InputField
                placeholder="Subtitle"
                leftIcon={<BiSolidInfoCircle />}
                rightIcon={<BiSolidInfoCircle />}
              />
            </InputGroup>
          </FormGroup>
          <EventName placeholder="Event Name" />
          <EventName placeholder="Event Name" error={true} />
          <ImageInput size="lg" />
          <ImageInput size="md" />
          <ImageInput size="sm" />
          <Toggle />
          <Checkbox />
          <Radio name="test" label="Enugu state" />
          <Radio name="test" label="Imo state" />
          <Tabs defaultTab="overview">
            <Tabs.List
              size="sm"
              list={[
                { id: "overview", label: "Overview" },
                { id: "tags", label: "Tags" },
                { id: "settings", label: "Settings" },
              ]}
            />
            <Tabs.Panel name="overview">
              <h2 className="mt-2">Overview</h2>
            </Tabs.Panel>
            <Tabs.Panel name="tags">
              <h2 className="mt-2">Tags</h2>
            </Tabs.Panel>
            <Tabs.Panel name="settings">
              <h2 className="mt-2">Settings</h2>
            </Tabs.Panel>
          </Tabs>
          <Tabs defaultTab="overview">
            <Tabs.List
              size="md"
              list={[
                { id: "overview", label: "Overview" },
                { id: "tags", label: "Tags" },
                { id: "settings", label: "Settings" },
              ]}
            />
            <Tabs.Panel name="overview">
              <h2 className="mt-2">Overview</h2>
            </Tabs.Panel>
            <Tabs.Panel name="tags">
              <h2 className="mt-2">Tags</h2>
            </Tabs.Panel>
            <Tabs.Panel name="settings">
              <h2 className="mt-2">Settings</h2>
            </Tabs.Panel>
          </Tabs>
          <Tabs defaultTab="overview">
            <Tabs.List
              size="lg"
              list={[
                { id: "overview", label: "Overview" },
                { id: "tags", label: "Tags" },
                { id: "settings", label: "Settings" },
              ]}
            />
            <Tabs.Panel name="overview">
              <h2 className="mt-2">Overview</h2>
            </Tabs.Panel>
            <Tabs.Panel name="tags">
              <h2 className="mt-2">Tags</h2>
            </Tabs.Panel>
            <Tabs.Panel name="settings">
              <h2 className="mt-2">Settings</h2>
            </Tabs.Panel>
          </Tabs>
          <FormGroup helper="Hint">
            <ListInput
              placeholder="When is the event"
              title="When is your event"
              leftIcon={<BiSolidInfoCircle />}
              rightIcon={<BsChevronRight />}
            />
          </FormGroup>
          <FormGroup helper="Hint">
            <ListInput
              title="When is your event"
              tags={[
                {
                  leftIcon: <BiSolidInfoCircle />,
                  text: "tag",
                  rightIcon: <BiSolidInfoCircle />,
                },
                {
                  leftIcon: <BiSolidInfoCircle />,
                  text: "tag",
                  rightIcon: <BiSolidInfoCircle />,
                },
                {
                  leftIcon: <BiSolidInfoCircle />,
                  text: "tag",
                  rightIcon: <BiSolidInfoCircle />,
                },
              ]}
              leftIcon={<BiSolidInfoCircle />}
              rightIcon={<BsChevronRight />}
            />
          </FormGroup>
          <FormGroup helper="Hint">
            <ListInput
              content="Sat, Mar 1, 16:30pm"
              title="When is your event"
              leftIcon={<BiSolidInfoCircle />}
              rightIcon={<BsChevronRight />}
            />
          </FormGroup>
          <FormGroup
            message={{
              text: "Success",
              type: "success",
            }}
          >
            <ListInput
              content="Sat, Mar 1, 16:30pm"
              title="When is your event"
              leftIcon={<BiSolidInfoCircle />}
              rightIcon={<BsChevronRight />}
            />
          </FormGroup>
          <FormGroup
            message={{
              text: "Error",
              type: "error",
            }}
          >
            <ListInput
              content="Sat, Mar 1, 16:30pm"
              title="When is your event"
              leftIcon={<BiSolidInfoCircle />}
              rightIcon={<BsChevronRight />}
            />
          </FormGroup>
          <FormGroup helper="Hint">
            <ListInput
              placeholder="When is the event"
              leftIcon={<BiSolidInfoCircle />}
              rightIcon={<BsChevronRight />}
            />
          </FormGroup>
          <FormGroup helper="Hint">
            <ListInput
              tags={[
                {
                  leftIcon: <BiSolidInfoCircle />,
                  text: "tag",
                  rightIcon: <BiSolidInfoCircle />,
                },
                {
                  leftIcon: <BiSolidInfoCircle />,
                  text: "tag",
                  rightIcon: <BiSolidInfoCircle />,
                },
                {
                  leftIcon: <BiSolidInfoCircle />,
                  text: "tag",
                  rightIcon: <BiSolidInfoCircle />,
                },
              ]}
              leftIcon={<BiSolidInfoCircle />}
              rightIcon={<BsChevronRight />}
            />
          </FormGroup>
          <FormGroup helper="Hint">
            <ListInput
              content="Sat, Mar 1, 16:30pm"
              leftIcon={<BiSolidInfoCircle />}
              rightIcon={<BsChevronRight />}
            />
          </FormGroup>
          <FormGroup
            message={{
              text: "Success",
              type: "success",
            }}
          >
            <ListInput
              content="Sat, Mar 1, 16:30pm"
              leftIcon={<BiSolidInfoCircle />}
              rightIcon={<BsChevronRight />}
            />
          </FormGroup>
          <FormGroup
            message={{
              text: "Error",
              type: "error",
            }}
          >
            <ListInput
              content="Sat, Mar 1, 16:30pm"
              leftIcon={<BiSolidInfoCircle />}
              rightIcon={<BsChevronRight />}
            />
          </FormGroup>
        </div>
      </div>
    </div>
  );
};

export default MainAbout;
