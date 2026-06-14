import { useState } from "react";
import { useModalContext } from "../Modal/ModalContext";
import { twMerge } from "tailwind-merge";
import { DEFAULT_EVENT_IMAGES as templates } from "@/lib/utils";
import TextButton from "../Buttons/TextButtons";
import ImageInput from "../Inputs/ImageInput";
import Modal from "../Modal/Modal";

function ImageItem({ url, isSelected, onSelect }) {
  return (
    <div
      className={`cursor-pointer rounded-[16px] md:rounded-[24px] border-2 ${isSelected ? "border-[#7CB32D]" : "border-transparent"}`}
      onClick={() => onSelect(url)}
    >
      <img src={url} className="block size-full" />
    </div>
  );
}

export default function ImageTemplatesModal({ onSave, defaultImage }) {
  const isDefaultImage = templates.includes(defaultImage);
  const { close } = useModalContext();
  const [uploadedFile, setUploadedFile] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(
    isDefaultImage ? null : defaultImage
  );
  const [selectedTemplate, setSelectedTemplate] = useState(
    defaultImage || templates[0]
  );

  // Reset to initial values
  const resetValues = () => {
    setUploadedFile(null);
    setSelectedTemplate(defaultImage || templates[0]);
  };

  // Handle file select
  function handleUpload({ file, previewUrl }) {
    setUploadedFile(file);
    setUploadedImage(previewUrl);
    setSelectedTemplate(previewUrl);
    // Cleanup after closing modal
    return () => URL.revokeObjectURL(previewUrl);
  }

  // Handle save
  function handleSave() {
    if (!selectedTemplate) return;

    onSave?.({
      image: selectedTemplate,
      file: selectedTemplate === uploadedImage ? uploadedFile : null,
    });
    close();
  }

  // Handle template select
  function handleTemplateSelect(url) {
    setSelectedTemplate(url);
  }

  return (
    <Modal.Window
      name="image-templates"
      title="Image Templates"
      desktopWidth="sm:max-w-[900px]"
      onClose={() => {
        resetValues();
      }}
    >
      {/* Content goes here */}
      <div className="satoshi font-bold text-sm text-[#010E1F]">
        <div className="flex flex-col gap-y-12">
          <div className="grid grid-cols-3 [@media(min-width:440px)]:grid-cols-4 gap-2 sm:gap-4 [&>*]:aspect-square [&>*]:overflow-hidden">
            <div
              className={`cursor-pointer`}
              onClick={() => {
                if (!uploadedImage) return;
                handleTemplateSelect(uploadedImage);
              }}
            >
              <ImageInput
                size="md"
                onUpload={handleUpload}
                className={twMerge(
                  "max-md:rounded-[16px]",
                  "border-transparent",
                  uploadedImage &&
                    selectedTemplate === uploadedImage &&
                    "border-[#7CB32D]"
                )}
                setImgUrl={setUploadedImage}
                imgUrl={uploadedImage}
              />
            </div>
            {templates.map((image, i) => (
              <ImageItem
                key={i}
                url={image}
                isSelected={selectedTemplate === image}
                onSelect={handleTemplateSelect}
              />
            ))}
          </div>
          <div className="flex items-center justify-center md:justify-start gap-x-4">
            <TextButton
              text="Cancel"
              variant="tertiary"
              onClick={() => {
                close();
                resetValues();
              }}
            />
            <TextButton text="Save" onClick={handleSave} />
          </div>
        </div>
      </div>
    </Modal.Window>
  );
}
