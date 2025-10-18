import React from "react";
import TopNavigation from "../Layout-conponents/Navigation/TopNavigation";
import AvatarGroup from "../Layout-conponents/AvatarGroup";
import BottomNav from "../Layout-conponents/Navigation/BottomNav";
import Avatar from "../Layout-conponents/Avatar";
import Modal from "../Layout-conponents/Modal/Modal";
import TextButton from "../Layout-conponents/Buttons/TextButtons";
import LoginModal from "../Layout-conponents/Authentication/LoginModal";
import SignUpModal from "../Layout-conponents/Authentication/SignUpModal";
import DeleteEventModal from "../Layout-conponents/Events/DeleteEventModal";

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
        <TopNavigation />
        <div className="max-w-[1400px] py-3 px-4 md:px-8 gap-y-4 mx-auto w-full flex flex-col items-start">
          <AvatarGroup size="xs" count={100} src="/v2-tinyprofile.jpg" />
          <AvatarGroup size="sm" count={100} src="/v2-tinyprofile.jpg" />
          <AvatarGroup size="md" count={100} src="/v2-tinyprofile.jpg" />
          <AvatarGroup size="lg" count={100} src="/v2-tinyprofile.jpg" />
          <AvatarGroup size="xl" count={100} src="/v2-tinyprofile.jpg" />
          <Avatar size="xs" src="/v2-tinyprofile.jpg" />
          <Avatar size="sm" />
          <Avatar size="md" src="/v2-tinyprofile.jpg" />
          <Avatar size="lg" />
          <Avatar size="xl" src="/v2-tinyprofile.jpg" />
          <BottomNav />
          <Modal>
            <Modal.Open opens="login">
              <TextButton text="Login" />
            </Modal.Open>
            <LoginModal />
            <SignUpModal />
            <Modal.Open opens="delete-event">
              <TextButton text="Delete Event" />
            </Modal.Open>
            <DeleteEventModal eventId={1000} />
          </Modal>
        </div>
      </div>
      <EventDetail />
    </div>
  );
};

export default MainAbout;
