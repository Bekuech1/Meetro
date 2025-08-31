import { useState } from "react";
import { useNavigate } from "react-router";
import Layout from "../../components/Onboarding/Layout";
import Form from "../../components/Onboarding/Form";
import OnboardingButton from "../../components/Onboarding/OnboardingButton";
import ShowOption from "@/components/Onboarding/ShowOption";
import API from "@/lib/axios";
import { useAuthStore } from "@/stores/useAuthStore";
// import {jwtDecode} from "jwt-decode";

function LoginForm() {
  const { setAccessToken, setUser, setRefreshToken, setIdToken } =
    useAuthStore();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({ password: "", email: "" });
  // const [formData, setFormData] = useState(() => {
  //   const data = JSON.parse(sessionStorage.getItem("login"));
  //   if (!data) {
  //     return { name: "", password: "", email: "" };
  //   } else {
  //     return {
  //       name: data?.name,
  //       password: data?.password,
  //       email: data?.email,
  //     };
  //   }
  // });

  const [errorMessages, setErrorMessages] = useState({});
  const [showOptions, setShowOptions] = useState(false);

  // useEffect(() => {
  //   const newForm = { ...formData };
  //   sessionStorage.setItem("login", JSON.stringify(newForm));
  // }, [formData]);

  const navigate = useNavigate();
  const text = (
    <p>
      Welcome back! <br /> We saved you a spot.
    </p>
  );

  const button = {
  title: "Let's gooo!",
  className: "w-full bg-[#011F0F] text-[#BEFD66] px-6 rounded-[60px] h-[36px]",
  onclick: handleSubmit,
  type: "submit",
  isLoading: loading,
};

  const forms = [
    {
      id: "email",
      placeholder: "e.g. newman@gmail.com",
      label: "Drop your email here",
      src: "sms.svg",
      type: "email",
      value: formData?.email ?? "",
      handleChange: handleChange,
      error: errorMessages.email,
    },
    {
      id: "password",
      placeholder: "your password",
      label: "Enter your password",
      src: "lock.svg",
      type: "password",
      value: formData?.password ?? "",
      handleChange: handleChange,
      error: errorMessages.password,
    },
  ];

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setLoading(true);

    let error = {};

    if (!formData?.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      error.email = "Enter a valid email";
    }

    if (
      !/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(
        formData.password
      )
    ) {
      error.password =
        "Password must exceed 8, include a number, capital and lowercase a special character";
    }
    if (!formData?.password.trim()) {
      error.password = "Enter your password";
    }

    setErrorMessages(error);

    if (Object.keys(error).length === 0) {
      const payload = {
        email: formData.email,
        password: formData.password,
      };

      try {
        const response = await API.post("/login", payload); // 🔁 Replace with real endpoint
        const { accessToken, refreshToken, idToken } = response.data;

        setAccessToken(accessToken);
        setRefreshToken(refreshToken);
        setIdToken(idToken);

        // const user = jwtDecode(idToken);
        // setUser(user);
        // console.log(user);

        const userResponse = await API.get("/profile");
        setUser(userResponse.data);
        console.log(userResponse.data);

        navigate("/home");
      } catch (err) {
        const msg = err.response?.data?.error || "Login failed";
        setErrorMessages((prev) => ({ ...prev, email: msg }));
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }

  return (
    <div>
      <Layout
        text={text}
        width={"w-[255px]  sm:w-[450px]"}
        handleClick1="/login"
        handleClick2={() => setShowOptions(true)}
      >
        <div className={`sm:w-[312px] w-[343px] mb-9`}>
          <form onSubmit={handleSubmit}>
            {forms.map((form, index) => (
              <Form key={index} {...form} />
            ))}
          </form>
        </div>
        <OnboardingButton {...button} />
        <div>
          <h3 className="text-xs text-center sm:text-sm mt-6 font-medium satoshi">
            New to Meetro?
            <span
              className="text-purple-400 satoshi cursor-pointer"
              onClick={() => navigate("/sign")}
            >
              {" "}
              Sign up here
            </span>
          </h3>
        </div>
      </Layout>
      {showOptions && (
        <ShowOption
          onclick1={() => {
            setShowOptions(false);
            navigate("/");
            setErrorMessages({});
          }}
          onclick2={() => setShowOptions(false)}
        />
      )}
    </div>
  );
}

export default LoginForm;
