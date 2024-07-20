import React from "react";
import RegisterFormCSS from './RegisterForm.module.css';
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import {useState} from 'react';
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import AccountCreated from "./AccountCreated";
import { BASE_URL } from "../url";

const RegisterForm = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isAccountRegistered, setIsAccountRegistered] = useState(false);
    const navigate = useNavigate();

    function handleNameChange(event){
        setName(event.target.value);
    }

    function handleEmailChange(event){
        setEmail(event.target.value);
    }

    function handleUsernameChange(event){
        setUsername(event.target.value);
    }

    function handlePasswordChange(event){
        setPassword(event.target.value);
    }

    const handleAccountClose = () => {
        setIsAccountRegistered(true);
    }


    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post(`${BASE_URL}/user/register`, {name, email, username, password})
        .then(res => handleAccountClose())
        .catch(e => console.log(e));

    }
    return (
        <div className={RegisterFormCSS['body-class']}>
            <div className={RegisterFormCSS['container']}>
                <h1 className={RegisterFormCSS['form-title']} style={{color: "#5783EB"}}>Registration</h1>
                <form onSubmit={handleSubmit}>
                    <div className={RegisterFormCSS['info']}>
                        <div className={RegisterFormCSS['input-box']}>
                            <input type="text" placeholder="Full Name" required onChange={handleNameChange}/>
                            <div className={RegisterFormCSS['icon-class']}><FaUser className={RegisterFormCSS['icon']} style={{color: "#5783EB"}}/></div>
                        </div>
                        <div className={RegisterFormCSS['input-box']}>
                            <input type="text" placeholder="Email Address" required onChange={handleEmailChange}/>
                            <div className={RegisterFormCSS['icon-class']}><FaUser className={RegisterFormCSS['icon']} style={{color: "#5783EB"}}/></div>
                        </div>
                        <div className={RegisterFormCSS['input-box']}>
                            <input type="text" placeholder="Username" required onChange={handleUsernameChange}/>
                            <div className={RegisterFormCSS['icon-class']}><FaUser className={RegisterFormCSS['icon']} style={{color: "#5783EB"}}/></div>
                        </div>
                        <div className={RegisterFormCSS['input-box']}>
                            <input type="password" placeholder="Password" required onChange={handlePasswordChange}/>
                            <div className={RegisterFormCSS['icon-class']}><RiLockPasswordFill className={RegisterFormCSS['icon']} style={{color: "#5783EB"}}/></div>
                        </div>
                        <div className={RegisterFormCSS['button']}><button type="submit" style={{backgroundColor: "#5783EB"}}>Sign Up</button></div>
                        <div className={RegisterFormCSS['register-link']}><p style={{color: "white"}}>Already have an account? <a href="./login" style={{color: "#5783EB", textDecoration: "underline"}}>Login</a></p></div>
                    </div>
                </form>
            </div>
            {isAccountRegistered && 
                <AccountCreated onClose={handleAccountClose} />
            }
        </div>
    );
}

export default RegisterForm;