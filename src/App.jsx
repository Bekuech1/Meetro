import { BrowserRouter, Routes, Route } from "react-router"
import Authentication from "./routes/Onboarding/Authentication"
import Signup from "./routes/Onboarding/Signup"
import Homepage from "./routes/Homepage"
import Signup2 from "./routes/Onboarding/Signup2"
import Location from "./routes/Onboarding/Location"
import Calender from "./routes/Onboarding/Calender"
import Interest from "./routes/Onboarding/Interest"

function App() {

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element= {<Homepage />}/>
      <Route path="/authentication" element={<Authentication />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/sign" element={<Signup2 />} />
      <Route path="/location" element={<Location />} />
      <Route path="/calender" element={<Calender />} />
      <Route path="/interest" element={<Interest />} />
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
