import { ChevronDown, ChevronRight } from 'lucide-react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../context/AuthContext';

function DropDown() {

    const options = [
        {label: "Profile", path: "/courses"},
        {label: "Settings", path: "/grades"},
        {label: "Log Out", path: "/"}
    ]
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

export default DropDown;