import React from "react";
import { TiTick } from "react-icons/ti";
import { useNavigate } from "react-router-dom";
import AccountCreatedCSS from './AccountCreated.module.css';

const AccountCreated = ({onClose}) => {
    const navigate = useNavigate();
    const handleOkClick = () => {
        onClose();
        navigate('/login');
    }
    return(
        <div className={AccountCreatedCSS["createBackdrop"]}>
            <div className={AccountCreatedCSS["createContent"]}>
                <div className={AccountCreatedCSS["top"]} style={{marginBottom: "5%"}}>
                    <TiTick style={{color: "green", fontSize:"60px"}}/>
                    <h2 style={{color: "red", width: "70%", textAlign:"center", fontSize:"1.7rem"}}>Account Created!</h2>
                </div>
                <h3 style={{color: "white", fontSize: "1.2rem", marginBottom:"5%", textAlign: "center"}}>Your account is created and ready to be used.</h3>
                <div className={AccountCreatedCSS["ok"]}><button type="button" onClick={handleOkClick}>OK</button></div>
            </div>
            
        </div>
    );
}

export default AccountCreated;