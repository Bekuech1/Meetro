import React, { useState, useRef } from "react";
import InputModals from "../InputModals";

const Description = ({ isVisible, onClose, onSave }) => {
  const [descriptionText, setDescriptionText] = useState("");

  const handleDescriptionChange = (value) => {
    setDescriptionText(value);
  };

  const handleSave = () => {
    if (onSave) {
      onSave({
        data: descriptionText,
        displayText: descriptionText.substring(0, 50) + (descriptionText.length > 50 ? "..." : "")
      }); // Pass the description data in the expected format
    }
    onClose(); // Close the modal after saving
  };

  const textareaRef = useRef(null);

  const wrapSelectedText = (prefix, suffix = prefix) => {
    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = descriptionText.substring(start, end); // Use descriptionText instead of value

    if (selectedText) {
      const newText =
        descriptionText.substring(0, start) +
        prefix +
        selectedText +
        suffix +
        descriptionText.substring(end);

      handleDescriptionChange(newText); // Use handleDescriptionChange instead of onChange

      // Restore selection
      setTimeout(() => {
        textarea.selectionStart = start + prefix.length;
        textarea.selectionEnd = end + prefix.length;
        textarea.focus();
      }, 0);
    }
  };

  const insertLink = () => {
    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = descriptionText.substring(start, end); // Use descriptionText instead of value

    const linkText = selectedText || "Link text";
    const linkMarkdown = `[${linkText}](URL)`;

    const newText =
      descriptionText.substring(0, start) + linkMarkdown + descriptionText.substring(end);
    handleDescriptionChange(newText); // Use handleDescriptionChange instead of onChange

    // Position cursor at URL part
    setTimeout(() => {
      const urlStart = start + linkText.length + 3; // After ']('
      textarea.selectionStart = urlStart;
      textarea.selectionEnd = urlStart + 3; // Select 'URL'
      textarea.focus();
    }, 0);
  };

  return (
    <InputModals
      isVisible={isVisible}
      onClose={onClose}
      title="event description"
      onSave={handleSave}
      hidden="hidden"
    >
      <div className="w-full h-fit grid gap-4">
        {/* <div className="w-full h-fit flex gap-4 satoshi">
          <div
            className="size-fit p-1 rounded-4xl bg-white cursor-pointer"
            onClick={() => wrapSelectedText("**")}
          >
            <img src="text-bold.svg" alt="" />
          </div>
          <div
            className="size-fit p-1 rounded-4xl bg-white cursor-pointer"
            onClick={() => wrapSelectedText("*")}
          >
            <img src="text-italic.svg" alt="" />
          </div>
          <div
            className="size-fit p-1 rounded-4xl bg-white cursor-pointer"
            onClick={() => wrapSelectedText("<u>", "</u>")}
          >
            <img src="text-underline.svg" alt="" />
          </div>
          <div
            className="size-fit p-1 rounded-4xl bg-white cursor-pointer"
            onClick={insertLink}
          >
            <img src="link.svg" alt="" />
          </div>
        </div> */}
        <textarea
          ref={textareaRef}
          value={descriptionText}
          onChange={(e) => handleDescriptionChange(e.target.value)}
          placeholder="Enter your event description"
          className="focus:outline-none text-[14px] font-bold text-black placeholder:text-[#8A96A3] w-full h-[224px] satoshi"
        />
      </div>
      <div></div>
    </InputModals>
  );
};

export default Description;