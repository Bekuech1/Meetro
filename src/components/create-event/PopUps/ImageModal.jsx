import React, { useState, useEffect } from "react";

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


  const handleImageSelect = async (imageSrc) => {
    try {
      // Close modal immediately first
      onClose();
      
      // Fetch the static image file from your public folder
      const response = await fetch(imageSrc);
      const blob = await response.blob();

      // Wrap the blob in a File object
      const file = new File([blob], `template-${Date.now()}.jpg`, {
        type: blob.type || "image/jpeg",
      });

      // Use your existing upload handler
      const result = await handleImageUpload(file);

      if (result.success) {
        // Pass back uploaded info (same as uploaded files)
        if (onSave) {
          onSave({
            type: "template",
            file,
            imageUrl: result.imageUrl, // URL from your storage
            fileName: file.name,
            imageKey: result.imageKey, // keep the key for backend
          });
        }
      } else {
        console.error("Template upload failed:", result.error);
      }
    } catch (error) {
      console.error("Error uploading template image:", error);
    }
  };

  const handleImageUploadLocal = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Close modal immediately when file upload starts
    onClose();

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
            imageKey: result.imageKey, // Add imageKey for consistency
          });
        }
      } else {
        console.error("Image upload failed:", result.error);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <div className="fixed inset-0 h-screen sm:items-center items-end flex justify-center z-30 bg-black/50 backdrop-blur-[4px]">
      <div className="sm:h-fit sm:w-fit w-full h-[85vh] flex flex-col justify-center items-center relative sm:rounded-3xl rounded-t-3xl bg-white/90 md:p-8 p-4 md:gap-6 gap-4">
        <div className="w-full satoshi">
          <h5 className="capitalize text-black md:text-[18px] text-sm font-bold">
            image templates
          </h5>
          <p className="text-[#8A9191] font-medium md:text-sm text-[10px]">
            Upload or select Images from our template for your Event
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:gap-4 gap-x-3 gap-y-2 h-full w-fit overflow-y-auto scrollbar-hide">
  {/* Upload Section */}
  <div className="xl:size-[248px] md:size-[180px] sm:size-[135px] size-[160px] rounded-2xl flex items-center justify-center bg-[#E6E9E7] shadow-md cursor-pointer relative">
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
        className="absolute inset-0 size-full cursor-pointer opacity-0" 
      />
    </label>
  </div>

  {/* Template Images */}
  {imageSources.map((src, index) => (
    <div 
      key={index} 
      className="xl:size-[248px] md:size-[180px] sm:size-[135px] size-[160px] rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer"
      onClick={() => handleImageSelect(src)}
    >
      <img 
        src={src} 
        alt={`Template ${index + 1}`} 
        className="size-full object-cover" 
      />
    </div>
  ))}

  {/* Close Button */}
  <img 
    src="/closePopup.svg" 
    alt="close popup" 
    className="h-12 w-12 absolute md:-top-10 -top-14 md:left-[99%] right-[0%] rounded-full cursor-pointer" 
    onClick={onClose} 
  />
</div>
      </div>
    </div>
  );
};

export default ImageModal;
