import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from "../context/AuthContext";

import "../styles/LoginPage.css";

export default function Login() {
    // we define a useState for each credential
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const { login } = useAuth()
    const navigate = useNavigate()

    // we prevent page refresh after submition
    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(username);
        if(username === "student") 
            navigate("/student");
        else if(username === "instructor")
            navigate("/instructor");
        else if(username === "institution")
            navigate("/institution");
    }

    return (
        <>
            <h1>Welcome to clearSky</h1>
            <div className="main-container">
                <h2 className='main-container-header'>Please enter your credentials</h2>
                <div className='main-container-body'>
                    <form onSubmit={handleSubmit}>
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
                        <div className='submit-btn'>
                            <button type="submit">
                                Login
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <div className='message-area'>
                <div className='main-container'>
                    <h2 className='main-container-header'>Message area</h2>
                    <div className='message-text'>
                        <p>write your message here</p>
                    </div>
                </div>
            </div>
        </>
    )
}