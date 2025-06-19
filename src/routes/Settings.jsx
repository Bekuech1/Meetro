import Account from "@/components/Settings/Account";
import Payments from "@/components/Settings/Payments";
import Preference from "@/components/Settings/Preference";
import API from "@/lib/axios";
import React, { useEffect, useState } from "react";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("accounts");

  // State to hold account details
  const [accountDetails, setAccountDetails] = useState({
    email: "",
    firstName: "",
    lastName: "",
    // bio: "",
    // profilePictureKey: "",
    state: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await API.get("/profile");
        const { email, firstName, lastName, state } = response.data;
        setAccountDetails({
          email,
          firstName,
          lastName,
          // bio: response.data.bio || "",
          // profilePictureKey: response.data.profilePictureKey || "",
          state: state || "",
        });
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      }
    }

    fetchProfile();
  }, []);

  const handleSaveChanges = async () => {
    try {
      if (activeTab === "accounts") {
        await API.put("/profile", accountDetails);
        console.log("Account details updated successfully");
      } else if (activeTab === "preferences") {
        // Handle preferences saving logic here
        console.log("Preferences saved successfully");
      }
    } catch (err) {
      console.error(err);
      console.log("An error occured");
    }
  };

  return (
    <div className="bg-[#F0F0F0] relative">
      {/* background ellipses */}
      <div className="absolute flex justify-between items-center w-full h-fit -top-[250px] bg-transparent">
        {/* <!-- Left Ellipse --> */}
        <div className="size-[345px] bg-[#AEFC40] rounded-full opacity-80 blur-[250px]"></div>

        {/* <!-- Middle Ellipse --> */}
        <div className="size-[345px] bg-[#866AD2] rounded-full blur-[250px] opacity-80 mt-[100px]"></div>

        {/* <!-- Right Ellipse --> */}
        <div className="size-[345px] bg-[#077D8A] rounded-full blur-[250px] opacity-80"></div>
      </div>

      <div className="relative z-10 w-full md:w-[680px] md:min-h-[700px] py-10 pb-12 mx-auto px-4">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-[17px] justify-between">
          <h2 className="text-[30px] paytone text-[#055962]">Settings</h2>

          <div className="flex items-center justify-center bg-[#fffffe] w-full md:w-[188px] h-7.5 md:h-6.5 p-1 md:p-0.5 rounded-[20px]">
            <button
              onClick={() => setActiveTab("accounts")}
              className={`rounded-3xl w-full h-full transition-all text-[10px] font-bold satoshi ${
                activeTab === "accounts"
                  ? "bg-[#BEFD66] shadow-sm text-[#010E1F]"
                  : "text-[#010E1F]"
              }`}>
              Accounts
            </button>
            <button
              onClick={() => setActiveTab("preferences")}
              className={`rounded-3xl w-full h-full transition-all text-[10px] font-bold satoshi ${
                activeTab === "preferences"
                  ? "bg-[#BEFD66] shadow-sm text-[#010E1F]"
                  : "text-[#010E1F]"
              }`}>
              Preferences
            </button>
            <button
              onClick={() => setActiveTab("payments")}
              className={`rounded-3xl w-full h-full transition-all text-[10px] font-bold satoshi ${
                activeTab === "payments"
                  ? "bg-[#BEFD66] shadow-sm text-[#010E1F]"
                  : "text-[#010E1F]"
              }`}>
              Payments
            </button>
          </div>
        </div>

        {/* content for each tab toggle */}
        <div className="mt-8">
          {activeTab === "accounts" && (
            <Account form={accountDetails} setForm={setAccountDetails} />
          )}

          {activeTab === "preferences" && <Preference />}

          {activeTab === "payments" && <Payments />}
        </div>

        {/* Save changes button */}
        <div>
          <button
            className="text-[14px] paytone w-full py-3 bg-[#011F0F] text-[#AEFC40] rounded-[60px] mt-4"
            onClick={handleSaveChanges}>
            Save changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
