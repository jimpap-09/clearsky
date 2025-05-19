import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from "../context/AuthContext";
import { get_login_url } from '../apiConfig';
import axios from 'axios'
import {jwtDecode} from 'jwt-decode';

import "../styles/LoginPage.css";

export default function Login() {
    // we define a useState for each credential
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { login } = useAuth();
    const navigate = useNavigate();

    // we prevent page refresh after submition
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(get_login_url, {
                email, password
            });
            const {token} = res.data;
            console.log(`loggin in with token: ${token}`);
            await login(token);
            const decoded = jwtDecode(token);
            console.log(decoded.role);
            const role = decoded.role;
            if(role === 'STUDENT') navigate(`/student/${decoded.id}`);
            else if(role === 'INSTRUCTOR') navigate(`/instructor/${decoded.id}/post-init-grades`);
            else if(role === 'ADMIN') navigate(`/institution/${decoded.id}`);
            else navigate("/");
        }
        catch (error) {
            alert("Login failed. Please check your credentials");
            console.error(error);
        }
    }

    return (
        <>
            <h1>Welcome to clearSky</h1>
            <div className="main-container">
                <h2 className='main-container-header'>Please enter your credentials</h2>
                <div className='main-container-body'>
                    <form onSubmit={handleSubmit}>
                        <div className="label-container">
                            <label>Email:</label>
                            <input
                                type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
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
                            <button type="button"
                                    style = {{margin: "0 0 0 1rem"}}
                                    onClick={(e) => navigate('/sign-up')}>
                                Register
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