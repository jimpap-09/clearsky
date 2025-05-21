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
import Profile from "./pages/Profile"

import "./styles/PageLayout.css"

/* the route for each page */
export default function App() {
  return (
    <div className="page-layout">
      <Navbar />
      <div className="body-container">
        <Routes>
          {/* init, navbar links */}
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Login />} />
          <Route path="/courses" element={<MyCourses />} />
          <Route path="/grades" element={<GradeStats />} />

          {/* sign in/up */}
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />

          {/* admin routes */}
          <Route path="/admin" element={<GradeStats />} />
          <Route path="/admin/:adminId" element={<GradeStats />} />
          <Route path="/admin/user-management" element={<UserManagement />} />

          {/* instructor routes */}
          <Route path="/instructor" element={<GradeStats />} />
          <Route path="/instructor/register" element={<Register />} />
          <Route path="/instructor/:instructorId" element={<MyCourses />} />
          <Route path="/instructor/:instructorId/profile" element={<Profile />} />
          <Route path="/instructor/:instructorId/my-courses" element={<GradeStats />} />
          <Route path="/instructor/:instructorId/post-init-grades" element={<PostInitGrades />} />
          <Route path="/instructor/post-final-grades" element={<PostFinalGrades />} />

          {/* student routes */}
          <Route path="/student" element={<GradeStats />} />
          <Route path="/student/:studentId" element={<GradeStats />} />
          <Route path="/student/:studentId/profile" element={<Profile />} />
          <Route path="/student/:studentId/grades" element={<GradeStats />} />
          <Route path="/student/:studentId/my-courses" element={<MyCourses />} />
        </Routes>
      </div>
    </div>
  )
};