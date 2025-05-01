import React, {useState} from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';

export default function UserManagement() {
    const options = ['instructor', 'student', 'representative']
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [id, setId] = useState('');

    return (
        <>
        <div className="main-container">
            <h2 className='main-container-header'>Users</h2>
            <form>
                <div className="label-container">
                    <label>type:</label>
                    <DropDown options={options}/>
                </div>
                <div className="label-container">
                    <label>Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="label-container">
                    <label>Password:</label>
                    <input
                        type="text"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="label-container">
                    <label>id:</label>
                    <input
                        type="text"
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                    />
                </div>
                <div className='usermngmnt-btn-container'>
                    <div className='submit-btn'>
                        <button type="submit">
                            Add user
                        </button>
                    </div>
                    <div className='submit-btn'>
                        <button type="button">
                            Change password
                        </button>
                    </div>
                </div>
            </form>
        </div>
        <div className='message-area'>
            <div className='main-container'>
                <h2>Message area</h2>
                <div className='message-text'>
                    <p>write your message here</p>
                </div>
            </div>
        </div>
        </>
    )
}

function DropDown({options}) {

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
                {
                    open ?
                    <ChevronDown size={15}/>  :                  
                    <ChevronRight size={15}/>
                }
            </button>
            {
            open && (
            <ul className='usermngmnt-dropdown-menu'>
                {
                    options.map((opt)=>(
                        <li
                            key={opt}
                            onClick={() => handleSelect(opt)}
                        >
                            {opt}
                        </li>
                    ))
                }
            </ul>
            )
            }
        </div>
    )
}