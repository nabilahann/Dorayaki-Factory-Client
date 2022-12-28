import React, { useState } from 'react'
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUname] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState('');
    const navigate = useNavigate();

    const Register = async (e) => {
        e.preventDefault();
        // console.log("masuk1")
        // console.log(name)
        // console.log(username)
        // console.log(email)
        // console.log(password)
        try {
            console.log("masuk2")
            await axios.post('http://localhost:3001/register', {
                email: email,
                name : name,
                username: username,
                password: password,
            });
            console.log("masuk3")
            navigate('../', { replace: true });
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
                    <h1>Daftar</h1>
                    <form onSubmit={Register}>
                        <label>Email</label>
                        <br/>
                        <input type="text" name="email" id="email" required 
                            value={email} onChange={(e) => setEmail(e.target.value)} />
                        
                        <label>Nama</label>
                        <br/>
                        <input type="text" name="name" id="name" required 
                            value={name} onChange={(e) => setName(e.target.value)} />
                        <label>Username</label>
                        <br/>
                        <input type="text" name="username" id="username" required 
                            value={username} onChange={(e) => setUname(e.target.value)} />
                        <label>Password</label>
                        <br/>
                        <input type="password" name="password" id="password" required 
                            value={password} onChange={(e) => setPassword(e.target.value)} />
                        <span id="message">{msg}</span>
                        <br/>
                        <a href="/">Kembali ke login</a>
                        <input type="submit" name="submit" value="Daftar"></input>
                    </form>
                </div>
            </div>
        </div>

    </div>
    )
}

export default Register
