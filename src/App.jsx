import { BrowserRouter, Routes, Route } from "react-router";
import Authentication from "./routes/Onboarding/Authentication";
import Signup from "./routes/Onboarding/Signup";
import Homepage from "./routes/homepage";
import HomepageLayout from "./layouts/HomepageLayout";
import Home from "./routes/home";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/authentication" element={<Authentication />} />
          <Route path="/signup" element={<Signup />} />

          {/* Homepage Route */}
          <Route path="/home" element={<HomepageLayout />}>
            <Route index element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
