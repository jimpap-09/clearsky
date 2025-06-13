import {useState} from 'react';
import UserDropDown from '../components/ui/UserDropDown';
import { put_change_password_url } from '../apiConfig';
import axios from 'axios';

export default function UserManagement() {

    const options = ['instructor', 'student', 'representative']
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [id, setId] = useState('');

    const handleChangePassword = async () => {
        try {
            const response = await axios.put(`${put_change_password_url}`,
                { id, newPassword: password });
            const data = response.json();
            alert('Password updated successfully');
            console.log(data); // Optional: για debug
        } catch (err) {
            console.error('Error changing password:', err);
            alert('Something went wrong');
        }
    };

    return (
    <div className='usermanagement-container'>
        <div className="main-container">
            <h2 className='main-container-header'>Users</h2>
            <form className='main-form'>
                <div className="label-container">
                    <label className='main-label'>type:</label>
                    <UserDropDown options={options} start={'institution representative'}/>
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
                    />
                </div>
                <div className='usermngmnt-btn-container'>
                    <div className='submit-btn'>
                        <button 
                        className='main-button'
                        type="submit">
                            Add user
                        </button>
                    </div>
                    <div className='submit-btn'>
                        <button 
                        className='main-button'
                        onClick={handleChangePassword()}
                        type="button">
                            Change password
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </div>
)}