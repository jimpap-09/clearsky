import { useEffect, useState } from 'react';
import MessageArea from '../components/ui/MessageArea';
import UserDropDown from '../components/ui/UserDropDown';

export default function UserManagement() {
    const options = ['instructor', 'student', 'representative'];
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [id, setId] = useState('');
    const [action, setAction] = useState('');

    useEffect(()=>{
        if(action !== 'student') setId('');
    },[action]);

    return (
        <>
        <div className="main-container">
            <h2 className='main-container-header'>Users</h2>
            <form className='main-form'>
                <div className="label-container">
                    <label className='main-label'>type:</label>
                    <UserDropDown options={options} start={'institution representative'} setAction={setAction}/>
                </div>
                <div className="label-container">
                    <label className='main-label'>Username:</label>
                    <input
                        className='main-input'
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="label-container">
                    <label className='main-label'>Password:</label>
                    <input
                        className='main-input'
                        type="text"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="label-container">
                    <label className='main-label'>id:</label>
                    <input
                        className='main-input'
                        type="text"
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                        disabled={action !== 'student'}
                    />
                </div>
                <div className='usermngmnt-btn-container'>
                    <div className='submit-btn'>
                        <button className='main-button' type="submit">
                            Add user
                        </button>
                    </div>
                    <div className='submit-btn'>
                        <button className='main-button' type="button">
                            Change password
                        </button>
                    </div>
                </div>
            </form>
        </div>
        <MessageArea/>
        </>
    )
}