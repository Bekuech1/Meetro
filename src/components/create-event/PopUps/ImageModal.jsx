import React, { useState } from "react";

// Sample image sources - replace with your actual image URLs
const imageSources = [
  "/event-ph1.png",
  "/event-ph2.jpg",
  "/event-ph3.jpg",
  "/event-ph4.jpg",
  "/event-ph5.jpg",
  "/event-ph6.jpg",
  "/event-ph7.jpg",
];

const ImageModal = ({ onClose, isOpen, onSave, handleImageUpload }) => {
  if (!isOpen) return null;

  // State to manage selected image and uploaded image
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);

  const handleImageSelect = (imageSrc) => {
    setSelectedImage(imageSrc);
    setUploadedImage(null); // Clear uploaded image if template is selected

    // Pass data back to parent immediately upon selection
    if (onSave) {
      onSave({
        type: "template",
        imageSrc: imageSrc,
        imageUrl: imageSrc,
      });
    }
    onClose(); // Close modal after selection
  };

  const handleLocalFileRead = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const uploadedImageUrl = e.target.result;
        setUploadedImage(uploadedImageUrl);
        setSelectedImage(null); // Clear template selection if image is uploaded

        // Pass data back to parent
        if (onSave) {
          onSave({
            type: "upload",
            file: file,
            imageUrl: uploadedImageUrl,
            fileName: file.name,
          });
        }
        onClose(); // Close modal after upload
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageUploadLocal = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      const result = await handleImageUpload(file);

      if (result.success) {
        setUploadedImage(result.imageUrl);
        setSelectedImage(null); // Clear template selection if image is uploaded

        // Pass data back to parent
        if (onSave) {
          onSave({
            type: "upload",
            file: file,
            imageUrl: result.imageUrl,
            fileName: file.name,
          });
        }
        onClose(); // Close modal after upload
      } else {
        console.error("Image upload failed:", result.error);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <div className="fixed inset-0 h-screen flex items-center justify-center z-30 bg-[#00000080]/50 backdrop-blur-[4px]">
      <div className="size-fit max-h-[85vh] flex flex-col justify-center items-center relative rounded-3xl bg-white/90 md:p-8 p-4 md:gap-6 gap-4">
        <div className="w-full satoshi">
          <h5 className="capitalize text-black md:text-[18px] text-sm font-bold">
            image templates
          </h5>
          <p className="text-[#8A9191] font-medium md:text-sm text-[10px]">
            Upload or select Images from our template for your Event
          </p>
        </div>

        <div className="grid  grid-cols-3 lg:grid-cols-4 xl:gap-4 gap-x-3 gap-y-2 h-fit">
          {/* Upload Section */}
          <div className="xl:size-[248px] md:size-[180px] size-[135px] rounded-2xl flex items-center justify-center bg-[#E6E9E7] shadow-md cursor-pointer relative">
            <label className="flex flex-col justify-center items-center gap-4 size-fit cursor-pointer">
              <div className="rounded-full flex items-center justify-center size-12 bg-white">
                <img src="/image.svg" alt="" className="size-6" />
              </div>
              <div className="md:text-sm text-[10px] font-[400] size-fit rounded-[60px] py-3 px-6 capitalize text-[#077D8A] bg-white paytone">
                upload image
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUploadLocal}
                className="absolute inset-0 w-full h-full cursor-pointer opacity-0"
              />
            </label>
          </div>

          {/* Template Images */}
          {imageSources.map((src, index) => (
            <div
              key={index}
              className={`image-wrapper rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer`}
              onClick={() => handleImageSelect(src)}>
              <img
                src={src}
                alt={`Template ${index + 1}`}
                className="xl:size-[248px] md:size-[180px] size-[135px] rounded-2xl object-cover"
              />
            </div>
          ))}
        </div>

        {/* Close Button */}
        <img
          src="/closePopup.svg"
          alt="close popup"
          className="h-12 w-12 absolute md:-top-10 -top-14 md:left-[99%] left-[90%] cursor-pointer"
          onClick={onClose}
        />
      </div>
    </div>
  );
};

export default ImageModal;
