// // src/pages/GoogleAuthCallback.jsx

// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const GoogleAuthCallback = () => {
//   const navigate = useNavigate();

//   useEffect(() => {
//     const urlParams = new URLSearchParams(window.location.search);
//     const code = urlParams.get("code");

//     if (code) {
//       // Send the auth code to your backend for token exchange
//       axios
//         .post("https://your-api.com/authentication/google/callback", { code })
//         .then((res) => {
//           // Assuming your backend returns an idToken and user info
//           const { idToken, user } = res.data;

//           // Save the idToken and user info in your state management solution
//           localStorage.setItem("idToken", idToken); // Example using localStorage
//           localStorage.setItem("user", JSON.stringify(user));

//           // Redirect to home or dashboard after successful login
//           console.log("Google login successful:", user);

//           navigate("/home"); // or wherever
//         })
//         .catch((err) => {
//           console.error("Google login failed:", err);
//         });
//     }
//   }, []);

//   return <p>Processing Google login...</p>;
// };

// export default GoogleAuthCallback;
