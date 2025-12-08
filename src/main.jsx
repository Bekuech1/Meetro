import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./font.css";
import App from "./App.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Modal from "./components/Layout-conponents/Modal/Modal";

createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
    <StrictMode>
      <Modal>
        <App />
      </Modal>
    </StrictMode>
  </GoogleOAuthProvider>
);
