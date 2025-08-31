// import SiteBtn from "../Layout-conponents/SiteBtn";
import { useAuthStore } from "@/stores/useAuthStore";
import dayjs from "dayjs";
import useEventStore from "@/stores/eventStore";
// import { useNavigate } from "react-router";

const profilePictures = [
  "/Profile.svg",
  "/Profile-1.svg",
  "/Profile-2.svg",
  "/Profile-3.svg",
];

//function to randomise profile picture selection
export function getProfilePicture() {
  let storedPic = localStorage.getItem("profilePic");

  if (!storedPic) {
    const randomIndex = Math.floor(Math.random() * profilePictures.length);
    storedPic = profilePictures[randomIndex];
    localStorage.setItem("profilePic", storedPic);
  }

  return storedPic;
}

const PersonalProfile = () => {
  // const [activeTab, setActiveTab] = useState("events"); // "events" or "invites"
  const user = useAuthStore((state) => state.user);
  const formattedDate = dayjs(user?.createdAt).format("D MMMM, YYYY");
  const profilePic = getProfilePicture();
  const myEventsTotal = useEventStore((state) => state.myEventsTotal);
  const totalAttendees = useEventStore((state) => state.totalAttendees);

  return (
    <div className="w-full md:w-[680px] md:h-[470px] px-4 pt-6 pb-12 md:p-0 flex flex-col gap-6 satoshi">
      {/* user profile details */}
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <div className="flex items-start justify-between">
            {/* <img src={user?.profilePictureKey} alt="user-profile-img" /> */}
            <img src={profilePic} alt="" className="w-[154px]" />
            {/* <img src={user?.profilePictureKey} alt="" /> */}
            {/* <Button variant="default" className="bg-[#AEFC40] text-black">Edit Profile</Button> */}
            {/* <SiteBtn
              name="Edit Profile"
              colorPadding="bg-[#fffffe] py-[6px] px-[10px]"
              onclick={() => navigate("/settings")}
            /> */}
          </div>

          <div className="flex flex-col gap-2">
            <h2 className="text-[20px] font-bold ">
              {user?.firstName} {user?.lastName}
            </h2>

            <div className="">
              <span className="flex items-center gap-2">
                <img src="/mail.svg" alt="mail-icon" />{" "}
                <p className="text-[14px] font-medium text-[#001010] ">
                  {user?.email}
                </p>
              </span>
              {/* <span className="flex items-center gap-2">
                <img src="/icons/location.svg" alt="location-icon" />{" "}
                <p className="text-[14px] font-medium text-[#001010] ">
                  {user?.state}
                </p>
              </span> */}
              <span className="flex items-center gap-2">
                <img src="/calendar.svg" alt="calendar-icon" />{" "}
                <p className="text-[14px] font-medium text-[#001010] ">
                  {formattedDate}
                </p>
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <p className=" text-[14px] font-medium text-[#001010]">
            {totalAttendees} {""}
            <span className="text-[#8A9191]">Events Attended</span>
          </p>
          <p className=" text-[14px] font-medium text-[#001010]">
            {myEventsTotal}{" "}
            <span className="text-[#8A9191]">Event Created</span>
          </p>
        </div>
      </div>

      {/* comment from here */}
      {/* past events or invites details  */}
      {/* <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h2 className="hidden md:block text-[30px] paytone text-[#055962]">
            Past Events
          </h2>

          <div
            style={{
              boxShadow: "0px 4px 24px 0px rgba(0, 0, 0, 0.08)",
              backdropFilter: "blur(16px)",
            }}
            className="flex p-[4px] rounded-[20px] bg-white lg:w-fit h-fit w-full">
            <button
              onClick={() => setActiveTab("events")}
              className={`rounded-3xl w-full h-full transition-all text-[10px] font-bold satoshi flex items-center py-2 px-2 cursor-pointer justify-center ${
                activeTab === "events"
                  ? "bg-[#BEFD66] shadow-sm text-[#010E1F]"
                  : "text-[#010E1F]"
              }`}>
              Events
            </button>
            <button
              onClick={() => setActiveTab("invites")}
              className={`rounded-3xl w-full h-full transition-all text-[10px] font-bold satoshi flex items-center py-2 px-2 cursor-pointer justify-center ${
                activeTab === "invites"
                  ? "bg-[#BEFD66] shadow-sm text-[#010E1F]"
                  : "text-[#010E1F]"
              }`}>
              Invites
            </button>
          </div>
        </div>
        <div className="flex flex-col items-center gap-2">
          <h2 className="text-[18px] font-bold text-[#001010] satoshi">
            No Events
          </h2>
          <p className="text-[16px] font-medium text-[#8A9191] satoshi">
            Create or attend an event
          </p>
        </div>

        {activeTab === "events" ? (
          <div></div>
        ) : (
          <div>
            <div>
              <div className="flex gap-4 bg-[#FFFFFE80] border border-[#FFFFFE] backdrop-blur-[4px] p-2 rounded-[12px]">
                <img
                  src="/events-img.png"
                  alt="event-img"
                  className="w-[41.8px] h-[38px] rounded-xl"
                />

                <div className="flex flex-col gap-4">
                  <div>
                    <p className="text-[14px] font-medium text-[#001010]">
                      Newman invited you to an event
                    </p>
                    <p className="text-[12px] font-medium text-[#8A9191]">
                      Wanna join the fun? Check out the details and let them
                      know if you're in.
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <button className="bg-[#fffffe] text-[#61B42D] p-1 pl-2 rounded-[60px] text-[12px] font-medium flex items-center gap-2.5">
                      <span>Accept</span>{" "}
                      <img src="/icons/accept.svg" alt="accept-icon" />
                    </button>

                    <button className="bg-[#fffffe] text-[#5F4B95] p-1 pl-2 rounded-[60px] text-[12px] font-medium flex items-center gap-2.5">
                      <span>Maybe Later</span>{" "}
                      <img src="/icons/maybe-later.svg" alt="timer" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* invite default state */}
      {/* <div className="flex flex-col items-center gap-2">
              <h2 className="text-[18px] font-bold text-[#001010]">
                No Invites
              </h2>
              <p className="text-[16px] font-medium text-[#8A9191]">
                You haven't received any invites yet
              </p>
            </div>
          </div>
        )}
      </div> */}
      {/* to here */}
    </div>
  );
};

export default PersonalProfile;
