import { Route, Routes } from "react-router-dom"
import Navbar from "./components/layout/Navbar"
import Login from "./pages/Login"
import Register from "./pages/institution/Register"
import UserManagement from "./pages/institution/UserManagement"
import PostInitGrades from "./pages/instructor/PostInitGrades"
import PostFinalGrades from "./pages/instructor/PostFinalGrades"
import GradeStats from "./pages/GradeStats"
import MyCourses from "./pages/student/MyCourses"
import PersonalGrades from "./pages/student/PersonalGrades"
import GradeRR from "./pages/student/GradeRR"
import StatusGradeRR from "./pages/student/StatusGradeRR"

import "./styles/PageLayout.css"

/* here are the routes for each page */
export default function App() {
  return (
    <div className="page-layout">
      <Navbar />
      <div className="body-container">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Login />} />
          <Route path="/courses" element={<Login />} />
          <Route path="/grades" element={<GradeStats />} />
          <Route path="/login" element={<Login />} />
          <Route path="/institution" element={<GradeStats />} />
          <Route path="/institution/user-management" element={<UserManagement />} />
          <Route path="/instructor" element={<GradeStats />} />
          <Route path="/instructor/grades" element={<GradeStats />} />
          <Route path="/instructor/register" element={<Register />} />
          <Route path="/instructor/post-init-grades" element={<PostInitGrades />} />
          <Route path="/instructor/post-final-grades" element={<PostFinalGrades />} />
          <Route path="/student" element={<GradeStats />} />
          <Route path="/student/grades" element={<GradeStats />} />
          <Route path="/student/my-courses" element={<MyCourses />} />
          <Route path="/student/personal-grades" element={<PersonalGrades />} />
          <Route path="/student/request-review" element={<GradeRR />} />
          <Route path="/student/status" element={<StatusGradeRR />} />
        </Routes>
      </div>
    </div>
  )
};