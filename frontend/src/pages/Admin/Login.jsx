// client/src/components/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import toast from 'react-hot-toast'

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
            // Set success message
            setMessage('Logged in successfully');
            toast.success('Login berhasil', navigate('/admin'))
        } catch (err) {
            console.error(err.response.data);
            // Set error message
            setMessage('Failed to login - wrong credentials');         
        }
    };

    return (
        <div className="auth-form w-[300px] mx-auto p-[20px] border border-[#ccc] rounded-[5px]">
            <h2 className='mt-0'>Login</h2>
            <form onSubmit={onSubmit}>
                <input type="text" 
                       placeholder="Username" 
                       name="username" 
                       value={username} 
                       onChange={onChange} 
                       required
                       className='w-full mb-[10px] p-[8px] rounded-[3px] border border-[#ccc]' />
                <input type="password" 
                       placeholder="Password" 
                       name="password" 
                       value={password} 
                       onChange={onChange} 
                       required 
                       className='w-full mb-[10px] p-[8px] rounded-[3px] border border-[#ccc]'/>
                <button type="submit" className='w-full p-[10px] bg-[#007bff] text-[#fff] border-none rounded-[3px] cursor-pointer hover:bg-[#0056b3]'>Login</button>
            </form>
            <p className="message mt-[10px] text-green-600">{message}</p>
        </div>
    );
};

export default Login;