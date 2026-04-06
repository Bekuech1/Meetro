import TextButton from "../layout-components/Buttons/TextButtons";
import { useEffect, useRef, useState } from "react";
import { ArrowDown2 } from "iconsax-reactjs";
import Toggle from "../layout-components/Selectors/Toggle";

const VISIBILITY_OPTIONS = ["Public", "Private"];

function SelectSetting({ value, onChange, options = [] }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;
    const handler = e => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  return (
    <div ref={ref} className="relative">
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen(s => !s)}
        className="satoshi flex items-center min-w-[65px] justify-between gap-1 text-[10px] font-medium text-[#011F0F] bg-white hover:bg-[#E5E7E3] border border-[#E5E7E3] rounded-[60px] h-6 px-2 leading-[14px] transition-all duration-200 ease-in-out capitalize cursor-pointer"
      >
        {value}
        <ArrowDown2
          size={12}
          variant="Outline"
          className={`transition-transform duration-200`}
        />
      </button>
      {/* Options list */}
      {open && (
        <ul className="absolute right-0 mt-1 bg-white border border-[#E5E7E3] rounded-[12px] shadow-[0px_4px_24px_rgba(0,14,51,0.10)] overflow-hidden z-50 min-w-full">
          {options.map(opt => (
            <li key={opt}>
              <button
                type="button"
                onMouseDown={e => e.preventDefault()}
                onClick={() => {
                  onChange(opt);
                  setOpen(false);
                }}
                className={`satoshi flex w-full text-left font-medium leading-3.5 text-[10px] px-3 py-1 capitalize ${
                  value === opt
                    ? "bg-[#E5E7E3] text-[#011F0F]"
                    : "text-[#011F0F] hover:bg-[#F5F5F5]"
                }`}
              >
                {opt}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function Preferences() {
  const [privacy, setPrivacy] = useState({
    profileVisibility: "Public",
    socialMediaVisibility: "Public",
  });

  const [notificationSettings, setNotificationSettings] = useState({
    notificationMode: "Email",
    eventReminders: false,
    eventUpdates: false,
    guestRegistrations: false,
    productUpdates: false,
  });

  return (
    <div className="satoshi">
      <div className="mb-6">
        <h1 className="paytone text-2xl leading-8 font-normal">Preferences</h1>
        <p className="text-[#8A9191] text-xs font-medium">
          Your preferences will appear here
        </p>
      </div>
      {/* Privacy settings */}
      <div className="flex flex-col gap-4 mb-6">
        <div>
          <h3 className="text-sm mb-4 font-normal text-[#8A9191] paytone">
            Privacy Settings
          </h3>
          <div className="flex flex-col gap-3">
            {/* Profile visibility */}
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium text-sm mb-1">Profile Visibility</h3>
                <p className="text-[#8A9191] text-xs font-medium">
                  Change your profile visibility status
                </p>
              </div>
              <SelectSetting
                value={privacy.profileVisibility}
                onChange={value =>
                  setPrivacy(prev => ({ ...prev, profileVisibility: value }))
                }
                options={VISIBILITY_OPTIONS}
              />
            </div>
            {/* Social media visibility */}
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium text-sm mb-1">
                  Social Media Accounts
                </h3>
                <p className="text-[#8A9191] text-xs font-medium">
                  Change your social media visibility
                </p>
              </div>
              <SelectSetting
                value={privacy.socialMediaVisibility}
                onChange={value =>
                  setPrivacy(prev => ({
                    ...prev,
                    socialMediaVisibility: value,
                  }))
                }
                options={VISIBILITY_OPTIONS}
              />
            </div>
          </div>
        </div>
      </div>
      {/* Notification settings */}
      <div className="flex flex-col gap-4 mb-6">
        <div>
          <h3 className="text-sm mb-4 font-normal text-[#8A9191] paytone">
            Notification Settings
          </h3>
          <div className="flex flex-col gap-3">
            {/* Notification mode */}
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium text-sm mb-1">Notifications</h3>
                <p className="text-[#8A9191] text-xs font-medium">
                  Change where you receive notifications
                </p>
              </div>
              <SelectSetting
                value={notificationSettings.notificationMode}
                onChange={value =>
                  setNotificationSettings(prev => ({
                    ...prev,
                    notificationMode: value,
                  }))
                }
                options={["Email", "Phone"]}
              />
            </div>
            {/* Event reminders */}
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium text-sm mb-1">Event Reminders</h3>
                <p className="text-[#8A9191] text-xs font-medium">
                  Send notifications for upcoming event reminders.
                </p>
              </div>
              <Toggle
                checked={notificationSettings.eventReminders}
                onChange={() =>
                  setNotificationSettings(prev => ({
                    ...prev,
                    eventReminders: !prev.eventReminders,
                  }))
                }
              />
            </div>
            {/* Event updates */}
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium text-sm mb-1">Event Updates</h3>
                <p className="text-[#8A9191] text-xs font-medium">
                  Alert me about event updates.
                </p>
              </div>
              <Toggle
                checked={notificationSettings.eventUpdates}
                onChange={() =>
                  setNotificationSettings(prev => ({
                    ...prev,
                    eventUpdates: !prev.eventUpdates,
                  }))
                }
              />
            </div>
            {/* Guest registrations */}
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium text-sm mb-1">
                  Guest Registrations
                </h3>
                <p className="text-[#8A9191] text-xs font-medium">
                  Update on guest status
                </p>
              </div>
              <Toggle
                checked={notificationSettings.guestRegistrations}
                onChange={() =>
                  setNotificationSettings(prev => ({
                    ...prev,
                    guestRegistrations: !prev.guestRegistrations,
                  }))
                }
              />
            </div>
            {/* Product update */}
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium text-sm mb-1">Product Update</h3>
                <p className="text-[#8A9191] text-xs font-medium">
                  Product Update keep me updated on product changes
                </p>
              </div>
              <Toggle
                checked={notificationSettings.productUpdates}
                onChange={() =>
                  setNotificationSettings(prev => ({
                    ...prev,
                    productUpdates: !prev.productUpdates,
                  }))
                }
              />
            </div>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <TextButton text="Save Changes" variant="primary" className="min-w-0" />
    </div>
  );
}

export default Preferences;
