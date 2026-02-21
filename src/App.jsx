import { Routes, Route, Navigate } from "react-router-dom"
import Login from "./pages/Login"
import Home from "./pages/Home"
import SOS from "./pages/SOS"
function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/sos" element={<SOS />} />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" />} />




    </Routes>
  )
}

export default App