import { Link } from "react-router";
import TextButton from "../Layout-conponents/Buttons/TextButtons";

export default function NoEvents({ message }) {
  return (
    <section className="text-center mt-10 text-[#8A9191] text-sm font-semibold">
      <p className="mb-6 satoshi">{message}</p>
      <div className="flex justify-center">
        <Link to="/create-event">
          <TextButton text="Create Event" className="h-11! !text-base" />
        </Link>
      </div>
    </section>
  );
}
