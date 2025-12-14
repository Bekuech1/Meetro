import Modal from "../Modal/Modal";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import { useState } from "react";

function AuthModal({ onSuccess }) {
  // Active tab state
  const [active, setActive] = useState("login");
  return (
    <Modal.Window name="auth" onClose={() => setActive("login")}>
      {active === "login" ? (
        <LoginForm setActive={setActive} onSuccess={onSuccess} />
      ) : (
        <SignUpForm setActive={setActive} onSuccess={onSuccess} />
      )}
    </Modal.Window>
  );
}

export default AuthModal;
