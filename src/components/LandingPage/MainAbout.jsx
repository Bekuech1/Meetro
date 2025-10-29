import TextButton from "../Layout-conponents/Buttons/TextButtons";
import PaymentDetailModal from "../Layout-conponents/ChipInModals/PaymentDetailModal";
import CreateEventModal from "../Layout-conponents/Events/CreateEventModal";
import EventDateModal from "../Layout-conponents/Events/EventDateModal";
import GuestDetailModal from "../Layout-conponents/Events/GuestDetailModal";
import ImageTemplatesModal from "../Layout-conponents/Events/ImageTemplatesModal";
import Modal from "../Layout-conponents/Modal/Modal";
import { EventDetail } from "../Layout-conponents/EventDetail";
import { useState } from "react";
import ImageInput from "../Layout-conponents/Inputs/ImageInput";

const MainAbout = () => {
  const [file, setFile] = useState(null);
  const [image, setImage] = useState("/event-ph1.png");
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
            <div className="mt-6 flex flex-wrap gap-4">
              <Modal.Open opens="event-date">
                <TextButton text="Event Date" />
              </Modal.Open>
              <Modal.Open opens="guest-detail">
                <TextButton text="Guest Detail" />
              </Modal.Open>
              <Modal.Open opens="create-event">
                <TextButton text="Create Event" />
              </Modal.Open>
              <Modal.Open opens="image-templates">
                <TextButton text="Select Image" />
              </Modal.Open>
            </div>
            <PaymentDetailModal
              transaction={{
                amount: 3000,
                status: "failed",
                event: {
                  guest: "Nesky",
                  guestStatus: "going",
                  location: "5 Mabushi way, Abuja",
                  date: new Date("2025-03-01T16:30:00"),
                  title: "Tech Unwind",
                },
              }}
            />
            <GuestDetailModal
              guestDetail={{
                name: "Newman Ogbo",
                email: "newman@gmail.com",
                chipIn: 50000,
                status: "going",
                profileImg: "/v2-tinyprofile.jpg",
              }}
            />
            <EventDateModal />
            <CreateEventModal />
            <div className="size-[200px] rounded-[24px] overflow-hidden">
              <img src={image} alt="" className="size-full block" />
            </div>
            <ImageTemplatesModal
              onSelect={url => {
                setFile(null);
                setImage(url);
              }}
              onUpload={file => setFile(file)}
            />
          </Modal>
        </div>
      </div>
      <EventDetail />
    </div>
  );
};

export default MainAbout;
