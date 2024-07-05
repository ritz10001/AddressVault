import React, { useEffect, useState } from "react";
import LoginFormCSS from './LoginForm.module.css';
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Test from "./Test";

const LoginForm = ({userName, setUserName}) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("jsonwebtoken");
        if(token){
            navigate("/addressVault");
        }
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:3001/user/login', {email, password})
        .then(res => {
            if(res.data["status"] === "success"){
                console.log("Login Successful");
                const accessToken = res.data["accessToken"];
                console.log(accessToken);
                localStorage.setItem("jsonwebtoken", accessToken);

                setUserName(res.data["name"]);
                setTokenTimeout(accessToken, handleLogout);
                navigate('/addressVault');
            }
            else{
                console.log(res);
                console.log("fail");
                navigate('/home');
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