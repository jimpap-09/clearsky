import { Route, Routes } from "react-router-dom"
import Navbar from "./components/layout/Navbar"
import Login from "./pages/Login"
import SignUp from "./pages/SignUp"
import UserManagement from "./pages/UserManagement"
import PostGrades from "./pages/PostGrades"
import Statistics from "./pages/Statistics"
import MyCourses from "./pages/MyCourses"
import Profile from "./pages/Profile"

import "./styles/PageLayout.css"

/* the route for each page */
export default function App() {
  return (
    <div className="page-layout">
      <Navbar />
      <div className="body-container">
        <Routes>

          {/* init */}
          <Route path="/" element={<Login />} />

          {/* navbar links without login */}
          <Route path="/profile" element={<Profile />} />
          <Route path="/my-courses" element={<Profile />} />
          <Route path="/stats" element={<Profile />} />

          {/* sign in/up */}
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />

          {/* admin routes */}
          <Route path="/admin" element={<Statistics />} />
          <Route path="/admin/:adminId" element={<Profile />} />
          <Route path="/admin/:adminId/profile" element={<Profile />} />
          <Route path="/admin/:adminId/my-courses" element={<MyCourses />} />
          <Route path="/admin/:adminId/stats" element={<Statistics />} />
          <Route path="/admin/:adminId/user-management" element={<UserManagement />} />

          {/* instructor routes */}
          <Route path="/instructor/:instructorId" element={<Profile />} />
          <Route path="/instructor/:instructorId/profile" element={<Profile />} />
          <Route path="/instructor/:instructorId/post-grades" element={<PostGrades />} />
          <Route path="/instructor/:instructorId/my-courses" element={<MyCourses />} />
          <Route path="/instructor/:instructorId/stats" element={<Statistics />} />

          {/* student routes */}
          <Route path="/student/:studentId" element={<Profile />} />
          <Route path="/student/:studentId/profile" element={<Profile />} />
          <Route path="/student/:studentId/stats" element={<Statistics />} />
          <Route path="/student/:studentId/my-courses" element={<MyCourses />} />
        </Routes>
      </div>
    </div>
  )
};