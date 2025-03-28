import { BrowserRouter, Routes, Route } from "react-router"
import Authentication from "./routes/Onboarding/Authentication"
import Signup from "./routes/Onboarding/Signup"
import Homepage from "./routes/homepage"
import Signup2 from "./routes/Onboarding/Signup2"

function App() {

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element= {<Homepage />}/>
      <Route path="/authentication" element={<Authentication />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/sign" element={<Signup2 />} />
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
