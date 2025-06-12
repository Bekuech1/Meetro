import React from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../ui/select";

const Preference = () => {
  return (
    <div>
      <div className="flex justify-between items-start gap-4 mb-8">
        <div className="flex flex-col gap-1">
          <h2 className="text-[#001010] font-bold text-[14px]">
            Notifications
          </h2>
          <p className="text-[12px] font-medium text-[#8A9191]">
            Choose how you want to be notified about updates and invites
          </p>
        </div>

        <Select>
          <SelectTrigger className="bg-[#FFFFFE] rounded-[60px]">
            <SelectValue placeholder="Email" className="text-[12px]" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="email">Email</SelectItem>
            <SelectItem value="sms">SMS</SelectItem>
            <SelectItem value="push">Push Notifications</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default Preference;
