import { useNavigate } from "react-router";
import SiteBtn from "../Layout-conponents/SiteBtn";

export default function NoEvents({ message }) {
  // Navigate hook
  const navigate = useNavigate();
  return (
    <section className="text-center mt-10 text-[#8A9191] text-sm font-semibold">
      <p className="mb-4 satoshi">{message}</p>
      <SiteBtn
        name="Create a new event"
        colorPadding="bg-[#AEFC40] py-2 px-6 mt-4"
        onclick={() => navigate("/create-event")}
      />
    </section>
  );
}
