import React, { useState } from "react";
import LoginFormCSS from './LoginForm.module.css';
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const LoginForm = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:3001/login', {email, password})
        .then(res => {
            if(res.data === "Success"){
                console.log("successful");
                navigate('/home');
            }
            else{
                console.log("fail");
            }
        })
        .catch(e => console.log(e));

    }

    return (
        <div className={LoginFormCSS['body-class']}>
            <div className={LoginFormCSS['wrapper']}>
                <h1>Login</h1>
                <form onSubmit={handleSubmit}>
                    <div className={LoginFormCSS['info']}>
                    <div className={LoginFormCSS['login-box']}>
                        
                        <input type="text" placeholder="Email Address" required onChange={e => setEmail(e.target.value)}/>
                        <div className={LoginFormCSS['icon-class']}><FaUser className={LoginFormCSS['icon']}/></div>
                    </div>
                    <div className={LoginFormCSS['login-box']}>
                        <input type="password" placeholder="Password" required onChange={e => setPassword(e.target.value)}/>
                        <div className={LoginFormCSS['icon-class']}><RiLockPasswordFill className={LoginFormCSS['icon']}/></div>
                    </div>
                    <button type="submit">Sign In</button>
                    <div className={LoginFormCSS['register-link']}><p>Don't have an account? <a href="./register">Sign up</a></p></div>
                    </div>
                </form>
            </div>
        </div>

    );
}

export default LoginForm;