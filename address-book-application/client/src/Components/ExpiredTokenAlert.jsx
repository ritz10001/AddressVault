import React, { useEffect } from "react";
import ExpiredTokenCSS from './ExpiredTokenAlert.module.css';
import { IoWarning } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const ExpiredTokenAlert = ({onClose}) => {
    const navigate = useNavigate();
    const handleOkClick = () => {
        onClose();
        navigate('/login');
    }

    useEffect(() => {
        document.title = "Token Expired!";
    });
    
    return(
        <div className={ExpiredTokenCSS["expBackdrop"]}>
            <div className={ExpiredTokenCSS["expContent"]}>
                <div className={ExpiredTokenCSS["top"]} style={{marginBottom: "5%"}}>
                    <IoWarning style={{color: "yellow", fontSize:"60px"}}/>
                    <h2 style={{color: "white", width: "70%", textAlign:"center", fontSize:"1.7rem"}}>Session Expired!</h2>
                </div>
                <h3 style={{fontSize: "1.2rem", marginBottom:"5%", textAlign: "center"}}>Your session has just expired. <br />Please log in again to continue.</h3>
                <div className={ExpiredTokenCSS["ok"]}><button type="button" onClick={handleOkClick} style={{backgroundColor: "#5783EB"}}>OK</button></div>
            </div>
            
        </div>
    );
}

export default ExpiredTokenAlert;