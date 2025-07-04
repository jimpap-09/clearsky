import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { post_register_url } from '../apiConfig';
import axios from 'axios'

export default function SignUp() {
    // we define a useState for each credential
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('STUDENT');
    const [name, setName] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        if (role === 'STUDENT') {
            setUsername('031');
        } else {
            setUsername('');
            setEmail('');
        }
    }, [role]);

    const handleUsernameChange = (e) => {
        let value = e.target.value;
        if(role === 'STUDENT') {
            if(value.length > 8 || value.length < 3) return;
            const am = value.slice(3);
            setEmail(`el${am}@mail.ntua.gr`);
        }
        setUsername(value);
    }

    const handleEmailChange = (e) => {
    // allow manual email editing for non-students
        if (role !== 'STUDENT') {
            setEmail(e.target.value);
        }
    };

    // we prevent page refresh after submition
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const data = {
                id: username,
                email,
                password,
                role,
                name
            };
            console.log("Sending data:", data);       
            await axios.post(post_register_url, {
                id: username,
                email,
                password,
                role,
                name
            });
            alert("Registration Successful. Continue to login...");
            navigate('/login');
        }
        catch (error) {
            alert("Registration failed. Please check your credentials");
            console.error('Registration error:', error.response?.data);
        }
    };

    return (
        <>
            <h1>Welcome to clearSky</h1>
            <div className="main-container">
                <h2 className='main-container-header'>Please enter your credentials</h2>
                <div className='main-container-body'>
                    <form
                        onSubmit={handleSubmit}
                        className='main-form'    
                    >
                        <div className="label-container">
                            <label className='main-label'>Role:</label>
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
                                onChange={handleUsernameChange}
                                required
                            />
                        </div>
                        <div className="label-container">
                            <label className='main-label'>Password:</label>
                            <input
                                className='main-input'
                                type="current-password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="label-container">
                            <label className='main-label'>Email:</label>
                            <input
                                className='main-input'
                                type="text"
                                value={email}
                                onChange={handleEmailChange}
                                required
                                disabled={role === 'STUDENT'}
                            />
                        </div>
                        <div className="label-container">
                            <label className='main-label'>Name:</label>
                            <input
                                className='main-input'
                                type="text"
                                value={name}
                                onChange={(e) => {setName(e.target.value)}}
                            />
                        </div>
                        <div className='submit-btn'>
                            <button
                                className='main-button'
                                type="submit">
                                Sign up
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}