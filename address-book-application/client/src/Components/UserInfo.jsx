import React, { useEffect, useState, useRef } from 'react';
import UserInfoCSS from './UserInfo.module.css';
import axios from 'axios';
import { RxCross1 } from "react-icons/rx";
import { BASE_URL } from '../url';

const UserInfo = ({onClose}) => {
    const [userInfo, setUserInfo] = useState(null);
    const token = localStorage.getItem("jsonwebtoken");
    useEffect(() => {
        axios.get(`${BASE_URL}/user/current`, {headers: {"Authorization": `Bearer ${token}` }}).then(
            response => {
                console.log(response);
                setUserInfo(response.data);
                console.log("useinfo", userInfo);
            }
        ).catch(error => console.log(error));
    }, []);

    if(!userInfo){
        return <div style={{color: "white"}}>Loading...</div>
    }
    
    return(
        <div className={UserInfoCSS["userBackdrop"]}>
            <div className={UserInfoCSS["userContent"]}>
                <div className={UserInfoCSS["closeButton"]}>
                    <button onClick={onClose} style={{backgroundColor: "red", border: "none", borderRadius: "2px", color: "white", fontSize: "15px", fontWeight: "bold"}}><RxCross1 /></button>
                </div>
                <h2 style={{color: "#5783EB", marginBottom: "10px"}}>User Information</h2>
                <p>User: {userInfo.name}</p>
                <p>Email: {userInfo.email}</p>
                <p>Username: {userInfo.username}</p>
            </div>
        </div>
    );
}

export default UserInfo;