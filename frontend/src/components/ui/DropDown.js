import { useNavigate } from "react-router-dom";
import { useState } from "react";
import useAuth from "../../context/AuthContext";
import { ChevronDown, ChevronRight } from "lucide-react";

// navbar dropdown menu - main page
export default function DropDown({options}) {

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
    // dropdown = dropdown btn + dropdown menu
      <div className='dropdown'>
        {/* dropdown button = connected (text) + arrow (icon) */}
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
          {/* dropdown menu = list of objects {label, path} */}
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