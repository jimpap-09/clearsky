import React from 'react';
import {Link} from 'react-router-dom'

export default function Register() {
    return (
        <>
        <h1>This is the Register Page</h1>
        <div className='main-container'>
            <h2>Institutions</h2>
            <div className='register-container'>
                <button>
                    <Link to='./user-management'>
                        user management
                    </Link>
                </button>
            </div>
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