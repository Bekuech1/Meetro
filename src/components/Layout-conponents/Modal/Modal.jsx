import IconButton from "../Buttons/IconButton";
import React, { cloneElement, useState } from "react";
import { useDisableScroll } from "@/hooks/useDisableScroll";
import { CloseCircle } from "iconsax-reactjs";
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
function Window({ name, children, space = true }) {
  // Get context
  const { active, close } = useModalContext();

  // Check if window is active
  if (name !== active) return null;

  return createPortal(
    <React.Fragment>
      <StopScroll />
      <div className="fixed -inset-4 z-40 bg-[#ABABAB80] backdrop-blur-[32px]" />
      <div className="w-full fixed z-50 h-full flex items-end md:items-center left-0 top-0">
        <div className="flex flex-col gap-[10px] max-w-[546px] w-full mx-auto">
          {/* Close button */}
          <IconButton
            onClick={close}
            className="size-11! border-white! self-end mr-2 md:mr-0 bg-[#EDEDED]! hover:bg-[#E5E7E3]!"
            icon={<CloseCircle color="#DB2863" variant="Bold" size={24} />}
          />
          {/* Content */}
          <div
            className={`border-2 border-white rounded-t-[24px] md:rounded-[24px] bg-[#EDEDED] ${space ? "p-6 pb-12 md:p-12" : ""}`}
          >
            {children}
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
