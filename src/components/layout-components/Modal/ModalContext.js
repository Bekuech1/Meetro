import { createContext, useContext } from "react";

// Create context
export const ModalContext = createContext();

// Use context
export const useModalContext = () => {
  // Get context
  const context = useContext(ModalContext);

  // Error if used outside provider
  if (context === undefined)
    throw new Error("ModalContext was used outside provider");

  return context;
};
