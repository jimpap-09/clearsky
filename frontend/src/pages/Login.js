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
    const handleSubmit = (e) => {
        e.preventDefault();
        login(username);
        navigate("/");
    }

    return (
        <div className="login-container">
            <h2>Log In</h2>
            <form onSubmit={handleSubmit}>
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
                <button type="submit">
                    Connect
                </button>
            </form>
        </div>
    )
}