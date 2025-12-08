import { BrowserRouter, Route, Routes } from "react-router";
import ProtectedRoute from "./components/(appState)/ProtectedRoute";
import BlogPost from "./components/LandingPage/BlogPost";
import Payment from "./components/home/Payment";
import DashboardLayout from "./layouts/DashboardLayout";
import CreateEvent from "./routes/CreateEvent";
import Settings from "./routes/Settings";
import UserProfile from "./routes/UserProfile";

// import GoogleAuthCallback from "./components/Onboarding/GoogleAuthCallback";
import ScrollTop from "./components/Layout-conponents/ScrollTop";
import NormalHome from "./routes/NormalHome";
import MainLayout from "./layouts/MainLayout";
import { useRehydrateAuth } from "./lib/useRehydrateAuth";
import EventDetails from "./routes/EventDetails";
import AboutUs from "./routes/LandingPage/AboutUs";
import BlogPage from "./routes/LandingPage/BlogPage";
import HowItWorks from "./routes/LandingPage/HowItWorks";
import Pricing from "./routes/LandingPage/Pricing";
import ManageEventPage from "./routes/ManageEvent";

function App() {
  useRehydrateAuth(); // This hook is used to rehydrate the auth state from local storage or session storage

  return (
    <BrowserRouter>
      <ScrollTop />
      <Routes>
        {/* Public routes */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<HowItWorks />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:id" element={<BlogPost />} />
          <Route path="/about" element={<AboutUs />} />
        </Route>

        {/* Public dashboard routes */}
        <Route element={<DashboardLayout />}>
          <Route path="/event/:eventId" element={<EventDetails />} />
        </Route>

        {/* Protected dashboard routes */}
        <Route
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/create-event" element={<CreateEvent />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/home" element={<NormalHome />} />
          <Route path="/manage-event/:eventId" element={<ManageEventPage />} />
        </Route>

        {/* Profile Routes */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          }
        />

        {/* Test Routes */}
        <Route path="/test" element={<Payment />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
