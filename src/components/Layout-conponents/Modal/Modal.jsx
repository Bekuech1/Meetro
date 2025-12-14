import IconButton from "../Buttons/IconButton";
import React, { cloneElement, useState } from "react";
import TextButton from "../Buttons/TextButtons";
import { useDisableScroll } from "@/hooks/useDisableScroll";
import { CloseCircle, InfoCircle } from "iconsax-reactjs";
import { createPortal } from "react-dom";
import { ModalContext, useModalContext } from "./ModalContext";

// Modal
function Modal({ children }) {
  // Active state
  const [active, setActive] = useState(null);

  // Close modal
  const close = () => setActive(null);

  // Open modal
  const open = setActive;

  return (
    <ModalContext.Provider value={{ active, close, open, setActive }}>
      {children}
    </ModalContext.Provider>
  );
}

// Button
function Open({ opens, children }) {
  // Get context
  const { open } = useModalContext();

  // Clone child with onClick event
  return cloneElement(children, {
    onClick: e => {
      // Open modal
      open(opens);

      // Call original onClick if exists
      children.props.onClick?.(e);
    },
  });
}

// Disable scroll
function StopScroll() {
  useDisableScroll(true);
  return null;
}

// Window
function Window({
  name,
  children,
  title = "",
  onClose,
  desktopWidth = "sm:max-w-[546px]",
  showIcon = true,
}) {
  // Get context
  const { active, close } = useModalContext();

  // Check if window is active
  if (name !== active) return null;

  return createPortal(
    <React.Fragment>
      <StopScroll />
      <div className="fixed -inset-4 z-110 bg-[#ABABAB80] backdrop-blur-[32px] animate-in fade-in" />
      <div className="w-full fixed z-120 h-full flex items-end sm:items-center animate-in slide-in-from-bottom-35 left-0 top-0">
        <div
          className={`flex flex-col gap-[10px] ${desktopWidth} w-full mx-auto`}
        >
          {/* Close button */}
          <IconButton
            onClick={() => {
              close();
              onClose?.();
            }}
            className="size-11! border-white! self-end mr-2 sm:mr-0 bg-[#EDEDED]! hover:bg-[#E5E7E3]!"
            icon={<CloseCircle color="#DB2863" variant="Bold" size={24} />}
          />
          {/* Content */}
          <div
            className={`border-2 border-white rounded-t-[24px] sm:rounded-[24px] bg-[#EDEDED] ${title ? "" : "p-6 pb-12 sm:p-12"}`}
          >
            {/* Show info icon */}
            {showIcon && !title && (
              <IconButton
                className="pointer-events-none size-11! mb-6"
                variant="tertiary"
                icon={<InfoCircle color="#077D8A" size={24} variant="Bold" />}
              />
            )}
            {/* Show title */}
            {title && (
              <div className="p-2">
                <TextButton
                  className="w-full !justify-start pointer-events-none"
                  text={title}
                  variant="tertiary"
                />
              </div>
            )}
            <div
              className={`${title ? "py-12 px-4 sm:pt-4 sm:px-6 sm:pb-6" : ""}`}
            >
              {children}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>,
    document.body
  );
}

Modal.Open = Open;
Modal.Window = Window;
export default Modal;
