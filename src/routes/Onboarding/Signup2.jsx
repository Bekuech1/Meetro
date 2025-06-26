import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import Layout from "../../components/Onboarding/Layout";
import OnboardingButton from "../../components/Onboarding/OnboardingButton";
import Form from "../../components/Onboarding/Form";
import Text from "../../components/Onboarding/Text";
import ShowOption from "@/components/Onboarding/ShowOption";
import API from "@/lib/axios";
import { useAuthStore } from "@/stores/useAuthStore";

function Signup2() {
  const { setAccessToken, setUser, setRefreshToken, setIdToken } =
    useAuthStore();
  // const setUser = useAuthStore((state) => state.setUser);

  const [formData, setFormData] = useState(() => {
    const data = JSON.parse(sessionStorage.getItem("signup"));
    if (!data) {
      return { firstName: "", lastName: "", password: "", email: "" };
    } else {
      return {
        firstName: data?.firstName,
        lastName: data?.lastName,
        password: data?.password,
        email: data?.email,
      };
    }
  });

  const [errorMessages, setErrorMessages] = useState({});
  const [showOptions, setShowOptions] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    // const newForm = { ...formData };
    sessionStorage.setItem("signup", JSON.stringify(formData));
  }, [formData]);

  const text = "Join the Meetro in seconds!";

  const button = {
    title: loading ? "Loading..." : "Let's gooo!",
    className:
      "w-full bg-[#AFFC41] text-[#095256] px-6 rounded-[60px] h-[36px]",
    onclick: handleSubmit,
    type: "submit",
  };

  const forms = [
    {
      id: "firstName",
      name: "firstName",
      placeholder: "First Name",
      type: "text",
      label: "What's your first name?",
      src: "user.svg",
      value: formData?.firstName ?? "",
      handleChange: handleChange,
      error: errorMessages.firstName,
    },
    {
      id: "lastName",
      name: "lastName",
      placeholder: "Last Name",
      type: "text",
      label: "What's your last name?",
      src: "user.svg",
      value: formData?.lastName ?? "",
      handleChange: handleChange,
      error: errorMessages.lastName,
    },
    {
      id: "email",
      name: "email",
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
      name: "password",
      placeholder: "Make it a good one!",
      label: "Create a password",
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
    // if (!/^[A-Za-z]+(?: [A-Za-z]+)*$/.test(formData.firstName)) {
    //   error.firstName = "Enter a valid name";
    // }

    // if (!/^[A-Za-z]+(?: [A-Za-z]+)*$/.test(formData.lastName)) {
    //   error.lastName = "Enter a valid name";
    // }

    if (!formData?.firstName.trim()) {
      error.firstName = "First name is required";
    }

    if (!formData?.lastName.trim()) {
      error.lastName = "Last name is required";
    }

    if (!formData?.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      error.email = "Enter a valid email";
    }

    if (!formData?.password.trim()) {
      error.password = "Enter your password";
    } else if (
      !/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(
        formData.password
      )
    ) {
      error.password =
        "Password must exceed 8, include a number, capital and lowercase a special character";
    }
    setErrorMessages(error);

    if (Object.keys(error).length === 0) {
      const payload = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
      };

      try {
        const signupResponse = await API.post("/signup", payload);
        // const userId = signupResponse.data.userId;
        console.log("Signup response:", signupResponse.data);

        const loginResponse = await API.post("/login", {
          email: formData.email,
          password: formData.password,
        });

        const { accessToken, refreshToken, idToken } = loginResponse.data;

        setAccessToken(accessToken);
        setRefreshToken(refreshToken);
        setIdToken(idToken);

        // console.log("Signup response:", response.data);
        // setToken(token);
        // localStorage.setItem("token", token);

        const userResponse = await API.get("/profile", {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        });

        setUser(userResponse.data);
        navigate("/home");
      } catch (err) {
        const msg = err.response?.data?.error || "Signup failed";
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
        handleClick1="/signup"
        handleClick2={() => setShowOptions(true)}>
        <div className="sm:w-[312px] w-[343px] mb-12">
          <form onSubmit={handleSubmit}>
            {forms.map((form, index) => (
              <Form key={index} {...form} />
            ))}
          </form>
        </div>
        <OnboardingButton {...button} />
        <Text path={"/signin"} />
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

export default Signup2;
