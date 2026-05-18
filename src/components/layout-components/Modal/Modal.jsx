import IconButton from "../Buttons/IconButton";
import TextButton from "../Buttons/TextButtons";
import React, { cloneElement, useState } from "react";
import { useDisableScroll } from "@/hooks/useDisableScroll";
import { CloseCircle } from "iconsax-reactjs";
import { createPortal } from "react-dom";
import { ModalContext, useModalContext } from "./ModalContext";
import { twMerge } from "tailwind-merge";

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
function Open({ opens, children, onOpen }) {
  // Get context
  const { open } = useModalContext();

  // Clone child with onClick event
  return cloneElement(children, {
    onClick: e => {
      // Call onOpen callback if provided
      onOpen?.();
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
  showCloseButton = true,
  isCloseButtonDisabled = false,
  padding,
}) {
  // Get context
  const { active, close } = useModalContext();

  // Check if window is active
  if (name !== active) return null;

  return createPortal(
    <React.Fragment>
      <StopScroll />
      <div className="fixed inset-0 z-110 bg-[#ABABAB80] backdrop-blur-[32px] pointer-events-auto animate-in fade-in" />
      <div className="w-full fixed z-120 h-full flex items-end sm:items-center animate-in slide-in-from-bottom-35 left-0 top-0 pointer-events-none">
        <div
          className={`flex flex-col gap-[10px] ${desktopWidth} w-full mx-auto pointer-events-auto max-h-[95dvh]`}
        >
          {/* Close button */}
          {showCloseButton && (
            <IconButton
              onClick={() => {
                close();
                onClose?.();
              }}
              disabled={isCloseButtonDisabled}
              className={twMerge(
                "size-11! border-white! self-end mr-2 sm:mr-0 bg-[#EDEDED]! hover:bg-[#E5E7E3]! shrink-0",
                isCloseButtonDisabled && "pointer-events-none"
              )}
              icon={<CloseCircle color="#DB2863" variant="Bold" size={24} />}
            />
          )}
          {/* Content */}
          <div
            className={`border-2 border-white overflow-hidden rounded-t-[24px] sm:rounded-[24px] bg-[#EDEDED] flex flex-col min-h-0`}
          >
            {/* Show title */}
            {title && (
              <div className="px-2 pt-2 shrink-0">
                <TextButton
                  className="w-full !justify-start normal-case pointer-events-none"
                  text={title}
                  variant="tertiary"
                />
              </div>
            )}
            <div
              className={twMerge(
                "overflow-y-auto p-6 pb-12 sm:p-12 scrollbar-hide",
                title && "pb-12 py-4 px-4 sm:pt-4 sm:px-6 sm:pb-6",
                padding && padding
              )}
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
