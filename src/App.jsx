import ProtectedRoute from "./components/(appState)/ProtectedRoute";
import BlogPost from "./components/landing-page/BlogPost";
import DashboardLayout from "./layouts/DashboardLayout";
import ScrollTop from "./components/layout-components/ScrollTop";
import MainLayout from "./layouts/MainLayout";
import AboutUs from "./routes/landing-page/AboutUs";
import BlogPage from "./routes/landing-page/BlogPage";
import HowItWorks from "./routes/landing-page/HowItWorks";
import Pricing from "./routes/landing-page/Pricing";
import MyEvents from "./routes/MyEvents";
import ResetPassword from "./routes/ResetPassword";
import ManageEvent from "./routes/ManageEvent";
import ManageEventHeader from "./components/manage-event/ManageEventHeader";
import EditEvent from "./routes/EditEvent";
import { BrowserRouter, Route, Routes } from "react-router";
import { useRehydrateUser } from "./hooks/useRehydrateUser";
import CreateEvent from "./routes/CreateEvent";

function App() {
  useRehydrateUser(); // Rehydrate user on app load

  return (
    <BrowserRouter>
      <ScrollTop />
      <Routes>
        {/* Landing Page */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<HowItWorks />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:id" element={<BlogPost />} />
          <Route path="/about" element={<AboutUs />} />
        </Route>
        {/* Reset password */}
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <ManageEventHeader />
              </DashboardLayout>
            </ProtectedRoute>
          }
        >
          <Route path="/edit-event/:slug" element={<EditEvent />} />
          <Route path="/manage-event/:slug" element={<ManageEvent />} />
        </Route>
        <Route
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/home" element={<MyEvents />} />
        </Route>
        <Route
          path="/create-event"
          element={
            <ProtectedRoute>
              <CreateEvent />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
