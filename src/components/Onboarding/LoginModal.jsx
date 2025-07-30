import { useState } from "react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router";
import API from "@/lib/axios";
import { useAuthStore } from "@/stores/useAuthStore";

export default function LoginModal({ onSuccess }) {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { setUser, setAccessToken, setRefreshToken, setIdToken } =
    useAuthStore();
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await API.post("/login", formData);
      const { accessToken, idToken, refreshToken } = response.data;
      // console.log(response.data);

      setAccessToken(accessToken);
      setIdToken(idToken);
      setRefreshToken(refreshToken);

      const user = await API.get("/profile");
      // console.log(user);
      if (user) {
        setUser(user);
        onSuccess?.();
      }
    } catch (error) {
      console.log("Login failed:", error.response?.data || error);
    }
  };

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

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#00000080] backdrop-blur-xs z-50 p-2">
      <div className="bg-[#FFFFFFE5] p-6 md:p-12 border border-white backdrop-blur-[32px] rounded-3xl flex flex-col items-center gap-12 w-full md:w-[546px]">
        <div className=" flex flex-col items-center gap-2">
          <h2 className="text-[#4A3A74] paytone text-2xl">Login</h2>
          <p className="text-center text-[#8A9191]">
            login to your Meetro account
          </p>
        </div>

        <div className="flex flex-col gap-6 w-full">
          <form
            onSubmit={(e) => {
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
                    onChange={(e) =>
                      setFormData({ ...formData, [input.name]: e.target.value })
                    }
                    className="ml-8 text-sm bg-transparent font-medium text-[#B0B5B5
                      ] satoshi border-none outline-none focus:outline-none w-full"
                  />
                  {input.type === "password" && (
                    <img
                      src={showPassword ? "/eye-slash.svg" : "/open-eye.svg"}
                      alt="toggle visibility"
                      className="absolute right-4 top-1/4 cursor-pointer"
                      onClick={() => setShowPassword((prev) => !prev)}
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
                {loading ? "Loading..." : "Let's gooo!"}
              </button>
            </div>
          </form>

          <div>
            <p className="text-sm text-[#001010] text-center mt-6 satoshi font-bold ">
              Already have an account?{" "}
              <button
                className="text-[#866AD2]"
                onClick={() => navigate("/sign")}
              >
                Sign up
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
