import { useState } from 'react';
import { put_change_password_url, post_register_url } from '../apiConfig';
import axios from 'axios';

export default function UserManagement() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [id, setId] = useState('');
    const [role, setRole] = useState('STUDENT');

    const handleAddUser = async () => {
        try {
            const email = `${username}@clearsky.local`;
            const response = await axios.post(`${post_register_url}`, {
                id,
                name: username,
                email,
                role,
                password
            });
            const data = response.data;
            alert('User has been added successfully');
            console.log(data);
        } catch (err) {
            console.error('Error adding the user:', err);
            alert('Something went wrong');
        }
    };


    const handleChangePassword = async () => {
        try {
            const response = await axios.put(`${put_change_password_url}`, {
                id,
                newPassword: password,
                username
            });
            const data = response.data;
            alert('Password updated successfully');
            console.log(data);
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
                    <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    style={{padding: '10px', borderRadius: '10px', cursor: 'pointer'}}
                    >
                        <option value="STUDENT">Student</option>
                        <option value="INSTRUCTOR">Instructor</option>
                    </select>
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
                        onClick={handleAddUser}
                        type="button">
                            Add user
                        </button>
                    </div>
                    <div className='submit-btn'>
                        <button 
                        className='main-button'
                        onClick={handleChangePassword}
                        type="button">
                            Change password
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </div>
)}