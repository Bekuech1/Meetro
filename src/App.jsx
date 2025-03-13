import { BrowserRouter, Routes, Route } from "react-router"
import Homepage from "./routes/homepage"

function App() {

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element= {<Homepage />}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
