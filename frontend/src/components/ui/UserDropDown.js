import { useState } from "react";
import { ChevronDown, ChevronRight } from 'lucide-react';

export default function UserDropDown({options}) {

    const [ open, setOpen ] = useState(false);
    const toggleDropDown = () => setOpen(!open);
    const [option, setOption] = useState('Institution representative');

    const handleSelect = async (value) => {
        setOpen(false);
        setOption(value);
    }

    return (
        <div className='usermngmnt-dropdown'>
            <button
                type="button"
                onClick={toggleDropDown}
                className={`dropdown-btn ${open ? "active" : ""}`}>
                {option}
                {open
                ?<ChevronDown size={15}/>
                :<ChevronRight size={15}/>
                }
            </button>
            {open && (
            <ul className='usermngmnt-dropdown-menu'>
                {options.map((opt)=>(
                    <li
                    key={opt}
                    onClick={() => handleSelect(opt)}
                    >
                    {opt}
                    </li>
                ))}
            </ul>
            )}
        </div>
    );
}