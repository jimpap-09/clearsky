import { CornerDownLeft } from 'lucide-react'
import { Link, useMatch, useResolvedPath } from "react-router-dom"
import useAuth from "../../context/AuthContext"
import DropDown from "./DropDown"

export default function Navbar() {
  const {user} = useAuth()
  return (
    <nav className="navbar">
      <div className='logo-container'>
        <Link to="/" className="site-title">
          ClearSky
        </Link>
      </div>
      <ul>
        <li><CustomLink to="/">Home</CustomLink></li>
        <li><CustomLink to="/courses">Courses</CustomLink></li>
        <li><CustomLink to="/grades">Grades</CustomLink></li>
      </ul>
      {
        user
        ? <DropDown/>
        :
        <div className='login'>
          <CustomLink to="/login">
            Login<CornerDownLeft size={15}/>
          </CustomLink>
        </div>
      }
    </nav>
  )
}

function CustomLink({ to, children }) {
  const resolvedPath = useResolvedPath(to)
  const isActive = useMatch({ path: resolvedPath.pathname, end: true })

  return (
      <Link to={to} className={isActive ? "active" : ""}>
        {children}
      </Link>
  )
}