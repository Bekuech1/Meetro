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
import FixedChipInModal from "../Layout-conponents/ChipInModals/FixedChipInModal";
import TargetChipInModal from "../Layout-conponents/ChipInModals/TargetChipInModal";
import MinChipInModal from "../Layout-conponents/ChipInModals/MinChipInModal";

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
        <div className="max-w-[1400px] py-3 px-4 md:px-8 gap-y-4 mx-auto w-full flex flex-col items-start">
          <Modal>
            <div className="flex gap-4">
              <Modal.Open opens="fixed-chip-in">
                <TextButton text="Fixed Chip In" />
              </Modal.Open>
              <Modal.Open opens="target-chip-in">
                <TextButton text="Target Chip In" />
              </Modal.Open>
              <Modal.Open opens="min-chip-in">
                <TextButton text="Minimum Chip In" />
              </Modal.Open>
            </div>
            <FixedChipInModal />
            <TargetChipInModal />
            <MinChipInModal amount={1000} />
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default MainAbout;
