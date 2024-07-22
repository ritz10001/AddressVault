import React, { useEffect, useState } from "react";
import LoginFormCSS from './LoginForm.module.css';
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Test from "./Test";
import { BASE_URL } from "../url";

const LoginForm = ({userName, setUserName}) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoginFail, setIsLoginFail] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("jsonwebtoken");
        if(token){
            navigate("/addressVault");
        }
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post(`https://addressvault.onrender.com/user/login`, {email, password})
        .then(res => {
            if(res.data["status"] === "success"){
                setIsLoginFail(false);
                const accessToken = res.data["accessToken"];
                localStorage.setItem("jsonwebtoken", accessToken);
                setUserName(res.data["name"]);
                setTokenTimeout(accessToken, handleLogout);
                navigate('/addressVault');
            }
            else{
                navigate('/home');
            }
        })
        .catch(e => setIsLoginFail(true));

    }

    return (
        <div className={LoginFormCSS['body-class']}>
            <div className={LoginFormCSS['wrapper']}>
                <h1 style={{color: "#5783EB"}}>Login</h1>
                <form onSubmit={handleSubmit}>
                    <div className={LoginFormCSS['info']}>
                    <div className={LoginFormCSS['login-box']}>
                        
                        <input type="text" placeholder="Email Address" required onChange={e => setEmail(e.target.value)}/>
                        <div className={LoginFormCSS['icon-class']}><FaUser className={LoginFormCSS['icon']} style={{color: "#5783EB"}}/></div>
                    </div>
                    <div className={LoginFormCSS['login-box']}>
                        <input type="password" placeholder="Password" required onChange={e => setPassword(e.target.value)}/>
                        <div className={LoginFormCSS['icon-class']}><RiLockPasswordFill className={LoginFormCSS['icon']} style={{color: "#5783EB"}}/></div>
                    </div>
                    <button className={LoginFormCSS['sign-in-button']} type="submit" style={{backgroundColor: "#5783EB"}}>Sign In</button>
                    {isLoginFail &&
                        <div className={LoginFormCSS["fail"]} style={{marginTop: "10px", fontSize: "0.9rem"}}>
                            Incorrect Email or Password. Please try again.
                        </div>
                    }
                    <div className={LoginFormCSS['register-link']}><p style={{color: "#5783EB"}}>Don't have an account? <a href="./register" style={{color: "#5783EB"}}>Sign up</a></p></div>
                    </div>
                    
                </form>
            </div>
        </div>
    );
}

export default LoginForm;