// client/src/components/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { useAuth } from '../../AuthContext.jsx';
import api from '../../lib/axios.js';

// import './style.css'; // Import CSS for styling

const Login = () => {
    const { setAuthUser } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [message, setMessage] = useState('');

    const { username, password } = formData;

    const onChange = e => setFormData({ ...formData, 
                                      [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        try {
            const res = 
                await api.post('/auth/login', 
            {
                username,
                password
            });
            setAuthUser(formData);
            navigate('/admin');
            // Set success message
            setMessage('Logged in successfully');
        } catch (err) {
            console.error(err.response.data);
            // Set error message
            setMessage('Failed to login - wrong credentials');         
        }
    };

    return (
        <div className="auth-form">
            <h2>Login</h2>
            <form onSubmit={onSubmit}>
                <input type="text" 
                       placeholder="Username" 
                       name="username" 
                       value={username} 
                       onChange={onChange} 
                       required />
                <input type="password" 
                       placeholder="Password" 
                       name="password" 
                       value={password} 
                       onChange={onChange} 
                       required />
                <button type="submit">Login</button>
            </form>
            <p className="message">{message}</p>
        </div>
    );
};

export default Login;