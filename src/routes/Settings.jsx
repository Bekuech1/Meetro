import IconButton from "@/components/layout-components/Buttons/IconButton";
import EditProfile from "@/components/settings/EditProfile";
import Payments from "@/components/settings/Payments";
import Preferences from "@/components/settings/Preferences";
import { useDisableScroll } from "@/hooks/useDisableScroll";
import { ArrowLeft2, Moneys, Setting4, User } from "iconsax-reactjs";
import React, { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router";
import { twMerge } from "tailwind-merge";

function Settings() {
  const location = useLocation();
  // Get tab from URL search params
  const [searchParams, setSearchParams] = useSearchParams();
  const tab = searchParams.get("tab") || "edit-profile";
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Handle tab change by updating URL search params
  const handleTabChange = value => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set("tab", value);
    setSearchParams(newSearchParams);
    setMobileMenuOpen(false);
  };

  const handleBackClick = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  useDisableScroll(mobileMenuOpen);

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
    <main className="bg-[#F0F0F0] pb-10 h-full relative flex-1 flex flex-col w-full">
      <div className="flex-1 satoshi">
        <div className="max-w-[772px] min-h-full w-full mx-auto">
          <div className="flex justify-between flex-col md:flex-row gap-y-6 gap-x-12  h-fit mt-4 md:mt-10">
            {/* Settings tab */}
            <div className="bg-white satoshi self-start hidden md:sticky md:top-28  text-[#001010] font-bold text-sm p-6 rounded-4xl  md:flex flex-col min-w-full md:min-w-[332px]">
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

            <div className="flex-1">
              <div className="relative">
                <div
                  onClick={handleBackClick}
                  className="mb-6 md:hidden text-sm font-bold flex bg-transparent gap-2 items-center"
                >
                  <IconButton
                    className="size-8"
                    variant="tertiary"
                    icon={<ArrowLeft2 size={16} />}
                  />
                  <span>Back</span>
                </div>
              </div>

              {/* Mobile Menu */}
              {mobileMenuOpen && (
                <div className="fixed md:hidden top-16 left-0 right-0 bottom-0 bg-[#F0F0F0] z-10 px-4 overflow-y-auto">
                  <div className="flex justify-between items-center mb-6 mt-4">
                    <h2 className="text-[18px] leading-7 paytone text-[#055962]">
                      Settings
                    </h2>
                  </div>

                  <div className="flex flex-col">
                    <button
                      className={
                        "p-3 flex items-center gap-2 rounded-[8px] font-bold text-sm transition-colors text-[#001010] hover:bg-gray-100"
                      }
                      onClick={() => handleTabChange("edit-profile")}
                    >
                      <User size={20} variant="Bold" />
                      <span>Edit Profile</span>
                    </button>
                    <button
                      className={
                        "p-3 flex items-center gap-2 rounded-[8px] font-bold text-sm transition-colors text-[#001010] hover:bg-gray-100"
                      }
                      onClick={() => handleTabChange("preferences")}
                    >
                      <Setting4 size={20} variant="Bold" />
                      <span>Preferences</span>
                    </button>
                    <button
                      className={
                        "p-3 flex items-center gap-2 rounded-[8px] font-bold text-sm transition-colors text-[#001010] hover:bg-gray-100"
                      }
                      onClick={() => handleTabChange("payments")}
                    >
                      <Moneys size={20} variant="Bold" />
                      <span>Payments</span>
                    </button>
                  </div>
                </div>
              )}

              {renderTabContent()}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Settings;
