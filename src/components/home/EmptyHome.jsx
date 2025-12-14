import TextButton from "../Layout-conponents/Buttons/TextButtons";
import { Link } from "react-router";

const EmptyHome = () => {
  return (
    <div className="flex flex-col justify-center flex-1">
      <div className="flex flex-col items-center gap-6 ">
        <img src="/illustrations.svg" alt="illustrations-image" />
        <div className="text-center mx-auto max-w-[456px]">
          <h1 className="paytone font-normal text-[#06727E] text-2xl leading-[17px] mb-4">
            No Events
          </h1>
          <p className="font-medium text-[#8A9191] satoshi">
            Looks like there's nothing happening right now. Why not be the first
            to create an event?
          </p>
        </div>
        <Link to="/create-event">
          <TextButton text="Create Event" className="h-11! !text-base" />
        </Link>
      </div>
    </div>
  );
};

export default EmptyHome;
