import { Route, Routes } from "react-router-dom"
import Navbar from "./components/layout/Navbar"
import Login from "./pages/Login"
import Register from "./pages/institution/Register"
import UserManagement from "./pages/institution/UserManagement"
import PostInitGrades from "./pages/instructor/PostInitGrades"
import GradeStats from "./pages/student/GradeStats"

import "./styles/PageLayout.css"

/* here are the routes for each page */
function App() {
  return (
    <div className="page-layout">
      <Navbar />
      <div className="body-container">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Login />} />
          <Route path="/courses" element={<Login />} />
          <Route path="/grades" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/institution" element={<Register />} />
          <Route path="/institution/user-management" element={<UserManagement />} />
          <Route path="/instructor" element={<PostInitGrades />} />
          <Route path="/student" element={<GradeStats />} />
        </Routes>
      </div>
    </div>
  )
}

export default App