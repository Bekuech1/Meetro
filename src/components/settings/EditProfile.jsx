import ImageInput from "../layout-components/Inputs/ImageInput";
import SelectInput from "../layout-components/Inputs/SelectInput";
import FormGroup from "../layout-components/Inputs/FormGroup";
import InputField from "../layout-components/Inputs/InputField";
import { useState } from "react";
import { useAuthStore } from "@/stores/useAuthStore";
import { states } from "@/lib/utils";
import { FaFacebook, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import InstagramIcon from "@/assets/icons/InstagramIcon";
import TextButton from "../layout-components/Buttons/TextButtons";

function EditProfile() {
  const { user } = useAuthStore();
  const initalUser = {
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    phone: user?.phone || "",
    bio: user?.bio || "",
    photo: user?.photo || "",
    location: user?.location || "",
    socials: user?.socials || {
      facebook: "",
      instagram: "",
      twitter: "",
      linkedin: "",
    },
  };
  const [updatedUser, setUpdatedUser] = useState(initalUser);
  return (
    <div className="satoshi">
      <div className="mb-6">
        <h1 className="paytone text-2xl leading-8 font-normal">Edit Profile</h1>
        <p className="text-[#8A9191] text-xs font-medium">
          This information will appear on your public profile
        </p>
      </div>
      {/* Personal details */}
      <div className="flex flex-col gap-4 mb-6">
        <div>
          <h3 className="text-sm font-normal text-[#8A9191] paytone mb-3">
            Personal Details
          </h3>
          <ImageInput
            size="sm"
            onUpload={({ file, previewUrl }) =>
              setUpdatedUser({ ...updatedUser, photo: previewUrl, file })
            }
            imgUrl={updatedUser.photo}
            setImgUrl={value =>
              setUpdatedUser({ ...updatedUser, photo: value })
            }
          />
        </div>
        <div className="flex flex-col gap-2">
          <FormGroup label="Name">
            <InputField
              placeholder="Enter the name you want displayed"
              value={`${updatedUser.firstName} ${updatedUser.lastName}`}
              onChange={e => {
                const [firstName, lastName] = e.target.value.split(" ");
                setUpdatedUser({ ...updatedUser, firstName, lastName });
              }}
            />
          </FormGroup>
          <FormGroup label="Location">
            <SelectInput
              value={updatedUser.location}
              setValue={value => {
                setUpdatedUser({ ...updatedUser, location: value });
              }}
              options={states}
              placeholder="Select your location"
            />
          </FormGroup>
        </div>
      </div>
      {/* Social media */}
      <div className="flex flex-col gap-3 mb-6">
        <h3 className="text-sm font-normal text-[#8A9191] paytone">
          Social Media
        </h3>
        <div className="flex flex-col gap-2">
          <FormGroup label="Facebook">
            <InputField
              placeholder="https://facebook.com/your_facebook_name"
              leftIcon={<FaFacebook size={22} color="#0866FF" />}
              value={updatedUser.socials.facebook}
              onChange={e => {
                setUpdatedUser({
                  ...updatedUser,
                  socials: { ...updatedUser.socials, facebook: e.target.value },
                });
              }}
            />
          </FormGroup>
          <FormGroup label="Instagram">
            <InputField
              placeholder="https://instagram.com/your_instagram_name"
              leftIcon={<InstagramIcon size={22} />}
              value={updatedUser.socials.instagram}
              onChange={e => {
                setUpdatedUser({
                  ...updatedUser,
                  socials: { ...updatedUser.socials, instagram: e.target.value },
                });
              }}
            />
          </FormGroup>
          <FormGroup label="Twitter">
            <InputField
              placeholder="https://twitter.com/your_twitter_name"
              leftIcon={<FaXTwitter size={22} color="#001010" />}
              value={updatedUser.socials.twitter}
              onChange={e => {
                setUpdatedUser({
                  ...updatedUser,
                  socials: { ...updatedUser.socials, twitter: e.target.value },
                });
              }}
            />
          </FormGroup>
          <FormGroup label="LinkedIn">
            <InputField
              placeholder="https://linkedin.com/your_linkedin_name"
              leftIcon={<FaLinkedin size={22} color="#0A66C2" />}
              value={updatedUser.socials.twitter}
              onChange={e => {
                setUpdatedUser({
                  ...updatedUser,
                  socials: { ...updatedUser.socials, twitter: e.target.value },
                });
              }}
            />  
          </FormGroup>
        </div>
      </div>
      {/* Save Button */}
      <TextButton text="Save Changes" variant="primary" className="min-w-0" />
    </div>
  );
}

export default EditProfile;
