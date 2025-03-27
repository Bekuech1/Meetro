import { BrowserRouter, Routes, Route } from "react-router"
import Authentication from "./routes/Onboarding/Authentication"
import Signup from "./routes/Onboarding/Signup"
import Homepage from "./routes/homepage"

function App() {

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element= {<Homepage />}/>
      <Route path="/authentication" element={<Authentication />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
