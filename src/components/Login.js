import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUname] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState('');
    const navigate = useNavigate();

    const Auth = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3001/login', {
                username: username,
                password: password
            });
            // navigate("/dashboard");
            navigate('/dashboard', { replace: true });
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg);
            }
        }
    }

    return (
        <div className="wrapper">
            <nav className="navbar navbar-dark bg-primary">
                <div className="container-fluid">
                    <span className="navbar-brand mb-0 h1" id="navbar">Pabrik AnakAyam</span>
                </div>
            </nav>
            <div className="content-container">
                <div className="container">
                        <div className="img-container">
                            <img id="logo-login" src="img/resource/logo.png" alt="Logo AnakAyam"/>
                        </div>
                </div>
                <div className="container">
                        <div className="login">
                            <h1>Login</h1>
                                <form onSubmit={Auth}>
                                    <label htmlFor="username">Username</label>
                                    <br/> 
                                    <input type="text" name="username" required 
                                        value={username} onChange={(e) => setUname(e.target.value)} />
                                    <br/> 
                                    <label htmlFor="password">Password</label>
                                    <br/> 
                                    <input type="password" name="password" required 
                                        value={password} onChange={(e) => setPassword(e.target.value)} />
                                    <br/> 
                                    <span id="message">{msg}</span>
                                    <br/> 
                                    <p>Belum punya akun?</p><a href="/register">Daftar</a>
                                    <input type="submit" name="submit" value="Login"></input>
                                </form>
                        </div>
                    
                </div>
            </div>
            <div className="push"></div>
            
        </div>
    )
}

export default Login
