// client/src/components/Register.js
import React, { useState } from 'react';

import api from '../../lib/axios';
// import './style.css'; // Import CSS for styling

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [message, setMessage] = useState('');

    const { username, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        try {
            const res = await api.post('/auth/register', {
                username,
                password
            });
            setMessage('Registered successfully'); // Set success message
        } catch (err) {
            if (err.response?.status === 400){
                setMessage('Sudah ada admin yang terdaftar. silahkan gunakan akun admin tersebut.')
            } else {
                console.error(err.response.data);
                setMessage('Failed to register.'); // Set error message
            }
        }
    };

    return (
        <div className="auth-form w-[300px] mx-auto p-[20px] border border-[#ccc] rounded-[5px]">
            <h2 className='mt-0'>Register</h2>
            <form onSubmit={onSubmit}>
                <input type="text" placeholder="Username" name="username" value={username} onChange={onChange} required className='w-full mb-[10px] p-[8px] rounded-[3px] border border-[#ccc]'/>
                <input type="password" placeholder="Password" name="password" value={password} onChange={onChange} required className='w-full mb-[10px] p-[8px] rounded-[3px] border border-[#ccc]'/>
                <button type="submit"className='w-full p-[10px] bg-[#007bff] text-[#fff] border-none rounded-[3px] cursor-pointer hover:bg-[#0056b3]'>Register</button>
            </form>
            <p className="message mt-[10px] text-green-600" >{message}</p>
        </div>
    );
};

export default Register;