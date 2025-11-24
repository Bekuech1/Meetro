import API from "@/lib/axios";
import React, { useEffect, useState } from "react";
import { BsXLg } from "react-icons/bs";
import { useAuthStore } from "@/stores/useAuthStore";
import { LoadingSpinner } from "../create-event/Private";
import { createPortal } from "react-dom";
import { CloseCircle } from "iconsax-reactjs";

const loginInput = [
  {
    type: "email",
    label: "Email Address",
    icon: "/sms.svg",
    placeholder: "Email",
    name: "email",
    required: true,
  },
  {
    type: "password",
    label: "Password",
    icon: "/lock.svg",
    placeholder: "Password",
    name: "password",
    required: true,
  },
];

export default function LoginModal({ onSuccess, setModal, close }) {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { setUser, setAccessToken, user, setRefreshToken, setIdToken } =
    useAuthStore();

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await API.post("/login", formData);
      const { accessToken, idToken, refreshToken } = response.data;

      setAccessToken(accessToken);
      setIdToken(idToken);
      setRefreshToken(refreshToken);

      const userProfile = await API.get("/profile");

      if (userProfile) setUser(userProfile.data);
    } catch (error) {
      console.log("Login failed:", error.response?.data || error);
    }
  };

  useEffect(() => {
    if (user) onSuccess?.();
  }, [user]);

  return createPortal(
    <React.Fragment>
      <div
        className="fixed inset-0 bg-[#00000080] backdrop-blur-xs z-[1001] p-2"
        onClick={close}
      />
      <div className="px-4 fixed top-1/2 left-1/2 -translate-1/2 z-[1002] w-full md:max-w-[578px] flex flex-col  items-center gap-5">
        <div className="w-full flex justify-end">
          <button className="cursor-pointer flex sm:hidden">
            <CloseCircle
              size={48}
              variant="Bulk"
              onClick={close}
              color="#ffffff"
            />
          </button>
        </div>
        <div className="bg-[#FFFFFFE5] p-6 md:p-12 border border-white backdrop-blur-[32px] w-full rounded-3xl flex flex-col items-center gap-12">
          <div className=" flex flex-col items-center gap-2">
            <h2 className="text-[#4A3A74] paytone text-2xl">Login</h2>
            <p className="text-center text-[#8A9191]">
              login to your Meetro account
            </p>
          </div>

          <div className="flex flex-col gap-6 w-full">
            <form
              onSubmit={e => {
                e.preventDefault();
                handleLogin();
              }}
            >
              {loginInput.map((input, idx) => (
                <div key={idx} className="mb-3">
                  <label className="text-xs font-bold text-[#001010]">
                    {input.label}
                  </label>

                  <div className="relative bg-[#FFFFFE80] backdrop-blur-xs border border-white p-1.5 w-full h-9 md:w-[450px] rounded-[12px] mt-1 flex items-center">
                    <img
                      src={input.icon}
                      alt={`${input.label} icon`}
                      className="absolute left-1.5 top-1/6"
                    />
                    <input
                      type={
                        input.type === "password" && showPassword
                          ? "text"
                          : input.type
                      }
                      name={input.name}
                      placeholder={input.placeholder}
                      required={input.required}
                      onChange={e =>
                        setFormData({
                          ...formData,
                          [input.name]: e.target.value,
                        })
                      }
                      className="ml-8 text-sm bg-transparent font-medium text-[#B0B5B5
                      ] satoshi border-none outline-none focus:outline-none w-full"
                    />
                    {input.type === "password" && (
                      <img
                        src={showPassword ? "/eye-slash.svg" : "/open-eye.svg"}
                        alt="toggle visibility"
                        className="absolute right-4 top-1/4 cursor-pointer"
                        onClick={() => setShowPassword(prev => !prev)}
                      />
                    )}
                  </div>
                </div>
              ))}

              <div>
                <button
                  className={
                    "w-full text-[#095256] bg-[#AFFC41] h-9 rounded-[60px] paytone text-sm mt-3"
                  }
                  type="submit"
                  // onClick={handleLogin}
                >
                  {loading ? <LoadingSpinner /> : "Let's gooo!"}
                </button>
              </div>
              <div>
                <p className="text-sm text-[#001010] text-center mt-6 satoshi font-bold ">
                  Don't have an account?{" "}
                  <button
                    className="text-[#866AD2]"
                    type="button"
                    onClick={() => setModal("signup")}
                  >
                    Sign up
                  </button>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </React.Fragment>,
    document.body
  );
}
