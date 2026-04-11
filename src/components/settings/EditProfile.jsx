import { states } from "@/lib/utils";
import { authApi } from "@/services/authApi";
import { useAuthStore } from "@/stores/useAuthStore";
import { useMutation } from "@tanstack/react-query";
import { TickCircle } from "iconsax-reactjs";
import { useState } from "react";
import { FaFacebook, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import InstagramIcon from "@/assets/icons/InstagramIcon";
import Alert from "../layout-components/Alert";
import TextButton from "../layout-components/Buttons/TextButtons";
import FormGroup from "../layout-components/Inputs/FormGroup";
import ImageInput from "../layout-components/Inputs/ImageInput";
import InputField from "../layout-components/Inputs/InputField";
import SelectInput from "../layout-components/Inputs/SelectInput";
import LoadingSpinner from "../layout-components/LoadingSpinner";

function EditProfile() {
  const { user, setUser } = useAuthStore();
  const [errorMessage, setErrorMessage] = useState("");
  const [validation, setValidation] = useState({
    name: "",
    address: "",
    socials: {
      facebook: "",
      instagram: "",
      twitter: "",
      linkedin: "",
    },
  });
  const [file, setFile] = useState(null);
  const initalUser = {
    name: user ? `${user.firstName} ${user.lastName}` : "",
    photo: user?.photo || "",
    address: user?.address || "",
    socials: user?.socials || {
      facebook: "",
      instagram: "",
      twitter: "",
      linkedin: "",
    },
  };
  const [updatedUser, setUpdatedUser] = useState(initalUser);

  const [saveStatus, setSaveStatus] = useState("idle");

  const { mutateAsync: updateProfile } = useMutation({
    mutationFn: data => authApi.updateProfile(data),
    onMutate: () => setSaveStatus("saving"),
    onSuccess: data => {
      setUser(data);
      setSaveStatus("saved");
      setTimeout(() => setSaveStatus("idle"), 2000);
    },
    onError: error => {
      setSaveStatus("idle");
      setErrorMessage(
        error.response?.data?.message || "Failed to update profile"
      );
    },
  });

  // Handle update profile
  const handleUpdateProfile = () => {
    if (!validateFields()) return;
    // Clear error message
    setErrorMessage("");
    // Create form data
    const formData = new FormData();
    formData.append("name", updatedUser.name);
    formData.append("address", updatedUser.address);
    formData.append("socials", JSON.stringify(updatedUser.socials));
    if (file) formData.append("photo", file);
    // Update profile
    updateProfile(formData);
  };

  // Validate fields
  const validateFields = () => {
    const errors = { socials: {} };
    if (!updatedUser.name.trim()) {
      errors.name = "Full name is required";
    }

    if (
      updatedUser.socials.facebook &&
      !/^https?:\/\/\S+$/.test(updatedUser.socials.facebook.trim())
    ) {
      errors.socials.facebook = "Invalid Facebook URL";
    }
    if (
      updatedUser.socials.instagram &&
      !/^https?:\/\/\S+$/.test(updatedUser.socials.instagram.trim())
    ) {
      errors.socials.instagram = "Invalid Instagram URL";
    }
    if (
      updatedUser.socials.twitter &&
      !/^https?:\/\/\S+$/.test(updatedUser.socials.twitter.trim())
    ) {
      errors.socials.twitter = "Invalid Twitter URL";
    }
    if (
      updatedUser.socials.linkedin &&
      !/^https?:\/\/\S+$/.test(updatedUser.socials.linkedin.trim())
    ) {
      errors.socials.linkedin = "Invalid LinkedIn URL";
    }

    if (Object.keys(errors.socials).length === 0) {
      delete errors.socials;
    }
    setValidation(errors);

    return Object.keys(errors).length === 0;
  };

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
            onUpload={({ file, previewUrl }) => {
              setUpdatedUser(prev => ({ ...prev, photo: previewUrl }));
              setFile(file);
            }}
            imgUrl={updatedUser.photo}
            setImgUrl={value =>
              setUpdatedUser({ ...updatedUser, photo: value })
            }
          />
        </div>
        <div className="flex flex-col gap-2">
          <FormGroup
            label="Name"
            message={
              validation.name
                ? {
                    type: "error",
                    text: validation.name,
                  }
                : null
            }
          >
            <InputField
              placeholder="Enter the name you want displayed"
              value={updatedUser.name}
              onChange={e => {
                setUpdatedUser({ ...updatedUser, name: e.target.value });
              }}
            />
          </FormGroup>
          <FormGroup
            label="Location"
            message={
              validation.address
                ? {
                    type: "error",
                    text: validation.address,
                  }
                : null
            }
          >
            <SelectInput
              value={updatedUser.address}
              setValue={value => {
                setUpdatedUser({ ...updatedUser, address: value });
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
          <FormGroup
            label="Facebook"
            message={
              validation.socials?.facebook
                ? {
                    type: "error",
                    text: validation.socials.facebook,
                  }
                : null
            }
          >
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
          <FormGroup
            label="Instagram"
            message={
              validation.socials?.instagram
                ? {
                    type: "error",
                    text: validation.socials.instagram,
                  }
                : null
            }
          >
            <InputField
              placeholder="https://instagram.com/your_instagram_name"
              leftIcon={<InstagramIcon size={22} />}
              value={updatedUser.socials.instagram}
              onChange={e => {
                setUpdatedUser({
                  ...updatedUser,
                  socials: {
                    ...updatedUser.socials,
                    instagram: e.target.value,
                  },
                });
              }}
            />
          </FormGroup>
          <FormGroup
            label="Twitter"
            message={
              validation.socials?.twitter
                ? {
                    type: "error",
                    text: validation.socials.twitter,
                  }
                : null
            }
          >
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
          <FormGroup
            label="LinkedIn"
            message={
              validation.socials?.linkedin
                ? {
                    type: "error",
                    text: validation.socials.linkedin,
                  }
                : null
            }
          >
            <InputField
              placeholder="https://linkedin.com/your_linkedin_name"
              leftIcon={<FaLinkedin size={22} color="#0A66C2" />}
              value={updatedUser.socials.linkedin}
              onChange={e => {
                setUpdatedUser({
                  ...updatedUser,
                  socials: { ...updatedUser.socials, linkedin: e.target.value },
                });
              }}
            />
          </FormGroup>
        </div>
      </div>
      {errorMessage && (
        <Alert type="error" title={errorMessage} className="mb-4" />
      )}
      {/* Save Button */}
      <TextButton
        text={
          saveStatus === "saving"
            ? "Saving..."
            : saveStatus === "saved"
              ? "Saved"
              : "Save Changes"
        }
        leftImg={
          saveStatus === "saving" ? (
            <LoadingSpinner />
          ) : saveStatus === "saved" ? (
            <TickCircle variant="Bold" />
          ) : undefined
        }
        disabled={saveStatus !== "idle"}
        variant={saveStatus === "saved" ? "secondary" : "primary"}
        className="transition-colors duration-300"
        onClick={handleUpdateProfile}
      />
    </div>
  );
}

export default EditProfile;
