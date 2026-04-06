import EditProfile from "@/components/settings/EditProfile";
import Payments from "@/components/settings/Payments";
import Preferences from "@/components/settings/Preferences";
import { Moneys, Setting4, User } from "iconsax-reactjs";
import { useEffect } from "react";
import { useLocation, useSearchParams } from "react-router";
import { twMerge } from "tailwind-merge";

function Settings() {
  const location = useLocation();
  // Get tab from URL search params
  const [searchParams, setSearchParams] = useSearchParams();
  const tab = searchParams.get("tab") || "edit-profile";

  // Handle tab change by updating URL search params
  const handleTabChange = value => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set("tab", value);
    setSearchParams(newSearchParams);
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, [location]);

  const renderTabContent = () => {
    switch (tab) {
      case "edit-profile":
        return <EditProfile />;
      case "preferences":
        return <Preferences />;
      case "payments":
        return <Payments />;
      default:
        return <EditProfile />;
    }
  };

  return (
    <main className="bg-[#F0F0F0] h-full relative flex-1 flex flex-col w-full">
      <div className="flex-1 satoshi">
        <div className="max-w-[772px] min-h-full w-full mx-auto">
          <div className="flex justify-between flex-col md:flex-row gap-y-6 gap-x-12  h-fit mt-4 md:mt-10">
            {/* Settings tab */}
            <div className="bg-white satoshi self-start sticky top-28  text-[#001010] font-bold text-sm p-6 rounded-4xl  flex flex-col min-w-full md:min-w-[332px]">
              <button
                className={twMerge(
                  "p-3 flex items-center gap-2",
                  tab === "edit-profile" && "text-[#866AD2]"
                )}
                onClick={() => handleTabChange("edit-profile")}
              >
                <User size={20} variant="Bold" />
                <span>Edit Profile</span>
              </button>
              <button
                className={twMerge(
                  "p-3 flex items-center gap-2",
                  tab === "preferences" && "text-[#866AD2]"
                )}
                onClick={() => handleTabChange("preferences")}
              >
                <Setting4 size={20} variant="Bold" />
                <span>Preferences</span>
              </button>
              <button
                className={twMerge(
                  "p-3 flex items-center gap-2",
                  tab === "payments" && "text-[#866AD2]"
                )}
                onClick={() => handleTabChange("payments")}
              >
                <Moneys size={20} variant="Bold" />
                <span>Payments</span>
              </button>
            </div>
            {/* Active tab */}
            <div className="flex-1">{renderTabContent()}</div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Settings;
