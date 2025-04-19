import React, {useState} from 'react';
import DropDown from '../../components/layout/DropDown'

export default function UserManagement() {
    const options = ['Instructor, student, representative']
    const {username, setUsername} = useState('');
    const {password, setPassword} = useState('');

    return (
        <>
        <div className="main-container">
                <h2>Users</h2>
                <form>
                    <div className="label-container">
                        <label>
                            type:
                        </label>
                        <DropDown options={options}/>
                    </div>
                    <div className="label-container">
                        <label>
                            Username:
                        </label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="label-container">
                        <label>
                            Password:
                        </label>
                        <input
                            type="text"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className='submit-btn'>
                        <button type="submit">
                            Login
                        </button>
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