import { Route, Routes } from "react-router-dom"
import Navbar from "./components/layout/Navbar"
import Login from "./pages/Login"
import SignUp from "./pages/SignUp"
import Register from "./pages/institution/Register"
import UserManagement from "./pages/institution/UserManagement"
import PostInitGrades from "./pages/instructor/PostInitGrades"
import PostFinalGrades from "./pages/instructor/PostFinalGrades"
import GradeStats from "./pages/GradeStats"
import MyCourses from "./pages/student/MyCourses"

import "./styles/PageLayout.css"

/* the route for each page */
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
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/institution" element={<GradeStats />} />
          <Route path="/institution/:institutionId" element={<GradeStats />} />
          <Route path="/institution/user-management" element={<UserManagement />} />
          <Route path="/instructor" element={<GradeStats />} />
          <Route path="/instructor/:instructorId" element={<GradeStats />} />
          <Route path="/instructor/grades" element={<GradeStats />} />
          <Route path="/instructor/register" element={<Register />} />
          <Route path="/instructor/:instructorId/post-init-grades" element={<PostInitGrades />} />
          <Route path="/instructor/post-final-grades" element={<PostFinalGrades />} />
          <Route path="/student" element={<GradeStats />} />
          <Route path="/student/:studentId" element={<GradeStats />} />
          <Route path="/student/:studentId/grades" element={<GradeStats />} />
          <Route path="/student/:studentId/my-courses" element={<MyCourses />} />
        </Routes>
      </div>
    </div>
  )
};