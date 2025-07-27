import { BrowserRouter, Routes, Route } from "react-router";
import Authentication from "./routes/Onboarding/Authentication";
import Signup from "./routes/Onboarding/Signup";
import Homepage from "./routes/LandingPage/Homepage";
import Signup2 from "./routes/Onboarding/Signup2";
import Location from "./routes/Onboarding/Location";
import Calender from "./routes/Onboarding/Calender";
import Interest from "./routes/Onboarding/Interest";
import Home from "./routes/home";
import Login from "./routes/Onboarding/Login";
import LoginForm from "./routes/Onboarding/LoginForm";
import ReserveSpot from "./components/home/ReserveSpot";
import HomepageLayout from "./layouts/HomepageLayout";
import BlogPost from "./components/LandingPage/BlogPost";
import Payment from "./components/home/Payment";
import CreateEventsLayout from "./layouts/CreateEventsLayout";
import CreateEvent from "./routes/CreateEvent";
import UserProfile from "./routes/UserProfile";
import Settings from "./routes/Settings";
import ProtectedRoute from "./components/(appState)/ProtectedRoute";

// import GoogleAuthCallback from "./components/Onboarding/GoogleAuthCallback";
import { useRehydrateAuth } from "./lib/useRehydrateAuth";
import EventDetails from "./routes/EventDetails";
import ManageEventPage from "./routes/ManageEvent";

function App() {
  useRehydrateAuth(); // This hook is used to rehydrate the auth state from local storage or session storage

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />

          {/* Blogs Route */}
          <Route path="blog/:id" element={<BlogPost />} />

          {/* Onboarding Routes */}
          <Route path="/authentication" element={<Authentication />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/sign" element={<Signup2 />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signin" element={<LoginForm />} />
          <Route path="/location" element={<Location />} />
          <Route path="/calender" element={<Calender />} />
          <Route path="/interest" element={<Interest />} />
          {/* <Route
            path="/google-auth-callback"
            element={<GoogleAuthCallback />}
          /> */}

          {/* Profile Routes */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <UserProfile />
              </ProtectedRoute>
            }
          />
          {/* <Route path="/settings" element={<Settings />} /> */}

          {/* Homepage Route */}
          <Route path="/home" element={<HomepageLayout />}>
            <Route
              index
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
          </Route>

          <Route path="/settings" element={<HomepageLayout />}>
            <Route index element={<Settings />} />
          </Route>

          <Route path="/event/:eventId" element={<HomepageLayout />}>
            <Route index element={<EventDetails />} />
          </Route>

          <Route path="/manage-event/:eventId" element={<HomepageLayout />}>
            <Route index element={<ManageEventPage />} />
          </Route>

          {/* Test Routes */}
          <Route path="/test" element={<Payment />} />

          {/* Create Event Routes */}
          <Route path="/create-event" element={<CreateEventsLayout />}>
            <Route index element={<CreateEvent />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
