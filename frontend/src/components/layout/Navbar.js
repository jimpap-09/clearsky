import { CornerDownLeft } from 'lucide-react'
import { Link } from "react-router-dom"
import useAuth from "../../context/AuthContext"
import CustomLink from '../ui/CustomLink';
import DropDown from '../ui/DropDown';
import { buildPath } from '../../utils/routes';

// navbar - main page
export default function Navbar() {
  const {userData} = useAuth();
  const options = userData ? [
    {label: "Profile", path: buildPath(userData, "/profile")},
    {label: "Log Out", path: "/"}
  ] : [];
  
  return (
    // navbar = logo + navlinks + dropdown
    <nav className="navbar">
      {/* logo */}
      <div className='logo-container'>
        <Link to="/" className="site-title">
          ClearSky
        </Link>
      </div>
      {/* navbar links = list of custom links */}
      <ul>
        <li><CustomLink to={buildPath(userData, "/profile")}>Home</CustomLink></li>
        <li><CustomLink to={buildPath(userData, "/my-courses")}>Courses</CustomLink></li>
        <li><CustomLink to={buildPath(userData, "/grades")}>Grades</CustomLink></li>
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
};