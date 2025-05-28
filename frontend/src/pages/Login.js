import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from "../context/AuthContext";
import { get_login_url } from '../apiConfig';
import axios from 'axios'
import { buildPath } from '../utils/routes';
import "../styles/LoginPage.css";

// login - main page
export default function Login() {
    // we define a useState for each credential
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { login, userData } = useAuth();
    const navigate = useNavigate();

    // check for valid email and password
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(get_login_url, { email, password });
            const { token } = res.data;
            console.log('token from login: ', token);
            await login(token);
        } catch (error) {
            alert("Login failed. Please check your credentials");
            console.error(error);
        }
    };

    // for each userData (student, instructor, admin)
    // navigate to the specific route respectively
    useEffect(() => {
        if (userData) navigate(buildPath(userData))
    }, [userData, navigate]);

    return (
        <>
            <h1>Welcome to clearSky</h1>
            <div className="main-container">
                <h2 className='main-container-header'>Please enter your credentials</h2>
                <div className='main-container-body'>
                    <form
                        onSubmit={handleSubmit}
                        className='login-form'
                    >
                        <div className="label-container">
                            <label className='login-label'>Email:</label>
                            <input
                                className='login-input'
                                type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="label-container">
                            <label className='login-label'>Password:</label>
                            <input
                                className='login-input'
                                type="text"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className='submit-btn'>
                            <button
                                className='main-button'
                                type="submit"
                            >
                                Login
                            </button>
                            <button
                                className='main-button'
                                type="button"
                                style = {{margin: "0 0 0 1rem"}}
                                onClick={(e) => navigate('/sign-up')}
                            >
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