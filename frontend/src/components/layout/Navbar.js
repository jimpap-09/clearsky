import { CornerDownLeft } from 'lucide-react'
import { Link, useMatch, useResolvedPath, useNavigate } from "react-router-dom"
import useAuth from "../../context/AuthContext"
import { ChevronDown, ChevronRight } from 'lucide-react';
import {useState} from 'react'

export default function Navbar() {
  const {userData} = useAuth();
  const options = userData ? [
    {label: "Profile", path: `/${userData.role}`},
    {label: "Settings", path: `/${userData.role}`},
    {label: "Log Out", path: "/"}
  ] : [];
  
  return (
    <nav className="navbar">
      <div className='logo-container'>
        <Link to="/" className="site-title">
          ClearSky
        </Link>
      </div>
      <ul>
        <li><CustomLink to="/home">Home</CustomLink></li>
        <li><CustomLink to="/courses">Courses</CustomLink></li>
        <li><CustomLink to="/grades">Grades</CustomLink></li>
      </ul>
      {
        userData && userData.role
        ? <DropDown options={options}/>
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

function DropDown({options}) {

  const navigate = useNavigate();
  const { logout } = useAuth();
  const [ open, setOpen ] = useState(false);
  const toggleDropDown = () => setOpen(!open);
  
  const handleSelect = async (value) => {
      setOpen(false);
      if(value.label === "Log Out") await logout();
      navigate(value.path);
  }

  return (
      <div className='dropdown'>
          <button
              onClick={toggleDropDown}
              className={`dropdown-btn ${open ? "active" : ""}`}>
              Connected
              {
                  open ?
                  <ChevronDown size={15}/> :
                  <ChevronRight size={15}/>
              }
          </button>
          {
              open && (
              <ul className='dropdown-menu'>
                  {
                      options.map((opt)=>(
                          <li
                              key={opt.label}
                              onClick={() => handleSelect(opt)}
                          >
                              {opt.label}
                          </li>
                      ))
                  }
              </ul>
              )
          }
      </div>
  )
}