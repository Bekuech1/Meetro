import Modal from "../layout-components/Modal/Modal";
import ForgotPasswordForm from "./ForgotPasswordForm";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import { useState } from "react";

function AuthModal({ onSuccess }) {
  // Active form state
  const [form, setForm] = useState("login");

  const renderContent = () => {
    switch (form) {
      case "login":
        return <LoginForm setForm={setForm} onSuccess={onSuccess} />;
      case "signup":
        return <SignUpForm setForm={setForm} onSuccess={onSuccess} />;
      case "forgot-password":
        return <ForgotPasswordForm />;
      default:
        return null;
    }
  };

  return (
    <Modal.Window name="auth" onClose={() => setForm("login")}>
      {renderContent()}
    </Modal.Window>
  );
}

export default AuthModal;
